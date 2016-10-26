# Paramour Crash Course
  _This document is for help on how to edit Paramour's source code, if you want help about writing code in Paramour syntax, see [this post](https://codepen.io/ephellon/post/paramour)_

  _For examples of how to use Paramour without editing the source code, see "index.par"_

  _If you want to modify Paramour, or completely build a new language, here are some things to note:_

  __below, some variables are given as "Type name" for properties, and "Return-Type .name" for methods__

## Paramour Variables:
- String ```input``` - the original input given to Paramour; often redeclared inside of some functions
- String ```backup``` - a backup copy of "input"
- Array ```exps``` - all of the patterns used to modify "input," dynamically updated
- RegExp ```errors``` - errors to remove
- RegExp ```reserved``` - reserved words and symbols
- Array ```operators``` - a list of all non-alphanumeric operators
- Object ```oprs``` - a list of each non-alphanumeric operator and a respecting name, {"operator": "name"}
- Boolean ```tabs``` - a boolean that replaces tabs/spaces after Paramour has completed
- Boolean ```JavaScript_Manager``` - an attempt to detect if Paramour is being run via Java
- Function ```self``` - the expression handler once its pattern has been executed by RegExp in Paramour's "brain" (compile)

### __example__
```js
// example of "variable_name.number"
// ".number" is an error in this case
"(\\j)\\.(\\d+)": function(e, a, b) {
  // when using, RegExp -> Functions
  // arguments are given as (RegExp.$_[, RegExp.$1[, RegExp.$2[, ...[, RegExp.$9]]]])
  console.error("@Paramour Error '" + self.name + "'", '->', "'" + e "'")
      // this would log "@Paramour Error '(\j)\.(\d+)' -> 'abc.123'"
    // self refers to the current function being executed
    // the function's name is changed from anonymous -> "(\j)\.(\d+)"
  return "// @Paramour Error: " + e
}
```

- Null ```now``` - TBD
- Null ```later``` - TBD

----

## Paramour's lists and "medulla" (_these are free to change, delete or otherwise add onto_)

- Array ```MULTI_LINE``` - all multiline comments
- Array ```SINGLE_LINE``` - all single line comments
- Array ```REGEXP``` - all Regular Expressions
- Array ```DOUBLE_QUOTE``` - all double quoted strings
- Array ```SINGLE_QUOTE``` - all single quoted strings
- Array ```QUASI``` - all grave quoted strings
- Array ```PAREN``` - all parenthesis expressions
- Array ```BRACK``` - all bracket expressions
- Array ```BRACE``` - all curly brace expressions
- Array ```TUPLES``` - all tuple expressions, double curly brace "{{}}"
- Array ```EMUS``` - all emulation expressions, commented "@version"
- Array ```PHANTOMS``` - all phantom expressions, commented "$variable -> value", or "$variable => value"
- Array ```DOCSTRING``` - all of the docstrings
- Array ```IGNORED``` - temporary spot for ignored expressions
- Array ```VERC``` - the version control comments
- Object ```patterns``` - a list of each expression to look for, with a RegExp to use as the delimiter; the pattern name must macth a variable name that is an array, example {"EMUS": /#\s+@1.5/}
- Object ```runtime``` - __a list that detects/modifies the currently running JavaScript version__
  - Boolean ```.is``` (String|Number version)
      returns if the current JavaScript version is "version"
  - Boolean ```.has``` (String|Number version)
      returns if the current JavaScript version is in the array of supported versions
  - Array ```.emulate``` (String|Number version)
      emulates a different runtime; but adds an asterik to the emulation number, example "1.8.*"
  - String ```.original``` - the actual JavaScript version
  - String ```.emu``` - the emulated version
  - Boolean ```.manned``` - ```true``` if Paramour is being run via a JavaScript Manager
  - Boolean ```.unmanned``` - ```!runtime.manned```
- Array ```SnapShot``` - __a list of snapshots (semi-compiled code) captured by Paramour__
- Array ```.SEA``` - __a list of SEAs (Self Evaluation Articles)__

----

## Other Paramour goodies

### Object navigator

__the original "navigator" object, with some modifications__
- String ```.runtime``` - ```runtime.original```
- Boolean ```.paramour``` - ```true```

### Paramour.compile(Boolean run)

__tell Paramour to load and compile external/html-tag scripts__
- Boolean ```run``` - eval the scripts or not

### String Parmour.run(String code, Boolean embed)

__simply run Paramour, without executing the returning string__

- String ```code``` - the code to compile (Parmour syntax)
- Boolean ```embed``` - block (true) or allow(false) Paramour's "Was Paramour Helpful" feature

### String Parmour.run(String code, Boolean embed)

__run Paramour, and execute the returning string__

- String ```code``` - the code to compile (Parmour syntax)
- Boolean ```embed``` - block (true) or allow(false) Paramour's "Was Paramour Helpful" feature

### Null Paramour.load(String url, Function callback, Object options, Boolean hold)

- String ```url``` - the URL of the .par file to load
- Function ```callback``` - the function to call once the script is loaded
- Object ```options``` - options to use (unused)
- Boolean ```hold``` - stall (true) or allow (false) Paramour from compiling the loaded script

----

### Paramour

__here is a list of methods/properties that may be useful__
- Object ```.dockets``` - a list of functions that Paramour will format, {"function's name": "function's arguments"}
- String ```.types``` (* item...) - returns a comma seperated list of function names/constructors/object types
- Array ```.pull``` (String name) - returns the array of arguments from Paramour.dockets
- Number ```.push``` (String name, String arguments) - adds the "arguments" to Paramour.dockets["name"], and returns its length
- Array ```.docstrings``` - a list of all docstrings

----

# .prototype methods

### String.prototype.repeat
  repeats the string ```x``` many times

  example
  ```js
    "abc".repeat(3)
    // returns: "abcabcabc"
  ```

### String.prototype.toDocument
  see
  ```js
    ("").toDocument.DOCSTRING
  ```

### String.prototype.SI
  see
  ```js
    ("").SI.DOCSTRING
  ```

### String.prototype.toTable
  see
  ```js
    ("").toTable.DOCSTRING
  ```

### Array.prototype.toTable
  see
  ```js
    ([]).toTable.DOCSTRING
  ```

### Number.prototype.toTime
  see
  ```js
    (0).toTime.DOCSTRING
  ```

----

## Paramour Functions:

### Object Tuple (* item...)
  "_[] with {} for-in/yield iteration_"
  __returns a Tuple object, or an item from the Tuple__
  - The first call/declaration of a Tuple returns an object
  - Each call after returns an item from the Tuple, until reaching the end; then returns ```undefined```

### Undefined Operator (String operator, String type, String fix, String function, String brace)
  __returns undefined, but modifies Operator.kids__
  - operator - the symbol(s) that are going to be used
  - type - how many there are, i.e. "==" -> "double equals"
  - fix - the root of the operator: prefix-, media-, or suffix-
  - function - the function to call on, i.e. ```=>(a == b)``` -> ```Double_Equals_Operator```
  - brace - the brace expression that will be used

### String shock(String input)
  __returns a reformatted string (converts escaped characters to "ignored sequences")__
  - String ```input``` - the input to convert

### String unshock(String input)
  __returns a reformatted string (converts "ignored sequences" to escaped characters)__
  - String ```input``` - the input to convert

### String argify (String|Array arguments, String|Array types)
  __returns a formatted list of variable names__

  example
  ```js
    argify("String name")
    // returns: name = arguments[0]
  ```

  example
  ```js
  argify("String name = 'John'")
  // returns: name = arguments[0] || 'John'
  ```

### String unhandle (String input, String|Array type)
  __compressess "input" using "type" or "exps"__

  example
  ```js
  unhandle("a = ['abc', 123]")
  // returns: "a = BRACK.0"
  ```

### String handle (String input, Number index)
  "_see "function handle" for further detail_"

  __decompressess "input" using Paramour's "medulla" along with it's own "medulla"__

  example
  ```js
  handle("a = BRACK.0")
  // returns: "a = [SINGLE_QUOTE.0, 123]"
  ```

### String hand (String input, String defenition)
  __returns a formatted operator-string__

  example
  ```js
  hand("||", "prefix-")
  // returns: "Double_Or_Prefix_Operator_"
  ```

### String decompile (String input, String|Array expressions, Boolean|Number all)
  __searches for and replaces "expressions" using "handle"__
  - * ```expressions``` - comma, space, or pipe seperated list
  - Boolean ```all``` - if true, "decompile" replaces all "expressions", otherwise just the first
  - Number ```all``` - "decompile" replaces that many "expressions"

### String compile (String input, * arguments)
  __the "brain" of Paramour__
  - var patterns - a list of patterns and how to handle them

  __given as {String pattern: function expression_handler}__

  ```\#++``` - (# = [0-9abcdefjknqrstuvxABDEJKNQS]) "repeat a sequence"

  ```\a``` - "alpha characters" [a-zA-Z]

  ```\A``` - "non-alpha characters" [^a-zA-Z]

  ```\j``` - "JavaScript compliant name" [a-zA-Z\$_][\w\$]*

  ```\J``` - "non-JavaScript compliant name" [^a-zA-Z\$_][\w\$]*

  ```\e``` - "alpha/greek characters" [a-z\u03b1-\u03c9_A-Z\u0391-\u03a9]

  ```\E``` - "non-alpha/greek characters" [^a-z\u03b1-\u03c9_A-Z\u0391-\u03a9]

  ```\k[...]``` - "to lowercase"

  ```\K[...]``` - "to uppercase"

  ```\N``` - "number" [\-0]{0,2}[box]?[\d\.]+[\-\d\.e]*

  ```\q``` - "terminating character" [\n\r,;$\{\}\(\)\[\]]

  ```\Q``` - "non-terminating character" [^\n\r,;\{\}\(\)\[\]]

  example of functions
  ```js
  var patterns = {
    // function_name(...) {...}
    "(\\j)\\s*(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)": function(e, a, b, c) {
      return "function " + a + decompile(b) + decompile(c, "BRACE")
    }
  }
  ```

----

## Object JSUNIT

__Unit testing, all below are porperties/methods of the ```JSUNIT``` object__

### Boolean toconsole
  __controls the &lt;stdout&gt;__
  - ```true``` - logs to the ```console```
  - ```false``` - logs to the html element ```#jsunit-stdout```

### Number count
  __the current test that is running__

### assert(received, expected)
  __log that you wanted "received"__
  - received - the received value
  - expected - the expected value

### assertTrue(received, comment)
  __log that you wanted ```true```__
  - received - the received value
  - comment - an optional comment about the error

### assertFalse(received, comment)
  __log that you wanted ```false```__
  - received - the recieved value
  - comment - an optional comment about the error

### assertEquals(received, expected, comment)
  __log that you wanted ```received```__
  - received - the received value
  - expected - the expected value
  - comment - an optional comment about the error

### assertNotEquals(received, expected, comment)
  __log that you did not want ```received```__
  - received - the received value
  - expected - the expected value
  - comment - an optional comment about the error

### assertNull(received, comment)
  __log that you wanted ```null```__
  - received - the received value
  - comment - an optional comment about the error

### assertNotNull(received, comment)
  __log that you did not want ```null```__
  - received - the recieved value
  - comment - an optional comment about the error

### assertUndefined(received, comment)
  __log that you wanted ```undefined```__
  - received - the received value
  - comment - an optional comment about the error

### assertNotUndefined(received, comment)
  __log that you did not want ```undefined```__
  - received - the recieved value
  - comment - an optional comment about the error

### assertNaN(received, comment)
  __log that you wanted ```NaN```__
  - received - the received value
  - comment - an optional comment about the error

### assertNotNaN(received, comment)
  __log that you did not want ```NaN```__
  - received - the recieved value
  - comment - an optional comment about the error

### assertFail(comment)
  __log a fail__
  - comment - an optional comment about the error

### out(error)
  __log an error__
  - error - the error to log

### log(message)
  __log a message__
  - message - the message to log

### stdout(message)
  __log a message to the &lt;stdout&gt;__
  - message - the message to log

### stderr(error)
  __log an error to the &lt;stdout&gt;__
  - error - the error to log

### stdin(query, default)
  __get user input via &lt;stdin&gt;__
  - query - the query to ask the user
  - default - the default value

----

## And after months of developing:
  - funtions - stable
  - spreads - stable
  - classes - stable
  - tuples - stable
  - variables - stable, but testing
  - custom operators - stable, but testing

  ### @prefix vs. suffix operators

  explanation
  ```paramour
    # Each operator can only be used once as either prefix, media, or suffix
    [String?] {
      -> $1.indexOf("&") > -1
    }

    [?String] {
      -> $1.indexOf("&") === -1
    }

    => ("apples & bananas")?
      # returns true
    => ?("apples & bananas")
      # returns true, defaults to ?-suffix
  ```
  - yields - theoretical stage