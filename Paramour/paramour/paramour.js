CodeMirror.defineSimpleMode("paramour", {
  // The start state contains the rules that are intially used
  start: [
    // Strings
    {
      regex: /(["'])(?:[^\\]|\\.)*?\1/,
      token: "string"
    },
    {
      regex: /(\/(?:[^\\]|\\.)*?\/)([imguy]*)/,
      token: ["string", "variable-2"]
    },
    // Comments
    {
      regex: /###/,
      token: "comment",
      next: "comment"
    },
    {
      regex: /(#\s*)(\$[a-z\$][\w\$]*)(\s*[\-\=]>\s*)(.*)/i,
      token: ["comment", "variable", "operator", null]
    },
    {
      regex: /(#\s*)(@)([\d\.]+)/i,
      token: ["comment", null, "number"]
    },
    {
      regex: /(#\s*)([\d\.]+)(\?[\!\*]?)/i,
      token: ["operator", "number", "operator"]
    },
    {
      regex: /#\?/,
      token: "operator"
    },
    {
      regex: /#.*/,
      token: "comment"
    },
    // Docstrings
    {
      regex: /\/\*/,
      token: "string",
      next: "docstring"
    },
    // Quasi Strings
    {
      regex: /`/,
      token: "string",
      next: "quasi"
    },
    {
      regex: /(["'`]{3})(?:[^\\]:\\.)*?\1/,
      token: "string"
    },
    // Get and Set
    {
      regex: /([gs]et\b\??)\s*([a-zA-Z\$_][\w\$]*)/,
      token: ["keyword-2", "variable"]
    },
    // Custom Operators
    {
      // Prefix Operator
      regex: /(\[\s*)([!\~\*\/%\+\-<>\&\^\|\?\:\=;]+)(\s*[a-z\$_][\w\$]*)(\s*\])/i,
      token: [null, "variable-2", "variable", null]
    },
    {
      // Media operator
      regex: /(\[\s*)([a-z\$_][\w\$]*\s*)([!\~\*\/%\+\-<>\&\^\|\?\:\=;]+)(\s*[a-z\$_][\w\$]*)(\s*\])/i,
      token: [null, "variable", "variable-2", "variable", null]
    },
    {
      // Suffix Operator
      regex: /(\[\s*)([a-z\$_][\w\$]*\s*)([!\~\*\/%\+\-<>\&\^\|\?\:\=;]+)(\s*\])/i,
      token: [null, "variable", "variable-2", null]
    },
    // Paramour Operators
    {
      regex: /((?:un)defined\s+)([a-zA-Z\$_][\w\$]*)/,
      token: ["keyword", "variable"]
    },
    // Atoms and Atom-like
    {
      regex: /(\!+[01]\b)/,
      token: "keyword"
    },
    // Keywords
    {
      regex: /\b(abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with|yield|[gs]et|defined)\b/,
      token: "keyword"
    },
    {
      regex: /[^\-\+][\-\+\~\&]>|@/,
      token: "keyword"
    },
    // Variable names
    {
      regex: /(\.[a-z\$_][\w\$]*|\.{3}|<init>)/i,
      token: "variable-2"
    },
    {
      regex: /([a-z\$_][\w\$]*)/i,
      token: "variable"
    },
    // Numbers
    {
      regex: /\b(0b[01]+|0o[1-7]+|0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?)\b/i,
      token: "number"
    },
    // Operators
    {
      regex: /[!\~\*\/%\+\-<>\&\^\|\?\:\=]+/,
      token: "operator"
    },
    // N. Literals
    {
      regex: /[\{\[\(\?]/,
      indent: true
    },
    {
      regex: /[\)\]\}]/,
      dedent: true
    }
  ],

  // Quasi Strings
  quasi: [
    {
      regex: /`/,
      token: "string",
      next: "start"
    },
    {
      regex: /\$\{(?:[^\{\}]*?)\}/,
      mode: "start"
    },
    {
      regex: /^(?:[^\\]|\\.)*?$/,
      token: "string"
    }
  ],

  // Docstrings
  docstring: [
    {
      regex: /\*\//,
      token: "string",
      next: "start"
    },
    {
      regex: /^(?:[^\*]|\*[^\/])*?$/,
      token: "string"
    }
  ],

  // Comments
  comment: [
    {
      regex: /###/,
      token: "comment",
      next: "start"
    },
    {
      regex: /^(?:[^#]|#[^#]|##[^#])*?$/,
      token: "comment"
    }
  ],

  // "The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes" - CodeMirror.
  meta: {
    dontIndentStates: ["comment"],
    blockCommentStart: "###",
    blockCommentEnd: "###",
    lineComment: "#",
    fold: "brace",
    closeBrackets: "( ) [ ] { } ' ' \" \" ` ` \"\"\" \"\"\" ''' ''' ``` ```".split(" ")
  }
});
