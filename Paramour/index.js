var
paramours = $(".compile-paramour"),
javascripts = $(".compile-javascript"),
paramour_ = $(".edit-paramour")[0],
javascript_ = $(".edit-javascript")[0],
options = {
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
  blockCommentStart: "###",
  blockCommentEnd: "###",
  lineComment: "#",
  fold: "brace",
  closeBrackets: "( ) [ ] { } ' ' \" \" ` ` \"\"\" \"\"\" ''' ''' ``` ``` ".split(" ")
},
poptions = options, joptions = options, Peditor, Jeditor;
poptions.mode = "paramour", joptions.mode = "javascript";

// Duds
for(var x = 0; x < paramours.length; x++)
  CodeMirror.fromTextArea(paramours[x], poptions);

for(x = 0; x < javascripts.length; x++)
  javascripts[x].innerText = Paramour(paramours[x].innerText, true),
  CodeMirror.fromTextArea(javascripts[x], joptions);

// Actual scripts
poptions.readOnly = false;
Peditor = CodeMirror.fromTextArea(paramour_, poptions);

javascript_.innerText = Paramour(paramour_.innerText, true);
Jeditor = CodeMirror.fromTextArea(javascript_, joptions);

window.Peditor = Peditor, window.Jeditor = Jeditor;
