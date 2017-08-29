# Paramour Change-log (Oxygen - XXXI)

_Latest Version_: "Oxygen" 31.0.0

----

- Oxygen, 31.0 (Smino: "Oxygen")
  - improved compile time
  - improved syntax recognition
  - added infinite loop detection for ```compile```

- Arabella, 30.0 (Arctic Monkeys: "Arabella")
  - added Arrow Statements for prototype methods
  - improved syntax recognition

- Gyalchester, 29.0 (Drake: "Gyalchester")
  - improved syntax recognition

- untitled, 28.0 (Kendrick Lamar: "untitled 02 | 06.23.2014")
  - new compiling options, "deps", "mini" and "strict", e.g. ```Paramour(input, {deps: true, mini: true, strict: false});``` or ```# @deps``` etc.
  - added Type Annontaions; must always use ```:Type [arrow statement]``` e.g. ```fn(param):Type -> param;``` or ```fn(param):Type => {-> param};```
  - Arrow Statements, e.g. ```toss(err) +> err;```
  - Quasi-RegExps, e.g. ```///Hello${name || "world"}///i```
  - ```case[Range]``` and ```default[Range]``` (e.g. ```case[0..5] {alert "0 - 5"}```)
  - new Range syntax, ```..``` is inclusive, ```...``` is exclusive. ```a = [0..5]``` same as ```a = [0, 1, 2, 3, 4, 5]```; ```a = [0...5]``` same as ```a = [0, 1, 2, 3, 4]```
  - improved syntax recognition

- Gold, 27.0 (Chet Faker: "Gold")
  - ```undefined``` and ```null``` operator handling in strict mode
  - ```null``` operator
  - new type-controlled spreads, ```fn(Object o, String strings..., Number n) => strings;```
  - improved syntax recognition
  - improved compiling status

- Magnolia, 26.0 (Playboi Carti: "Magnolia")
  - improved syntax recognition
  - improved compiling status

- Your Wish, 25.0 (Majid Jordan: "A Place Like This")
  - <del>new type-controlled declaration syntax, ```String s = "hello world"```, ```Object o = {Date d: new Date()}``` (for capitalized types __ONLY__)</del>
  - imporved syntax recognition

- ..., 24.0 (A Tribe Called Quest: "We The People....")
  - new HTML Tag types, ```fn(<Element> e) => e``` (note: it is recommended you use the JavaScript name of the tag)
  - new Tuple syntax, ```.{}```
  - new type-controlled declarations, ```"String" s = "hello world"```, ```"Object" o = {"Date" d: new Date()}```
  - new ```self``` reserved word in Paramour source code
  - new _strict user_ compiling option, ```# @strict```
  - ```*static_method``` syntax for static methods (i.e. Array.from)
  - improved Tuple, class and prototype syntaxes
  - prototype method names now default to their parent caller's name, ```mthd(Type variable)``` will be named "mthd"

- Consuela, 23.0 (Belly: "Consuela (feat. Young Thug & Zack)")
  - improved syntax recognition
  - updated comments (unminified only)
  - updated ```operator[Type operator Type]``` syntax for named operators (still supports ```operator[Type ; Type]```)
  - new ```"type" x``` typeof syntax, ```"number" 123``` is ```"number" == typeof 123```

- Thursday, 22.0 (The Weeknd: "Thursday")
  - improved syntax recognition
  - new ```NewLine``` constructor, ```new NewLine(String sequence)```
  - ```string = *String 123``` syntax (```string = new String(123)```)
  - assigned brace recognition, (```= {}```, ```: {}```, ```, {}```)
  - improved operator syntax

- Calm Down, 21.0 (G-Eazy: "Calm Down")
  - imporoved JSUNIT features and syntax
    - added ```Object JSUNIT.Test``` to hold all tests
  - ```a < b > c != d == e | f``` - chained operators syntax
  - "Lazy Folding" error checking

- Backseat Freestyle, 20.0 (Kendrick Lamar: "Backseat Freestyle")
  - type controlled methods
  - better syntax recognition and handling

- Cool Girl - XIX, 19.0 (Tove Lo: "Cool Girl")
  - ```class```, ```extends```, ```function``` - native keyword support
  - ```Type .name``` - ```this.name``` types in function declarations
  - Smart paramater syntax, ```(a, b, c){}``` -> ```function(a, b, c){}```
  - ```"""```, ```'''```, ``` ` ```(x3) - top-level quasi blocks

- Fade - XVIII, 18.0 (Kanye West: "Fade")
  - ```Paramour.compile``` - script loading and handling functions
  - ```Paramour.run``` - ```Paramour(input)```
  - ```Paramour.eval``` - ```eval(Paramour(input))```
  - ```a::b```, ```a..b```, ```a@b``` - ```a.prototype.b``` shortcuts
  - ```NaN a```, ```a == NaN```, ```a === NaN``` - ```NaN``` operator and comparison (```!(a <= Infinity)```)

- Caroline - XVII, 17.0 (Aminé: "Caroline")
  - ```shock, unshock``` - Paramour helper functions
  - ```add(a, b, c) => a + b + c;``` - Fat arrow, one line function syntax
  - ```[Type operator Type]``` - new operator statement syntax
  - ```[a..b]```, ```[a...b]``` - slice and splice syntax

- Starboy - XVI, 16.0 (The Weeknd: "Starboy (feat. Daft Punk)")
  - ```# version? block #?``` - Conditional block-statement syntax
  - ```@Test, @Before, @After``` - JSUNIT

- Krogstad - XV, 15.0 (Henrik Ibsen: "Nils Krogstad")
  - ```Yield``` type|statement proposal
  - ```yield``` keyword (```&>```)
  - ```throw new``` keyword (```+>```)
  - ```Tuple.next, Tuple.from``` Tuple enhancements
  - ```/* Docstring */``` DOCSTRING statement syntax

- Prynne - XIV, 14.0 (Nathaniel Hawthorne: "Hester Prynne")
  - ```Spread``` (```...```) type
  - ```Any``` (```*```) type

- Jasmine - XIII, 13.0
  - <del>```<operator # []>``` statement syntax</del>

- Bond - XII, 12.0 (Ian Fleming: "James Bond")
  - ```case(a, b, c)``` statement
  - ```default(a, b, c)``` statement

- Monica - XI, 11.0 ("Monica S. Lewinsky")
  - ```defined``` operator
  - ```undefined``` operator
  - ```var(a, b, c) = value``` statement

- Cleopatra - X, 10.0 ("Cleopatra VII Philopator")
  - Initial release (stable)
  - ```fn(a, b, c){}``` - miniature function syntax with type recognition
  - ```cls {}``` - miniature class syntax, including class extensions
  - ```# comment``` - single line comment syntax
  - ```### comment ###``` - multi-line comment syntax
  - runtime detection
  - Self Evaluation Article

- Iota - IX, 9.0

- Theta - VIII, 8.0

- Eta - VII, 7.0
  - Initial release (unstable)

- Zeta - VI, 6.0

- Epsilon - V, 5.0

- Delta - IV, 4.0

- Gamma - III, 3.0

- Beta - II, 2.0

- Alpha - I, 1.0
  - Initial proposal
