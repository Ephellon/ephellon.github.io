# Paramour Crash Course
  _If you want to modify Paramour, or completely build a new language, here are some things to note:_

  __below, some variables are given as "Type name", and "Return-Type Type name"__

## Paramour Variables:
- String input - the original input given to Paramour; often redeclared inside of some functions
- String backup - a backup copy of "input"
- Array exps - all of the patterns used to modify "input," dynamically updated
- RegExp errors - errors to remove
- RegExp reserved - reserved words and symbols
- Array operators - a list of all non-alphanumeric operators
- Object oprs - a list of each non-alphanumeric operator and a respecting name, {"operator": "name"}
- Boolean tabs - a boolean that replaces tabs/spaces after Paramour has completed
- Boolean JavaScript_Manager - an attempt to detect if Paramour is being run via Java
- Function self - the expression handler once its pattern has been executed by RegExp in Paramour's "brain" (compile)

### __example__
```js
"(\\j)\\.(\\d+)": function(e, a, b) {
  console.log("Error@" + self.name, e)
    // self refers to the current function being executed
    // the function's name is changed from anonymous -> "(\j)\.(\d+)"
  return "// Error: " + e
}
```

- Null now - TBD
- Null later - TBD

----

## Paramour's lists and "medulla"; (_these are free to change, delete or otherwise add onto_)

- Array MULTI_LINE - all multiline comments
- Array SINGLE_LINE - all single line comments
- Array REGEXP - all Regular Expressions
- Array DOUBLE_QUOTE - all double quoted strings
- Array SINGLE_QUOTE - all single quoted strings
- Array QUASI - all grave quoted strings
- Array PAREN - all parenthesis expressions
- Array BRACK - all bracket expressions
- Array BRACE - all curly brace expressions
- Array TUPLES - all tuple expressions, double curly brace "{{}}"
- Array EMUS - all emulation expressions, commented "@version"
- Array PHANTOMS - all phantom expressions, commented "$variable -> value", or "$variable => value"
- Array DOCSTRING - all of the docstrings
- Array IGNORED - temporary spot for ignored expressions
- Object patterns - a list of each expression to look for, with a RegExp to use as the delimiter; the pattern name must macth a variable name that is an array, example {"EMUS": /#\s+@1.5/}
- Object runtime - __a list that detects/modifies the currently running JavaScript version__
  - Boolean function .is (String|Number version)
      returns if the current JavaScript version is "version"
  - Boolean function .has (String|Number version)
      returns if the current JavaScript version is in the array of supported versions
  - Array function .emulate (String|Number version)
      emulates a different runtime; but adds an asterik to the emulation number, example "1.8.*"
  - String .original - the actual JavaScript version
  - String .emu- ```the emulated version```
  - Boolean .manned - ```true``` if Paramour is being run via a Java Script Manager
  - Boolean .unmanned - ```!runtime.manned```

----

## Other Paramour goodies

### Object navigator

__the original "navigator" object, with some modifications__
- String .runtime - ```runtime.original```
- Boolean .paramour - ```true```

----

### Paramour

__here is a list of methods/properties that may be useful__
- Object .dockets - a list of functions that Paramour will format, {"function's name": "function's arguments"}
- String function .types (* item...) - returns a comma seperated list of function names/constructors/object types
- Array function .pull (String name) - returns the array of arguments from Paramour.dockets
- Number function .push (String name, String arguments) - adds the "arguments" to Paramour.dockets["name"], and returns its length
- Array .docstrings - a list of all docstrings

----

# .prototype methods

### String.prototype.repeat
  repeats the string ```x``` many times
  ```js
    "abc".repeat(3)
    // abcabcabc
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

### Tuple (* item...)
  "_[] with {} for-in/yield iteration_"
  __returns a Tuple object, or an item from the Tuple__
  - The first call/declaration of a Tuple returns an object
  - Each call after returns an item from the Tuple, until reaching the end; then returns ```undefined```

### Operator (String operator, String type, String fix, String function, String brace)
  __returns undefined, but modifies Operator.kids__
  - operator - the symbol(s) that are going to be used
  - type - how many there are, i.e. "==" -> "double equals"
  - fix - the root of the operator: prefix-, media-, or suffix-
  - function - the function to call on, i.e. ```=>(a == b)``` -> ```Double_Equals_Operator```
  - brace - the brace expression that will be used

### argify (String|Array arguments, String|Array types)
  __returns a formatted list of variable names__
  example
  ```js
    argify("String name")
  ```

  returns
  ```js
  name = arguments[0]
  ```
  example
  ```js
  argify("String name = 'John'")
  ```

  returns
  ```js
  name = arguments[0] || 'John'
  ```

### unhandle (String input, String|Array type)
  __compressess "input" using "type" or "exps"__
  example
  ```js
  unhandle("a = ['abc', 123]")
  ```

  returns
  ```js
  "a = BRACK.0"
  ```

### handle (String input, Number index)
  "_see "function handle" for further detail_"
  __decompressess "input" using Paramour's "medulla" along with it's own "medulla"__
  example
  ```js
  handle("a = BRACK.0")
  ```

  returns
  ```js
  "a = [SINGLE_QUOTE.0, 123]"
  ```

### hand (String input, String defenition)
  __returns a formatted operator-string__
  example
  ```js
  hand("||", "prefix-")
  ```

  returns
  ```js
  "Double_Or_Prefix_Operator_"
  ```

### decompile (String input, String|Array expressions, Boolean|Number all)
  __searches for and replaces "expressions" using "handle"__
  - * expressions - comma, space, or pipe seperated list
  - Boolean all - if true, "decompile" replaces all "expressions", otherwise just the first
  - Number all - "decompile" replaces that many "expressions"

### compile (String input, * arguments)
  __the "brain" of Paramour__
  - var patterns - a list of patterns and how to handle them
    __given as {String pattern: function expression_handler}__
    ```\j``` - variable name "[a-z\$_][\w\$]*"
    ```\#``` - number "(\.\d+)"
    ```\s``` - spaces (no newline/carriage return) "[\x20\t\v ]"
    example of functions
    ```js
    var pattern = {
      // ...
      "(\\j)\\s*(PAREN\\.\\#)\\s*(BRACE\\.\\#)": function(e, a, b, c) {
        return "function " + a + decompile(b) + decompile(c, "BRACE")
      }
    }
    ```

----

## And after ~2 weeks of developing:
  - funtions - stable
  - spreads - stable
  - classes - stable
  - tuples - stable
  - variables - stable, but testing
  - custom operators - stable, but testing
    @prefix vs. suffix operators
    explanation
    ```paramour
      "Each operator can only be used once as either prefix, media, or suffix"
      <suffix-operator ? [String]> {
        -> $1.indexOf("&") > -1
      }

      <prefix-operator ? [String]> {
        -> $1.indexOf("&") === -1
      }

      => ("apples & bananas")?
        # returns true
      => ?("apples & bananas")
        # returns true, defaults to ?-suffix
    ```
  - yields - theoretical stage