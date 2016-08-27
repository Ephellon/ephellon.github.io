Java Compliant - Paramour
-------------------------
(custom .par files) A quick-build JavaScript interpreter; Python-like syntax with JavaScript goodies, the perfect rendezvous for a web-developer that doesn't need a server to take up anymore space

A [Pen](http://codepen.io/Ephellon/pen/yJAqrR) by [Mink CBOS - Ephellon Dantzler](http://codepen.io/Ephellon) on [CodePen](http://codepen.io/).

[License](http://codepen.io/Ephellon/pen/yJAqrR/license).
# How To
## From Command Line [Windows]
```bat
:: to compile files without prompts
paramour file1 file2
:: to compile files with a prompt
paramour
```
----
## From Java VM
```java
// something like...
import paramour.Paramour
private static Paramour par = new Paramour();

// gather the file names
for(int x = 0; x < fileNames.length; x++)
  par.eval(file);
```