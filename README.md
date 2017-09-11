# Paramour Crash Course
  _This document is for help on how to edit Paramour's source code, if you want to know about Paramour versions and proposals, see [this post](https://codepen.io/ephellon/post/paramour)_.

  _For documentation and examples, see [Paramour](https://Ephellon.github.io/Paramour/)._

  _If you want to modify Paramour, or completely build a new language, here are some things to note:_

  _Some methods are structured below as ```Type name```, ```Return-Type .name```, ```Return-Type (Type name)```, __or__ ```Type name:Return-Type```._

## Paramour Variables:
- String ```input``` - the original input given to Paramour; often redeclared inside of some functions
- String ```backup``` - a backup copy of "input"
- Array ```expressions``` - all of the patterns used to modify "input," dynamically updated
- RegExp ```errors``` - errors to remove
- RegExp ```reserved``` - reserved words and symbols
- Array ```operators``` - a list of all non-alphanumeric operators
- Object ```operator_names``` - a list of each non-alphanumeric operator and a respecting name, {"operator-symbol": "operator-name"}
- Boolean ```tabs``` - a boolean that replaces tabs/spaces after Paramour has completed
- Boolean ```JavaScript_Manager``` - an attempt to detect if Paramour is being run via Java
- Function ```self``` - the expression handler once its pattern has been executed by RegExp in Paramour's "brain" (compile)

### __example__ _(inside of the ```compile``` function)_
```js
// example of "variable_name.number" which is illegal
// ".number" is an error in this case
"(\\j)\\.(\\d+)": function($_, $1, $2) {
  // when using, RegExp -> Functions
  // arguments are given as (RegExp.$_[, RegExp.$1[, ...[, RegExp.$9]]], indexOf)
  console.error("@Paramour Error '" + self.name + "'", '->', "'" + $_ "'");
    // this would log "@Paramour Error '(\j)\.(\d+)' -> 'abc.123'"
    // self refers to the current function being executed
    // the function's name is changed from "anonymous" to "(\j)\.(\d+)"
  return "// @Paramour Error: " + $_
}
```

- Null ```now``` - TBD
- Null ```later``` - TBD

----

## Paramour's lists and "medulla" (_these are free to change, delete or otherwise add onto_)

- Array ```SU``` - all strict user comments
- Array ```ML``` - all multiline comments
- Array ```SL``` - all single line comments
- Array ```RX``` - all Regular Expressions
- Array ```DQ``` - all double quoted strings
- Array ```SQ``` - all single quoted strings
- Array ```QI``` - all grave quoted quasi strings
- Array ```Sq``` - all triple, single-quotation quasi strings
- Array ```Dq``` - all triple, double-quotation quasi strings
- Array ```Tq``` - all triple, grave quoted quasi strings
- Array ```Rq``` - all triple, quasi RegExps
- Array ```PR``` - all parenthesis expressions
- Array ```BK``` - all bracket expressions
- Array ```BE``` - all curly brace expressions
- Array ```TP``` - all tuple expressions, dot-curly brace ".{}"
- Array ```EM``` - all emulation expressions, commented "@version"
- Array ```PN``` - all phantom expressions, commented "$variable -> value", or "$variable => value"
- Array ```DS``` - all of the docstrings
- Array ```IG``` - temporary spot for ignored expressions
- Array ```ST``` - temporary spot for ignored strings
- Array ```VC``` - the version control comments
- Object ```patterns``` - a list of each expression to look for, with a RegExp to use as the value; the name must macth an array name, example ```{"EM": /#\s*@([\d\.]+)/}```
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
- Object ```.SnapShot```: Array - __an array of snapshots (semi-compiled code) captured by Paramour__
  - Number ```[Time]```: String - __a string of the semi-compiled input__
- Array ```.SEA``` - __a list of SEAs (Self Evaluation Articles)__

----

## Other Paramour goodies

### Object navigator

__the original "navigator" object, with some modifications__
- Object ```.runtime``` - ```runtime```
- Boolean ```.paramour``` - ```true```

### Undefined Paramour.compile(Boolean run)

__tell Paramour to load and compile external/html-tag scripts__
- Boolean ```run``` - eval the scripts or not

### String Parmour.run(String code, Object options)

__simply run Paramour, without executing the returning string__

- String ```code``` - the code to compile (Parmour syntax)
- Object ```options``` - the compiling options to use (over-written by in-script options)

### String Parmour.eval(String code, Object options)

__run Paramour, and execute the returning string__

- String ```code``` - the code to compile (Parmour syntax)
- Object ```options``` - the compiling options to use (over-written by in-script options)

### Null Paramour.load(String url, Function callback, Object options, Boolean hold)

- String ```url``` - the URL of the file to load
- Function ```callback``` - the function to call once the script is loaded
- Object ```options``` - options to use (unused)
- Boolean ```hold``` - stall (true) or allow (false) Paramour from compiling the loaded script

----

### Paramour

__Here's a list of methods/properties that may be useful__

- _**type** can be ```"class"```, ```"native"```, or ```"sub"```_

- Object ```.Push``` (String type, String function-name, String arguments[, String variation]) - a list of functions that Paramour will format as ```variation: {function-name: arguments}```
- Array ```.Pull``` (String type, String function-name[, String variation]) - returns the array of arguments from ```Paramour[type]```
- String ```.types``` (* item...) - returns a comma seperated list of function names/constructors/object types
- Array ```.DOCSTR``` - a list of all docstrings

----

# .prototype methods

_These are usually handled natively by JavaScript, unless inside of a JavaScript Manager._

### String.prototype.repeat (Number times)
  repeats the string ```times``` many times

  ```js
  "abc".repeat(3)
  // returns: "abcabcabc"
  ```

### String.prototype.setDocString (* item)
  attaches the string to ```item```

  ```js
  "Creates a prompt bubble to get user input".setDocString(window.prompt);
  ```

### String.prototype.SI (Number leaps, Boolean mode)
  returns length of the string as an SI unit: Kb, Mb, etc.

  - Number ```leaps``` - the number of untis to suppress/skip
  - Boolean ```mode``` - use 1024 (false) or 1000 (true) counting mode

  ```js
  ".".repeat(1024).SI()
    // returns 1Kb
  ".".repeat(2440).SI()
    // returns 2Kb
  ".".repeat(2440).SI(1)
    // returns 2440
  ".".repeat(2440).SI(0, true)
    // returns 2440K
  ```

### String.prototype.toTable (String delimeter)
  prints the string as a table (such as the SEA)

  - String ```delimeter``` - the character(s) to split the string by; defaults to ```"|"```

  ```js
  // note - the content must be less than 12 characters in length, otherwise an ellipsis is added
  // example
    'abc def abcdefghijklmnopqrstuvwxyz'.toTable(" ")
      // returns 'abc         | def         | abcdefghi...'
  ```

### Array.prototype.toTable
  prints the array as a table (such as the SEA)

  ```js
  // note - the content must be less than 12 characters in length, otherwise an ellipsis is added
  // example
    ['abc', 'def', 'abcdefghijklmnopqrstuvwxyz'].toTable()
      // returns 'abc         | def         | abcdefghi...'
  ```

### Array.prototype.indexOfRegExp (RegExp pattern)
  returns the index of the first item that matches the ```pattern```, -1 if not found

  - RegExp ```pattern``` - the pattern to look for

  ```js
  ['apple', 'taco', 'dew', 'money', 'gas', 'random'].indexOfRegExp(/^(\w{3})$/)
  // returns 2, for 'dew'
  ```

### Array.prototype.lastIndexOfRegExp (RegExp pattern)
  returns the last index of the first item that matches the ```pattern```, -1 if not found

  - RegExp ```pattern``` - the pattern to look for

  ```js
  ['apple', 'taco', 'dew', 'money', 'gas', 'random'].lastIndexOfRegExp(/^(\w{3})$/)
  // returns 4, for 'gas'
  ```

### Number.prototype.toTime
  returns the given number as an SI unit of time starting at milliseconds

  ```js
  1234..toTime()
  // returns 1.234 sec
  ```

----

## Paramour Functions and Classes:

### Object Tuple (* item...)
  __returns a Tuple object with the following properties__

  - Function ```constructor``` - ```Tuple```
  - Boolean ```every(Function function)``` - see [Array.prototype.every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
  - Object ```forEach(Function function)``` - see [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
  - Number ```indexOf(* item)``` - see [Array.prototype.indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
  - String ```join(String delimeter)``` - see [Array.prototype.join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
  - Number ```lastIndexOf(* item)``` - see [Array.prototype.lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
  - Object ```next(Number places)``` - traverses (moves forward) the Tuple's index by ```places``` many places; defaults to 1

### Object NewLine (String characters)
  __returns a NewLine object, which represents the newline sequence given in ```characters```__
  - Supports ```\n```, ```\r```, and ```\f``` in the sequence (\n, \r, \r\n, etc.)
  - Also returns the ```.esc``` and ```.unesc``` properties

### Undefined Operator (String operator, String type, String fix, String function, String brace)
  __returns undefined, but modifies Operator.kids__
  - String ```operator``` - the symbol(s) that are going to be used
  - String ```type``` - how many there are, i.e. "==" -> "double equals"
  - String ```fix``` - the root of the operator: prefix-, media-, or suffix-
  - String ```function``` - the function to call on, i.e. ```=>(a == b)``` -> ```Double_Equals_Operator```
  - String ```brace``` - the brace expression that will be used

### String shock (String input, Boolean reescape)
  __returns a reformatted string (converts escaped characters to "ignored sequences")__
  - String ```input``` - the input to convert
  - Boolean ```reescape``` - if true, will return just the character, otherwise will return a backslash and the character

### String unshock (String input)
  __returns a reformatted string (converts "ignored sequences" to escaped characters)__
  - String ```input``` - the input to convert

### String argify (String|Array arguments, String|Array types)
  __returns a formatted list of variable names__

  ```js
    argify("String name = 5")
    // returns: name = arguments[0]
  ```

  ```js
  argify("String name = 'John'")
  // returns: name = (arguments[0] !== undefined? arguments[0]: 'John')
  ```

### String fold (String input, String|Array type)
  __compressess "input" using "type" or "expressions"__

  ```js
  fold("a = ['abc', 123]")
  // returns: "a = BK.0"
  ```

### String handle (String input, String|Array|RegExp items)
  _see "function handle" for further detail_

  __decompressess "input" using Paramour's "medulla" along with it's own "medulla"__

  ```js
  handle("a = BK.0", "BK")
  // "BK" means handle "BK" patterns only
  // returns: "a = [SQ.0, 123]"
  ```

### String handle_operators (String input, String defenition)
  __returns a formatted operator-string__

  ```js
  handle_operators("||", "prefix-")
  // returns: "Double_Or_Prefix_Operator_"
  ```

### String unfold (String input, String|Array expressions, Boolean|Number all)
  __searches for and replaces "expressions" using "handle"__
  - String ```expressions``` - comma, space, or pipe seperated list
  - Array ```expressions``` - a list of expressions, i.e. ```["BK", "RX", "TP"]```
  - Boolean ```all``` - if true, "unfold" replaces all "expressions", otherwise just the first
  - Number ```all``` - "unfold" replaces that many "expressions"

### String compile (String input, Number pattern-index)
  __the "brain" or "medulla" of Paramour__
  - ```var patterns``` - a list of patterns and how to handle them, given as ```{String pattern: Function expression_handler}```

#### available shorthands for ```pattern```

  ```\\#++``` - "repeat a sequence" (where # = [0-9abcdefjklnqrstuvxABDEJKLNQS])

  ```\\a``` - "alpha characters" ```/[a-zA-Z]/```

  ```\\A``` - "non-alpha characters" ```/[^a-zA-Z]/```

  ```\\j``` - "JavaScript compliant name" ```/[a-zA-Z\$_][\w\$]*/```

  ```\\J``` - "non-JavaScript compliant name" ```/[^a-zA-Z\$_][\w\$]*/```

  ```\\e``` - "alpha/greek characters" ```/[a-z\u03b1-\u03c9_A-Z\u0391-\u03a9]/```

  ```\\E``` - "non-alpha/greek characters" ```/[^a-z\u03b1-\u03c9_A-Z\u0391-\u03a9]/```

  ```\\l``` - "legal characters" ```/[@\w\$\.]/```

  ```\\L``` - "illegal characters" ```/[^@\w\$\.]/```

  ```\\k[...]``` - "to lowercase"

  ```\\K[...]``` - "to uppercase"

  ```\\N``` - "number" ```/\-?(?:[\d\.]+(?:\-?e\-?[\d\.]+)?|0(?:b[01]+|o[0-7]+|x[0-9a-f]+))/```

  ```\\q\b``` - "space independent, terminating character" (```\b``` is a backspace) ```/[,;$\{\}\(\)\[\]]/```

  ```\\Q\b``` - "space independent, non-terminating character" (```\b``` is a backspace) ```/[^,;\{\}\(\)\[\]]/```

  ```\\q``` - "terminating character" ```/[\n\r,;$\{\}\(\)\[\]]/```

  ```\\Q``` - "non-terminating character" ```/[^\n\r,;\{\}\(\)\[\]]/```

  __example of "functions"__
  ```js
  var patterns = {
    // function_name(...) {...}
    "(\\j)\\s*(PR\\.\\d+)\\s*(BE\\.\\d+)": function($_, $1, $2, $3) {
      return "function " + $1 + unfold($2) + unfold($3, "BE");
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

### assert(expected, received)
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

### assertEquals(expected, received, comment)
  __log that you wanted ```expected```__
  - received - the received value
  - expected - the expected value
  - comment - an optional comment about the error

### assertNotEquals(expected, received, comment)
  __log that you did not want ```expected```__
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
  - functions - stable
  - spreads - stable
  - classes - stable
  - tuples - stable
  - variables - stable
  - custom operators - stable
  - yields - theoretical stage

## Errors?

  ### @prefix vs. suffix operators

  explanation
  ```paramour
    # Each operator can only be used once as either prefix, media, or suffix
    [String?] =>
      $1.indexOf "&" > -1;

    [?String] =>
      $1.indexOf "&" == -1;

    => ("apples & bananas")?
      # returns true
    => ?("apples & bananas")
      # returns true, defaults to ?-suffix
  ```
