/**
 * @license Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for Clojure.
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-lisp">(my lisp code)</pre>
 * The lang-cl class identifies the language as common lisp.
 * This file supports the following language extensions:
 *     lang-clj - Clojure
 *
 *
 * I used lang-lisp.js as the basis for this adding the clojure specific
 * keywords and syntax.
 *
 * "Name"    = 'Clojure'
 * "Author"  = 'Rich Hickey'
 * "Version" = '1.2'
 * "About"   = 'Clojure is a lisp for the jvm with concurrency primitives and a richer set of types.'
 *
 *
 * I used <a href="http://clojure.org/Reference">Clojure.org Reference</a> as
 * the basis for the reserved word list.
 *
 *
 * @author jwall@google.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // clojure has more paren types than minimal lisp.
         ['opn',             /^[\(\{\[]+/, null, '([{'],
         ['clo',             /^[\)\}\]]+/, null, ')]}'],
         // A line comment that starts with ;
         [PR['PR_COMMENT'],     /^#[^\r\n]*/, null, '#'],
         // Whitespace
         [PR['PR_PLAIN'],       /^[\t\n\r \x20]+/, null, '\t\n\r \x20'],
         // A double quoted, possibly multi-line, string.
         [PR['PR_STRING'],      /^(["'`]|["'`]{3})(?:[^\1\\]|\\[\s\S])*(?:\1|$)/, null, '"\'`']
        ],
        [
         // clojure has a much larger set of keywords
         [PR['PR_KEYWORD'], /^(?:abstract|boolean|break|byte|ca(?:se|tch)|char|class|con(?:st|tinue)|de(?:bugger|fault|lete)|do(?:uble)?|else|enum|eval|ex(?:port|tends)|false|final(?:ly)?|float|for|function|goto|if|im(?:plements|port)|in(?:t(?:erface)|stanceof)?|[lgs]et|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throws?|transient|tr(?:ue|y)|(?:type)?of|(?:un)?defined|var|void|volatile|while|with|yield)\b/, null],
         [PR['PR_TYPE'], /^[a-z\$_][\w\$]*/i]
        ]),
    ['paramour']);
