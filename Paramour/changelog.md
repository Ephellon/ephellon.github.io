# Paramour Knightly Builds
## Help & Documentation

+ See [Paramour's website](https://ephellon.github.io/Paramour/) for documentation and examples.

+ See [Paramour's change log](https://github.com/Ephellon/Ephellon.github.io/blob/master/Paramour/changelog.md) for the change log and history.

+ See [this gist](https://gist.github.com/Ephellon/e5e0a74c0dbd971a9375ac24edfef2f3#file-help-md) if you want help on editing Paramour's source code.

----

+ [Change log](#change-log)
+ [Examples](#examples)
+ [Proposals](#proposals)

----

# Change log

__Alpha, v1__

+ Initial proposal

__Beta, v2__

__Gamma, v3__

__Delta, v4__

__Epsilon, v5__

__Zeta, v6__

__Eta, v7__

+ Initial release (unstable)

__Theta, v8__

__Iota, v9__

## Added in Cleopatra, v10

+ [Mini function syntax](#mini-functions)
+ [Mini class syntax](#mini-classes)
+ [Single line comment syntax](#single-line-comments)
+ [Multiline comment syntax](#multiline-comments)
+ `Paramour`
  - JavaScript runtime detection
  - Self Evaluation Articles (SEAs)

----

## Added in Monica, v11

+ [`defined` operator](#defined-operator)
+ [`undefined` operator](#undefined-operator)
+ [MVSV (Multiple Variable, Same Value) syntax](#mvsv)

----

## Added in Bond, v12

+ [`case` statement](#case-and-default-statements)
+ [`default` statement](#case-and-default-statements)

----

## Added in Jasmine, v13

+ [Operator statement syntax](#removed-operator-statement)

----

## Added in Prynne, v14

+ [Spread (`...`) type](#spread-type)
+ [Any (`*`) type](#any-type)

----

## Added in Krogstad, v15

+ [`yield` keyword (`&>`)](#yield)
+ [`throw new` keyword (`+>`)](#throw-new)
+ `Tuple`
  - `next`
  - `from`
+ [New docstring syntax](#docstring-statements)

----

## Added in Starboy, v16

+ [Conditional block syntax](#conditional-block)
+ [`JSUnit`](#jsunit)

----

## Added in Caroline, v17

+ `Paramour`
  - `esc`
  - `unesc`
+ [Fat arrow syntax](#fat-arrow)
+ [New operator statement syntax](#operator-statements)
+ [Slice syntax](#slice)
+ [Splice syntax](#splice)

----

## Added in Fade, v18

+ `Paramour`
  - `compile`
  - `run`
  - `eval`
+ [Prototype shortcuts](#prototype-shortcuts)
+ [NaN operator](#nan-operator)

----

## Added in Cool Girl, v19

+ Native keyword support
  - `function`
  - `class`
  - `extends`
+ [Controlled parameter types](#controlled-parameter-types)
+ Smart parameter syntax (parameters are shortened, e.g. `f(a, b, c) {}` vs. `f(){var a, b, c}`)
+ [Top level quasi blocks](#top-level-quasis)

----

## Added in Backseat Freestyle, v20

+ [Type controlled methods](#type-controlled-methods)

## Updated in Backseat Freestyle, v20

+ `Paramour`
  - syntax recognition and handling

----

## Added in Calm Down, v21

+ [JSUnit](#jsunit)
  - `Object JSUNIT.Test`
+ [Chained operators syntax](#chained-operators)
+ Lazy folding error checking

## Added in Thursday, v22

+ New `NewLine` constructor
+ [`new` keyword (`*`)](#new)

## Updated in Thursday, v22

+ `Paramour`
  - syntax recognition
+ [Operator statement syntax](#operator-statements)

----

## Added in Consuela, v23

+ [`typeof` syntax](#typeof)

## Updated in Consuela, v23

+ `Paramour`
  - syntax recognition
  - source code commentation
+ [Operator statement syntax](#operator-statements)

----

## Added in ..., v24

+ [New HTML tag types](#html-tag-types)
+ [New Tuple Syntax](#new-tuple-syntax)
+ [New type controlled declarations](#type-controlled-declarations)
+ `Paramour`
  - `self`
+ [New strict user compiling option](#strict-user-compiling)
+ [Static method syntax](#static-method)

## Updated in ..., v24

+ Tuple output syntax
+ [Class output syntax](#mini-class)
+ Prototype output syntax

----

## Added in Your Wish, v25

+ [New type controlled declaration syntax](#removed-type-controlled-declarations)

## Updated in Your Wish, v25

+ `Paramour`
  - syntax recognition

----

## Updated in Magnolia, v26

+ `Paramour`
  - syntax recognition
  - compile time (decreased/faster)

----

## Added in Gold, v27

+ [`null` operator](#null-operator)
+ [Type Controlled Spreads](#type-controlled-spreads)

## Updated in Gold, v27

+ [`defined` operator](#defined-operator)
+ [`undefined` operator](#undefined-operator)
+ `Paramour`
  - syntax recognition
  - compile time (decreased/faster)

---

## Added in untitled, v28

+ `Paramour`
  - `deps` compiling option
  - `mini` compiling option
  - `strict` compiling option
+ [Type Annotations](#type-annotations)
+ [Fat Statements](#fat-statements)
+ [Multiline RegExps](#quasi-regexps)
+ [Range syntaxes](#ranges)

## Updated in untitled, v28

+ `Paramour`
  - syntax recognition

----

## Updated in Gyalchester, v29

+ `Paramour`
  - syntax recognition

----

## Added in Arabella, v30

+ [Arrow statements for prototype methods](#prototype-arrow-statements)

## Updated in Arabella, v30

+ `Paramour`
  - syntax recognition

----

## Added in Oxygen, v31

+ [SI numbering](#si-numbering)
+ `Paramour`
  - infinite loop detection

## Updated in Oxygen, v31

+ `constructor` syntax (from `<init>` to `init::`)
+ `Paramour`
  - syntax recognition
  - compile time (decreased/faster)

----

# Examples

## Cleopatra, v10
### Mini Functions
### Paramour (Input)
```paramour
fn(a, b, c) {
  console.log "Hello world!"
}

var a = fn(){},
    b = {f: fn(){}};
```

### JavaScript (Desired Output)
```javascript
function fn(a, b, c) {
  console.log("Hello world!")
}

var a = function fn(){},
    b = {f: function fn(){}};
```

----

### Mini Classes
### Paramour (Input)
```paramour
cls {}

cls.ext {}
```

### JavaScript (Desired Output)
```javascript
class cls {}

class ext extends cls {}
```

----

### Single-line Comments
### Paramour (Input)
```paramour
# comment
```

### JavaScript (Desired Output)
```javascript
// comment
```

----

### Multiline Comments
### Paramour (Input)
```paramour
###
  comments
###
```

### JavaScript (Desired Output)
```javascript
/*
  comments
*/
```

----

## Monica, v11
### Defined Operator
### Paramour (Input)
```paramour
var window = (defined window)?
  window:
{};
```

### JavaScript (Desired Output)
```javascript
var window = ((window != undefined && window != null))?
  window:
{};
```

----

### Undefined Operator
### Paramour (Input)
```paramour
var window = (undefined window)?
  {}:
window;
```

### JavaScript (Desired Output)
```javascript
var window = ((window == undefined || window == null))?
  {}:
window;
```

----

### MVSV
### Paramour (Input)
```paramour
var (a, b, c) = {};
const (d, e, f) = [];
let (g, h) = "";
```

### JavaScript (Desired Output)
```javascript
var a = {}, b = {}, c = {};
const d = [], e = [], f = [];
let g = "", h = "";
```

----

## Bond, v12
### Case and Default Statements
### Paramour (Input)
```paramour
switch(name) {
  case('Bob', 'Adam') {
    console.log("Hello " + name)
  }

  default('', 'anon', 'anonymous') {
    console.log "You're an anonymous user."
  }
}
```

### JavaScript (Desired Output)
```javascript
switch(name) {
  case 'Bob':
  case 'Adam':
    console.log("Hello " + name)
    break;

  case '':
  case 'anon':
  case 'anonymous':
  default:
    console.log("You're an anonymous user.")
}
```

----

## Jasmine, v13
### Removed: Operator Statement
### Paramour (Input)
```paramour
<operator Operator [ParameterType1, ParameterType2]> {
  # ...
}
```

### JavaScript (Desired Output)
```javascript
function Operator__ParameterType1_ParameterType2($1, $2) {
  // ...
}
```

----

## Prynne, v14
### Spread Type
### Paramour (Input)
```paramour
fn(...args) {
  console.log args
}
```

### JavaScript (Desired Output)
```javascript
function fn_Spread() {
  var arity;
  var args = [].slice.call(arguments);

  console.log(args)
}

function fn() {
  // ...
};
```

----

### Any Type
### Paramour (Input)
```paramour
fn(*arg) {
  console.log arg
}
```

### JavaScript (Desired Output)
```javascript
function fn_Any(arg) {
  console.log(arg)
}

function fn() {
  // ...
}
```

----

## Krogstad, v15
### Yield
### Paramour (Input)
```paramour
*gn(value) {
  &> value
}
```

### JavaScript (Desired Output)
```javascript
function* gn(value) {
  yield value
}
```

----

### Throw New
### Paramour (Input)
```paramour
fn() {
  +> Error "Nothing here"
}
```

### JavaScript (Desired Output)
```javascript
function fn() {
  throw new Error("Nothing here")
}
```

----

### Docstring Statements
### Paramour (Input)
```paramour
/** Just a function
 * [String]
 */
 fn() {}
```

### JavaScript (Desired Output)
```javascript
("* Just a function\n\
* [String]\n\
").setDocString(fn);

function fn() {}
```

----

## Starboy, v16
### Conditional Block
#### Syntaxes
__Is version__

```paramour
# version?
  # ...
#?
```

__Isn't version__

```paramour
# version?!
  # ...
#?
```

__Is at-least version__

```paramour
# version?*
  # ...
#?
```

----

### Paramour (Input)
```paramour
# 1.4?*
console.log "You're using JS v1.4 or higher"
#?
```

### JavaScript (Desired Output)
```javascript
console.log("You're using JS v1.4 or higher")
```

----

### JSUnit
### Paramour (Input)
#### Syntaxes
__Before__

```paramour
@Before {
  # ...
}
```

__After__

```paramour
@After {
  # ...
}
```

__Tests__

```paramour
@Test {
  # ...
}

@Test(parameters) {
  # ...
}(arguments)
```

----

```paramour
@Test {
  let name = 'anon';
  assertEquals(name, 'anon');
}

@Test(win) {
  assertNotNull win;
}(window)
```

### JavaScript (Desired Output)
```javascript
(JSUNIT.Test[0] = function() {
  let name = 'anon';
  JSUNIT.assertEquals(name, 'anon');
})();

(JSUNIT.Test[1] = function(win) {
  assertNotNull(win);
})(window);
```

----

## Caroline, v17
### Fat Arrow
### Paramour (Input)
```paramour
let fn = (...args) => args,
    en = (...errs) +> errs;
```

### JavaScript (Desired Output)
```javascript
let fn = (...args) => args,
    en = (...errs) => {throw new errs};
```

----

### Operator Statements
#### Syntaxes
__Prefix operator (unary)__

```paramour
[Operator ParameterType] {
  # ...
}
```

__Suffix operator (unary)__

```paramour
[ParameterType Operator] {
  # ...
}
```

__Infix operator (binary)__

```paramour
[ParameterType Operator ParameterType] {
  # ...
}
```

----

### Paramour (Input)
```paramour
[Boolean?] {
  if($1)
    console.log 'True';
  else
    console.log 'False';
}

is[*;*] {
  -> $1 === $2;
}
```

### JavaScript (Desired Output)
```javascript
function Question_Mark_Suffix_Operator($1) {
  if($1)
    console.log('True');
  else
    console.log('False');
}

function is__Any_Any($1, $2) {
  return $1 === $2;
}
```

----

### Slice
### Paramour (Input)
```paramour
let a = 'adam steve bill'.split ' ',
    n = 2;

a[..1];
# same as: a[0..1]
# => 'adam'

a[..n];
# same as: a[0..n]
# => ['adam', 'steve']

a[..];
# => ['']
```

### JavaScript (Desired Output)
```javascript
let a = 'adam steve bill'.split(' '),
    n = 2;

a.slice(0, 1);
// same as: a[0..1]
// => 'adam'

a.slice(0, n);
// same as: a[0..n]
// => ['adam', 'steve']

a.slice(0, 0);
// => ['']
```

----

### Splice
### Paramour (Input)
```paramour
let a = 'adam steve bill'.split ' ',
    n = 2;

a[0...1];
# a.splice(0, 1) => ['adam'] / ['steve', 'bill']

a[0..1] = 'susan';
# a.splice(0, 1, 'susan') => ['steve'] / ['susan', 'bill']

a[..] = 'adam';
# a.splice(0, 0, 'adam') => [] / ['adam', 'susan', 'bill']

a[..n] = 'anon';
# a.splice(0, n, 'anon') => ['susan', 'bill'] / ['anon']
```

### JavaScript (Desired Output)
```javascript
let a = 'adam steve bill'.split ' ',
    n = 2;

a.splice(0, 1);
// => ['adam'] / ['steve', 'bill']

a.splice(0, 1, 'susan');
// => ['steve'] / ['susan', 'bill']

a.splice(0, 0, 'adam');
// => [] / ['adam', 'susan', 'bill']

a.splice(0, n, 'anon');
// => ['susan', 'bill'] / ['anon']
```

----

## Fade, v18
### Prototype Shortcuts
### Paramour (Input)
```paramour
a..b

a::b

a@b
```

### JavaScript (Desired Output)
```javascript
a.prototype.b

a.prototype.b

a.prototype.b
```
----

### NaN Operator
### Paramour (Input)
```paramour
if(NaN a || a == NaN || a === NaN || NaN == a || NaN === a)
  console.log 'NaN';
```

### JavaScript (Desired Output)
```javascript
if(!(a <= Infinity) || !(a <= Infinity) || !(a <= Infinity) || !(a <= Infinity) || !(a <= Infinity))
  console.log('NaN');
```

----

## Cool Girl, v19
### Controlled parameter types
### Paramour (Input)
```paramour
fn(String .name) {}
```

### JavaScript (Desired Output)
```javascript
function fn__String(name) {this.name = name}

function fn() {
  // ...
}
```

----

### Top Level Quasis
### Paramour (Input)
```paramour
let string =
"""
I'm a "quasi" string.
"""
```

### JavaScript (Desired Output)
```javascript
let string =
"I'm a \"quasi\" string."
```

----

## Backseat Freestyle, v20
### Type controlled methods
### Paramour (Input)
```paramour
cls {
  .mthd(String name) {
    # ...
  }
}
```

### JavaScript (Desired Output)
```javascript
class cls {
  mthd__String(name) {
    // ...
  }

  mthd() {
    // ...
  }
}
```

----

## Calm Down, v21
### Chained Operators
### Paramour (Input)
```paramour
if(1 < 2 > 0 != 5)
  console.log 'Should be true';
```

### JavaScript (Desired Output)
```javascript
if(1 < 2 && 2 > 0 && 0 != 5)
  console.log('Should be true');
```

----

## Thursday, v22
### New
### Paramour (Input)
```paramour
let error = *Error 'Just an error';
```

### JavaScript (Desired Output)
```javascript
let error = new Error('Just an error');
```

----

## Consuela, v23
### Typeof
### Paramour (Input)
```paramour
"boolean" true;
"undefined" variable;
"function" Function;
```

### JavaScript (Desired Output)
```javascript
"boolean" == typeof true;
"undefined" == typeof variable;
"function" == typeof Function;
```

----

## ..., v24
### HTML Tag Types
### Paramour (Input)
```paramour
write(String message, <div> element) {
  element.innerHTML = message
}
```

### JavaScript (Desired Output)
```javascript
function write__String_HTMLDivElement(message, element) {
  element.innerHTML = message
}

function write() {
  // ...
}
```

----

### New Tuple Syntax
### Paramour (Input)
```paramour
var(catcher, value_1) = .{
  "abc", 123, /def/g, [123, 456, 789]
};

var(value_2, value_3) = Tuple.next;

###
  catcher - the Tuple itself
  value_1 - "abc"
  value_2 - 123
  value_3 - /def/g
###

var value_4 = catcher.next();
  # value_4 - [123, 456, 789]
```

### JavaScript (Desired Output)
```javascript
var catcher = new Tuple("abc", 123, /def/g, [123, 456, 789]),
    value_1 = Tuple.next;

var value_2 = Tuple.next, value_3 = Tuple.next;

/*
  catcher - the Tuple itself
  value_1 - "abc"
  value_2 - 123
  value_3 - /def/g
*/

var value_4 = catcher.next();
  // value_4 - [123, 456, 789]
```

----

### Type Controlled Declarations
### Paramour (Input)
```paramour
var "String" string = "anon": "backup",
    "Object" object = {
      "Function" method: fn() {}
    };
```

### JavaScript (Desired Output)
```javascript
var string = (((string = "anon") instanceof String)? string: "backup"),
    object = (((object = {
      method: (((Global['__method__'] = fn) instanceof Function)? Global['__method__']: undefined)
    }) instanceof Object)? object: undefined);
```

----

### Strict User Compiling
### JavaScript (Input)
```javascript
var output = Paramour("var self = @", {strict: true});
```

### Paramour (Input)
```paramour
# @strict

var self = @
```

### JavaScript (Desired Output)
```javascript
(function() {
  // strict

  var self = this
})();
```

----

### Static Method
### Paramour (Input)
```paramour
cls {
  *method() {}
}
```

### JavaScript (Desired Output)
```javascript
class cls {
  static method() {}
}
```

----

## Your Wish, v25
### Removed: Type Controlled Declarations
### Paramour (Input)
```paramour
var "String" string = "anon",
    "Object" object = {
      "Function" method: fn() {}
    };
```

### JavaScript (Desired Output)
```javascript
var string = (((string = "anon") instanceof String)? string: "backup"),
    object = (((object = {
      method: (((Global['__method__'] = fn) instanceof Function)? Global['__method__']: undefined)
    }) instanceof Object)? object: undefined);
```

----

## Gold, v27
### Null Operator
### Paramour (Input)
```paramour
if(null variable)
  console.log 'NULL';
```

### JavaScript (Desired Output)
```javascript
if(null == variable)
  console.log('NULL');
```

----

### Type Controlled Spreads
### Paramour (Input)
```paramour
# $con -> console

log(String message, String details...) {
  $con.log(message, details);
}

log(String message, details...) {
  $con.log message;
}
```

### JavaScript (Desired Output)
```javascript
// con -> console

function log__String_Spread$String(message, details) {
  console.log(message, details);
}

function log__String_Spread() {
  var arity;
  var message = arguments[0],
      details = [].slice.call(arguments).slice(1, arguments.length);
  console.log(message);
}

function log() {
  var index = 0, args = arguments, types = Types.apply(null, arguments).split(','), check = Types.check, oftype = Types.oftype;

  switch(types + '') {
    case ('String,' + oftype('String', types.slice(index, args.length)) + ''):
      return log__String_Spread$String.apply(null, args);
      break;
    case ('String,' + types.slice(1, args.length) + ''):
      return log__String_Spread.apply(null, args);
      break;
    default:
      throw TypeError('log(' + types + ') is undefined');
      break;
  }
};
```

----

## untitled, v28
### Type Annotations
### Paramour (Input)
```paramour
fn(a, b, c):undefined => {
  # return nothing
}
```

### JavaScript (Desired Output)
```javascript
function fn(a, b, c) {
  // return nothing
}
```

----

### Fat Statements
### Paramour (Input)
```paramour
fn1(...args) -> args;
fn2(...args) => args;
*gn(...args) &> args;
er1(...args) ~> args;
er2(...args) +> args;
```

### JavaScript (Desired Output)
```javascript
function fn1(...args) {return args};
function fn2(...args) {return args};
function *gn(...args) {yield args};
function er1(...args) {throw args};
function er2(...args) {throw new args};
```

----

### Quasi RegExps
### Paramour (Input)
```paramour
phoneNo(String number):Boolean ->
///
  ^\(?(\d{3})\)? # (xxx) = area code (ignore optional parenthesis)
  [-\s]?(\d{3})  #  xxx  = prefix (ignore optional dash or space)
  -?(\d{4})      # -xxx  = line-number (ignore optional dash)
///.test number
```

### JavaScript (Desired Output)
```javascript
function phoneNo__String(number) {return RegExp('^(?(d{3}))?[-s]?(d{3})-?(d{4})', '').test(number)}

function phoneNo() {
  // ...
}
```

----

### Ranges
### Syntaxes

__From-To (from A to Z, inclusive)__

```paramour
var array = [1..26]
# [1 ... 26]
```

__From-With (from A to A + Z, inclusive)__

```paramour
var array = [1...26]
# [1 ... 27]
```

----

### Paramour (Input)
```paramour
var array = [1..5],
    brray = [1...5];

# nrray = [-5..10] => [-5 ... 10]
# Nrray = [-5...10] => [-5 ... 5]
```

### JavaScript (Desired Output)
```javascript
var array = [1, 2, 3, 4, 5],
    brray = [1, 2, 3, 4, 5, 6];

// nrray = [-5..10] => [-5 ... 10]
// Nrray = [-5...10] => [-5 ... 5]
```

----

## Arabella, v30
### Prototype Arrow Statements
### Paramour (Input)
```paramour
cls {
  .mhtd(...args) -> args
}
```

### JavaScript (Desired Output)
```javascript
class cls {
  mthd__Spread(...args) {
    return args
  }

  mthd() {
     // ...
  }
}
```

----

## Oxygen, v31
### SI Numbering

*Note: Does not support the thousands place.*

### Paramour (Input)
```paramour
var m = 1.234.567,
    k = 123456;
```

### JavaScript (Desired Output)
```javascript
var m = 1234567,
    k = 123456;
```

----

# Proposals

## Lexical Phantoms
### Paramour (Input)
```paramour
# $win -> window
  # a global phantom
$win.onload = () {
  # $name -> this.name
    # a phantom that belongs to this function
    # I know `@name` could've been used, but this is for show
  if(undefined $name)
    -> $name = "anonymous";
  -> $name
}

(() {
  # $name -> "Mr. Anon"
    # another phantom, but belongs to this function
  -> $win = {anon: $name}
})();
```

### JavaScript (Desired Output)
```javascript
// win -> window
  // a global phantom
window.onload = function() {
  // name -> this.name
    // a phantom that belongs to this function
    // I know `@name` could've been used, but this is for show
  if((this.name === undefined || this.name === null))
    return this.name = "anonymous";
  return this.name
}

(funtion() {
  // name -> "Mr. Anon"
    // another phantom, but belongs to this function
  return window = {anon: "Mr. Anon"}
})();
```

----

## Custom Syntax Statments (simple)
### Paramour (Input)
```paramour
var each = 1, every_other = 2;

# $1 - \j
# %1 - \l+
# &1 - ${reserved words}
# $@ - random variable name (static for each statement)

{for($1 $2 in %3) $$} {
  for(var $@:index = 0, $@:array = %3, $@:length = array.length, $2; index < length; index += $1)
    $$ use $2 = array[index];
}

# the statements below match the pattern above
  # $1 - "each", "every_other"
  # $2 - "item"
  # %3 - "[1, 2, 3]"
  # $@:... - creates a "link" for the word "...", i.e. "$@:index" will replace all "index" with the correct random name
  # $$ - "{\n  console.log(item);\n}"

for(each item in [1, 2, 3]) {
  console.log(item);
}

for(every_other item in [1, 2, 3])
  console.log item;
```

### JavaScript (Desired Output)
```javascript
var each = 1, every_other = 2;

// $1 - \j
// %1 - \l+
// &1 - ${reserved words}
// $@ - random variable name (static for each statement)

// for statement

// the statements below match the pattern above
  // $1 - "each", "every_other"
  // $2 - "item"
  // $3 - "[1, 2, 3]"
  // $@:... - creates a "link" for the word "...", i.e. "$@:index" will replace all "index" with the correct random name
  // $$ - "{\n  console.log(item);\n}"

for(var randomName1 = 0, randomName2 = [1, 2, 3], item; randomName1 < randomName2.length; randomName1 += each) (function(){
  console.log(item);
})(item = randomName2[randomName1]);

for(var randomName3 = 0, randomName4 = [1, 2, 3], item; randomName3 < randomName4.length; randomName3 += every_other) (function(){
  console.log(item);
})(item = randomName4[randomName3]);
```

----

## Custom Syntax Statments (difficult)
### Paramour (Input)
```paramour
# $1 - \j
# %1 - \l+
# &1 - ${reserved words}
# $@ - random variable name (static for each statement)

{when($1 of $2) $$} {
  var $@:interval = setInterval(() {
    if($1.constructor === $2) {
      clearInterval interval;
      $$
    }
  }, 10);
}

var fruits = [
  "Apples"
  "Bananas"
  "Coconuts"
  "Dates"
  "Figs"
  "Grapes"
  "Kiwi"
  "Lemons"
  "Nectarines"
  "Peaches"
  "Tangerines"
  "Ugly Fruits"
];

when(fruits of String)
  +> TypeError "The fruits array was changed. Stop touching stuff.";
```

### JavaScript (Desired Output)
```javascript
var fruits = [
  "Apples",
  "Bananas",
  "Coconuts",
  "Dates",
  "Figs",
  "Grapes",
  "Kiwi",
  "Lemons",
  "Nectarines",
  "Peaches",
  "Tangerines",
  "Ugly Fruits"
];

var randomName1 = setInterval(function() {
  if(fruits.constructor === String) {
    clearInterval(randomName1);
    throw new TypeError("The fruits array was changed. Stop touching stuff.")
  }
}, 10);
```

----

## Import/Export
### Paramour (Input)
```paramour
# export [String - *], window, this.name
/** (String $1, * $2)
 * $1.replace($2, "")
 * @param {String} $1 The string to use as the parent
 * @param {*} $2 The child to replace in the parent
 */
[String - *] {
  -> $1.replace($2, "")
}

# import [String * Number], Global.window
```

### JavaScript (Desired Output)
```javascript
("* (String $1, Number $2)\n" +
" * $1.repeat($2)\n" +
" * @param {String} $1 The string to repeat\n" +
" * @param {Number} $2 The number of times to repeat\n" +
" ").attachTo(Star_Operator__String_Number);

function Star_Operator__String_Number($1, $2) {
  return $1.repeat($2)
}
```

----
