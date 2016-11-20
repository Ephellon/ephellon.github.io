var
paramours = $(".compile-paramour"),
javascripts = $(".compile-javascript"),
paramour_textarea = $(".edit-paramour")[0],
javascript_textarea = $(".edit-javascript")[0],
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
  closeBrackets: "( ) [ ] { } \"\"\" \"\"\" ''' ''' ``` ``` \" \" ' ' ` `".split(" ")
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
Peditor = CodeMirror.fromTextArea(paramour_textarea, poptions);

javascript_textarea.innerText = Paramour(paramour_textarea.innerText, true);
Jeditor = CodeMirror.fromTextArea(javascript_textarea, joptions);

window.Peditor = Peditor, window.Jeditor = Jeditor;
