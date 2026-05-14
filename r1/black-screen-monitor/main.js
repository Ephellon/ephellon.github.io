const STATE = {
    IDLE: 'idle'
    , MONITORING: 'monitoring'
    , ALARM: 'alarm'
    , ERROR: 'error'
};

const CONFIG = {
    defaultThreshold: 35
    , sampleInterval: 500
    , confirmCount: 3
    , sampleWidth: 60
    , sampleHeight: 45
};

let currentState = STATE.IDLE;
let currentThreshold = CONFIG.defaultThreshold;
let blackFrameCount = 0;
let audioCtx = null;
let alarmInterval = null;

const elements = {
    body: document.body
    , statusText: document.getElementById('status-text')
    , statusIcon: document.getElementById('status-icon')
    , hint: document.getElementById('hint')
    , fill: document.getElementById('brightness-fill')
    , val: document.getElementById('brightness-val')
    , video: document.getElementById('video-feed')
};

// --- Persistence Helpers ---
async function saveThreshold() {
    if (typeof window.creationStorage !== 'undefined') {
        await window.creationStorage.plain.setItem('threshold', btoa(currentThreshold.toString()));
    }
}

async function loadThreshold() {
    if (typeof window.creationStorage !== 'undefined') {
        const raw = await window.creationStorage.plain.getItem('threshold');
        if (raw) {
            currentThreshold = parseInt(atob(raw), 10);
        }
    }
}

// --- Camera & Core Logic ---
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'
                , width: CONFIG.sampleWidth * 2
                , height: CONFIG.sampleHeight * 2
            }
        });
        elements.video.srcObject = stream;
        await elements.video.play();
    } catch (e) {
        setAppState(STATE.ERROR, 'Camera Access Denied');
    }
}

function setAppState(state, errorMsg = '') {
    currentState = state;
    elements.body.className = `state-${state}`;

    if (state === STATE.MONITORING) {
        elements.statusIcon.innerText = '👁';
        elements.statusText.innerText = 'Monitoring...';
        elements.hint.innerText = 'Wheel to adjust threshold';
        stopAlarm();
    } else if (state === STATE.ALARM) {
        elements.statusIcon.innerText = '🔔';
        elements.statusText.innerText = 'SCREEN BLACK!';
        elements.hint.innerText = 'Press side button to dismiss';
        startAlarm();
    } else if (state === STATE.ERROR) {
        elements.statusIcon.innerText = '⚠️';
        elements.statusText.innerText = errorMsg;
        elements.hint.innerText = 'Restart app to retry';
    } else if (state === STATE.IDLE) {
        elements.statusIcon.innerText = '📷';
        elements.statusText.innerText = 'Standby';
        elements.hint.innerText = 'Tap screen or press side button';
        stopAlarm();
    }
}

function startAlarm() {
    if (!audioCtx) return;
    playChord();
    alarmInterval = setInterval(playChord, 2000);
}

function stopAlarm() {
    if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }
}

function playChord() {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const now = audioCtx.currentTime;
    const frequencies = [880, 1108.73, 1318.51];

    frequencies.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.1 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.8);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.8);
    });
}

function analyzeFrame() {
    if (currentState !== STATE.MONITORING) return;

    const canvas = document.createElement('canvas');
    canvas.width = CONFIG.sampleWidth;
    canvas.height = CONFIG.sampleHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    ctx.drawImage(elements.video, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let totalLuminance = 0;
    for (let i = 0; i < data.length; i += 4) {
        totalLuminance += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]);
    }

    const avgLuminance = totalLuminance / (data.length / 4);
    updateBrightnessUI(avgLuminance);

    if (avgLuminance < currentThreshold) {
        blackFrameCount++;
        if (blackFrameCount >= CONFIG.confirmCount) {
            setAppState(STATE.ALARM);
        }
    } else {
        blackFrameCount = 0;
    }
}

function updateBrightnessUI(lum) {
    const pct = Math.min(100, (lum / 255) * 100);
    elements.fill.style.width = `${pct}%`;
    elements.val.innerText = Math.round(lum);

    if (lum < currentThreshold)
        elements.fill.style.backgroundColor = '#ff3333';
    else if (lum < 80)
        elements.fill.style.backgroundColor = '#FE5F00';
    else
        elements.fill.style.backgroundColor = '#44cc44';
}

// --- Interaction Handlers ---
function togglePower() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (currentState === STATE.ALARM) {
        blackFrameCount = 0;
        setAppState(STATE.MONITORING);
    } else if (currentState === STATE.MONITORING) {
        setAppState(STATE.IDLE);
    } else {
        setAppState(STATE.MONITORING);
    }
}

function adjustThreshold(delta) {
    currentThreshold = Math.max(5, Math.min(255, currentThreshold + delta));
    saveThreshold();
}

// Native Events
window.addEventListener('sideClick', togglePower);
window.addEventListener('scrollUp', () => adjustThreshold(5));
window.addEventListener('scrollDown', () => adjustThreshold(-5));

// User gesture for initial enable
elements.body.addEventListener('pointerdown', () => {
    if (currentState === STATE.IDLE) {
        togglePower();
    }
});

// Desktop Fallbacks
if (typeof PluginMessageHandler === 'undefined') {
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            window.dispatchEvent(new CustomEvent('sideClick'));
        }
        if (event.key === 'ArrowUp')   window.dispatchEvent(new CustomEvent('scrollUp'));
        if (event.key === 'ArrowDown') window.dispatchEvent(new CustomEvent('scrollDown'));
    });
}

// App Boot
(async () => {
    await loadThreshold();
    await initCamera();
    setAppState(STATE.IDLE);
    setInterval(analyzeFrame, CONFIG.sampleInterval);
})();
