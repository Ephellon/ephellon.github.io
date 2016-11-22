var
paramours = $(".compile-paramour"),
javascripts = $(".compile-javascript"),
paramour_textarea = $(".edit-paramour")[0],
javascript_textarea = $(".edit-javascript")[0],
poptions = {
    mode: "paramour",
    lineNumbers: false,
    styleActiveLine: true,
    matchBrackets: true,
    indentUnit: 2,
    tabsize: 2,
    indentWithTabs: false,
    readOnly: false,
    autofocus: false,
    lineSeperator: "\n",
    theme: "tomorrow-night-bright",
    fold: "brace"
  },
joptions = {
    mode: "javascript",
    lineNumbers: false,
    styleActiveLine: true,
    matchBrackets: true,
    indentUnit: 2,
    tabsize: 2,
    indentWithTabs: false,
    readOnly: true,
    autofocus: false,
    lineSeperator: "\n",
    theme: "tomorrow-night-bright",
    fold: "brace"
}, Peditor, Jeditor;

// Duds
for(var x = 0; x < paramours.length; x++)
  CodeMirror.fromTextArea(paramours[x], poptions);

for(x = 0; x < javascripts.length; x++) {
  javascripts[x].value = Paramour(paramours[x].value, true);
  CodeMirror.fromTextArea(javascripts[x], joptions);
}

// Actual scripts
poptions.readOnly = false;
Peditor = CodeMirror.fromTextArea(paramour_textarea, poptions);

javascript_textarea.value = Paramour(paramour_textarea.value, true);
Jeditor = CodeMirror.fromTextArea(javascript_textarea, joptions);

window.Peditor = Peditor, window.Jeditor = Jeditor;
