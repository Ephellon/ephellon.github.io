var quasis = {}, Quasi = [],
end =
{
  regex: /^(?:[^\\\$]|\\.|\$[^\{\}])*?$/,
  token: "string"
},
interpolation =
{
  regex: /(\$\{(?:[^\{\}])*?\}|\$\{[\s\S]*\})/,
  token: "string-2"
},
rest =
{
  regex: /./,
  token: "string"
};

CodeMirror.defineSimpleMode("paramour", {
  // The start state contains the rules that are intially used
  start: [
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
      regex: /(#\s*)(\$[a-z\$][\w\$]*)(\s*[\-\=]>\s*)/i,
      token: ["comment", "variable", "operator"],
      next: "start"
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
      regex: /"{3}/,
      token: "string",
      next: "Dquasi"
    },
    {
      regex: /'{3}/,
      token: "string",
      next: "Squasi"
    },
    {
      regex: /`{3}/,
      token: "string",
      next: "Tquasi"
    },
    {
      regex: /`/,
      token: "string",
      next: "quasi"
    },
    // Strings
    {
      regex: /"/,
      token: "string",
      next: "Dstring"
    },
    {
      regex: /'/,
      token: "string",
      next: "Sstring"
    },
    // Get and Set
    {
      regex: /(\b[gs]et\b)(\?\s*|\s+)([a-zA-Z\$_][\w\$]*)/,
      token: ["keyword-2", "operator", "variable"]
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
      regex: /[^\-\+][\-\+\~\&\=]>|@|\:\:|\.\./,
      token: "keyword-2"
    },
    // Variable names
    {
      regex: /(\.{1,2})(\s*[a-z\$_][\w\$]*)/i,
      token: [null, "variable-2"]
    },
    {
      regex: /(\.{3}\s*)([a-z\$_][\w\$]*)/i,
      token: ["variable-2", "variable"]
    },
    {
      regex: /([a-z\$_][\w\$]*)(\.{3})/i,
      token: ["variable", "variable-2"]
    },
    {
      regex: /<(init)>/,
      token: ["keyword-2"]
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

  // Strings
  Dstring: [
    {
      regex: /(?:[^\\]|\\.)*?"/,
      token: "string",
      next: "start"
    },
    interpolation,
    rest
  ],

  Sstring: [
    {
      regex: /(?:[^\\]|\\.)*?'/,
      token: "string",
      next: "start"
    },
    interpolation,
    rest
  ],

  // Quasi Strings
  quasi: [
    {
      regex: /(?:[^\\]|\\.)*?`/,
      token: "string",
      next: "start"
    },
    end,
    interpolation,
    rest
  ],

  Squasi: [
    {
      regex: /'{3}/,
      token: "string",
      next: "start"
    },
    end,
    interpolation,
    rest
  ],

  Dquasi: [
    {
      regex: /"{3}/,
      token: "string",
      next: "start"
    },
    end,
    interpolation,
    rest
  ],

  Tquasi: [
    {
      regex: /`{3}/,
      token: "string",
      next: "start"
    },
    end,
    interpolation,
    rest
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
