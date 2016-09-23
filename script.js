// Paramour 12.7.8 "Bond" - Ephellon Dantzler 2016
// Unminified: //codepen.io/ephellon/pen/XKPVgw
/* Uglify Options: http://skalman.github.io/UglifyJS-online/
{
  parse: {
    strict: !true
  },
  compress: {
    sequences     : !true,
    properties    : true,
    dead_code     : true,
    drop_debugger : true,
    unsafe        : !true,
    unsafe_comps  : true,
    conditionals  : !true,
    comparisons   : true,
    evaluate      : true,
    booleans      : true,
    loops         : true,
    unused        : true,
    hoist_funs    : !true,
    hoist_vars    : !true,
    if_return     : true,
    join_vars     : true,
    cascade       : true,
    side_effects  : true,
    negate_iife   : true,
    screw_ie8     : !true,

    warnings      : true,
    global_defs   : {}
  },
  output: {
    indent_start  : 0,
    indent_level  : 4,
    quote_keys    : !true,
    space_colon   : true,
    ascii_only    : !true,
    inline_script : true,
    width         : 80,
    max_line_len  : 32000,
    beautify      : !true,
    source_map    : null,
    bracketize    : !true,
    semicolons    : true,
    comments      : /@license|@preserve|^!/,
    preserve_line : !true,
    screw_ie8     : !true
  }
}
*/
var window=void 0===window||null===window?{}:window,Paramour=window.Paramour=function(input,embed){Paramour.version="13.7.0";Paramour.versionName="Jasmine";var JavaScript_Manager=!1;if(void 0===Object.__defineGetter__||void 0===Object.__defineSetter__){JavaScript_Manager=!0;Object.prototype.__defineGetter__=function(e,r){if(void 0!==this[e])return this[e];this[e]=r;this[e].get=r};Object.prototype.__defineSetter__=function(e,r){if(void 0!==this[e])return this[e];this[e]=r;this[e].set=r}}var self,now,last,backup,tabs=!1;exps=[],errors=/(\s*var\s*;|[\b])/g,reserved=/\b(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with|yield|[gs]et|proto|defined|[\-\+\~\&]>)\b/,operators="!~*/%+-<>&^|?:=".split(""),oprs={"!":"Not_","~":"Tilde_","*":"Star_","/":"Slash_","%":"Cent_","+":"Plus_","-":"Minus_","<":"Less_Than_",">":"Greater_Than_","&":"And_","^":"Caret_","|":"Or_","?":"Question_Mark_",":":"Colon_","=":"Equals_"},MULTI_LINE=[],SINGLE_LINE=[],REGEXP=[],DOUBLE_QUOTE=[],SINGLE_QUOTE=[],QUASI=[],PAREN=[],BRACK=[],BRACE=[],TUPLE=[],EMUS=[],PHANTOMS=[],DOCSTRING=[],IGNORED=[],patterns={MULTI_LINE:/###([\s\S]*?)###/,DOCSTRING:/\/\*([\s\S]*?)\*\//,EMUS:/#\s*@([\d\.]+)/,PHANTOMS:/#\s*\$(.+)/,SINGLE_LINE:/#(.*)/,DOUBLE_QUOTE:/("[^"\n\r]*?")/,SINGLE_QUOTE:/('[^'\n\r]*?')/,REGEXP:/(\/.*?\/[imguy]*)/,QUASI:/(`[^`]*?`)/,PAREN:/(\([^\(\)]*?\))/,TUPLE:/\{\{\s*([^;]*?)\s*\}\}/,BRACK:/(\[[^\[\]]*?\])/,BRACE:/(\{[^\{\}]*?\})/};PHANTOMS.kids=[];switch(typeof input){case"string":break;case"object":if(void 0!=input.value)input=input.value;else if(void 0!==input.innerText)input=input.innerText;else if(void 0!==input.innerHTML)input=input.innerHTML;else if(input.constructor===Array)input=input.join("");break;default:try{input=input.toString()}catch(error){throw error}}backup=input="\b"+input.replace(/[\t\v]/g,function(e){if(void 0!==e)tabs=!0;return"  "});var clock={start:(new Date).getTime(),stop:null,span:null},runtime={is:function(e){switch(e+""){case"*":return runtime.is("1.8.5");case"1.8.5":if(void 0===Object.create||null===Object.create)return runtime.is("1.8.1");break;case"1.8.1":if(void 0===Object.getPrototypeOf||null===Object.getPrototypeOf)return runtime.is("1.8");break;case"1.8":if(void 0===Array.prototype.reduce||null===Array.prototype.reduce)return runtime.is("1.7");break;case"1.7":if(void 0!==Array.prototype.indexOf&&null!==Array.prototype.indexOf&&void 0===Array.prototype.reduce||null===Array.prototype.reduce)return runtime.is("1.6");break;case"1.6":if(void 0===Array.prototype.indexOf||null===Array.prototype.indexOf)return runtime.is("1.5");break;case"1.5":if(void 0===Number.prototype.toExponential||null===Number.prototype.toExponential)return runtime.is("1.4");break;case"1.4":if(void 0===Function.prototype.length||null===Function.prototype.length)return runtime.is("1.3");break;case"1.3":if(void 0===Function.prototype.apply||null===Function.prototype.apply)return runtime.is("1.2");break;case"1.2":if(void 0===Array.prototype.concat||null===Array.prototype.concat)return runtime.is("1.1");break;default:return"1.1"}return e},has:function(e){if(void 0!=Paramour.support)return Paramour.support.indexOf(e)>-1;var r=["1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.8.1","1.8.5"],t=0;return t=r.slice(0,r.indexOf(runtime.is("*"))+1),Paramour.runtime=t[t.length-1],(Paramour.support=t).indexOf(e)>-1},emulate:function(e){var r=["*","1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.8.1","1.8.5"];return Paramour.support=r.slice(0,(r.indexOf(e)||r.indexOf(runtime.is("*")))+1),Paramour.runtime=runtime.emu=Paramour.support[Paramour.support.length-1]+".*",Paramour.support},original:null,emu:null,manned:JavaScript_Manager,unmanned:!JavaScript_Manager};runtime.original=runtime.is("*");window.navigator=window.navigator||{};try{window.navigator.__defineGetter__("runtime",function(){return runtime});window.navigator.__defineGetter__("paramour",function(){return Paramour})}catch(e){throw"(Paramour "+Paramour.version+": [__defineGetter__, __defineSetter__] are undefined: due to the current <JavaScript Manager> in <Java>) "+e}Paramour.types=function(){for(var e=[].slice.call(arguments),r=0,t=[];r<e.length;r++)if(void 0!==e[r]&&void 0!==e[r].name&&e[r].constructor===Function)t.push(e[r].name);else if(void 0!==e[r]&&void 0!==e[r].constructor.name)t.push(e[r].constructor.name);else if(void 0!==e[r])t.push(typeof e[r]);else t.push("");return t.join(",")};Paramour.dockets={};Paramour.pull=function(e){return Paramour.dockets[e]};Paramour.push=function(e,r){for(var t=/(^\s*|,\s*)([a-z\$-][\w\$]*\.{0,3})\s*(,|$)/i;t.test(r);)r=r.replace(t,"$1* $2$3");e=e.name||e;Paramour.dockets[e]=void 0===Paramour.dockets[e]||void 0===Paramour.dockets[e].length||0===Paramour.dockets[e].length?[]:Paramour.dockets[e];return Paramour.dockets[e].push(r.replace(/(\*|\.{3}|[a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*\.{0,3})/gi,"$1").split(/,\s*/))};Paramour.docstrings=Paramour.docstrings||{};Paramour.__defineSetter__("DOCSTRING",function(a){for(var f=a[0],a=a[1],c=["window","Array","Boolean","Date","Error","Function","Map","Number","Object","Paramour","RegExp","String","Symbol"],h,d=0,e=(h=Paramour.docstrings)[c[d]],g=!1;d<c.length;e=h[c[d++]])if(g=void 0!==eval(c[d])[f])eval(c[d])[f].DOCSTRING=(void 0!==e?e:{})[f]=a;if(-1===(h[f]=void 0!==h[f]?h[f]:[]).indexOf(a))h[f].push(a)});Paramour.__defineGetter__("DOCSTRING",function(){return Paramour.docstrings});String.prototype.toDocument=function(f){return this.replace(/DOCSTRING\.(\d+)/,(eval("Paramour.DOCSTRING = ['"+(f=f||"anonymous")+"', '"+DOCSTRING[+RegExp.$1].replace(/\\/g,"\\\\").replace(/[\n\r]/g,"\\n").replace(/'/g,"\\'")+"'];"),"SINGLE_LINE."+(SINGLE_LINE.push(" Documented "+f)-1)))};var Tuple=window.Tuple=Paramour.Tuple=function(){var e={index:0,arguments:[]};Tuple.objects=Tuple.objects||[];for(var r=0,t=arguments;r<t.length;r++)e.arguments.push(t[r]);if(void 0!==Tuple.objects[e.arguments])return Tuple.objects[e.arguments].next();e.every=function(e){for(var r=0,t=this.arguments,n=!0;r<t.length&&n;r++)n=e.apply(null,t[r]);return n};e.forEach=function(e){for(var r,t=0,n=this.arguments;t<n.length;t++)r=e.apply(null,n[t]);return r};e.join=function(e){return this.arguments.join(e)};e.length=e.length||t.length;e.next=function(){return e.arguments[e.index++]};e.toString=function(){return this.arguments.toString()};Tuple.__defineGetter__("next",function(){return Tuple.apply(null,t)});return Tuple.objects[e.arguments]=e};Tuple.from=function(){for(var e,r=0,t=[];e=arguments[r++];)for(var n in e)if(e.hasOwnProperty(n))t.push(e[n]);return Tuple.apply(null,t)};for(var Operator=window.Operator=Paramour.Operator=function(e,r,t,n,a){Operator.__defineGetter__("constructor",function(){return Operator});Operator.kids=Operator.kids||{};Operator.kids[e]={operator:e,"argument-types":r,fix:t,"function":n,brace:a}},x=/(\n\r\t)/;x.test(input);)input=input.replace(x,function(e){return"\\"+{"\n":"n","\r":"r","	":"t"}[e]});for(var pattern in patterns)exps.push(pattern);function argify(e,r){r=(r||[]).join(",").replace(/\s/g,"").split(",");if("string"==typeof e)e=e.split(",");for(var t,n,a,i,o,s=0,u=[];s<e.length;s++){t=!(e.length>s+1);a="Spread"===r[s];i=r.indexOf("Spread");n=r.lastIndexOf("Spread");o=n==s;n=n==i;i=i>-1&&s>i;u.push(e[s].replace(/\bthis\b/,"$"+(s+1)).replace(/^\s*([a-z\$_][\w\$]*)\s*\=\s*(.*)$/i,(a?n?"$1 = [].slice.call(arguments).slice("+(t?"":"arity = ")+s+(t?"":" - "+(e.length-(s+1)))+", arguments.length)":i?t?"$1 = [].slice.call(arguments).slice(++arity, arguments.length)":"$1 = arguments[++arity]":"$1 = arguments[arity = "+s+"]":"$1 = arguments["+(i?"++arity":s)+"]")+" || $2").replace(/^\s*([a-z\$_][\w\$]*)\s*$/i,a?n?"$1 = [].slice.call(arguments).slice("+(t?"":"arity = ")+s+", arguments.length)":i?t?"$1 = [].slice.call(arguments).slice(++arity, arguments.length)":o?"$1 = [].slice.call(arguments).slice(++arity, arguments.length - "+(e.length-(s+1))+")":"$1 = arguments[++arity]":"$1 = arguments[arity = "+s+"]":"$1 = arguments["+(i?"++arity":s)+"]").replace(/,/g,"\b0x2c\b").replace(/\$/g,"\b$\b"))}return u.join(",$1    ")}function ignore(e){return"\bIGNORED."+(IGNORED.push(e)-1)+"\b"}function unhandle(string,type){if(void 0===type)type=exps;else if("string"==typeof type)type=type.split(/\s|,/);for(var pattern in patterns)if(RegExp(type.join("|")).test(pattern))for(var l,k=patterns[pattern];k.constructor===RegExp&&k.test(string);){l=eval("(window."+pattern+" = "+pattern+")").push(RegExp.$1)-1;string=string.replace(k,pattern+"."+l)}return string}input=unhandle(input);for(var x=/\\([^\d])/;x.test(input);)input=input.replace(x,function(e,r){return"\b0x"+r.charCodeAt(0).toString(16)+"\b"});for(var x=/([\$\\])(\d+)/;x.test(input);)input=input.replace(x,function(e,r,t){return"\b"+r+"\b\b"+t+"\b"});for(var x=0;x<EMUS.length;x++)runtime.emulate(EMUS[x]);function handle(type,index){var spil=(eval(type)[index]||"").replace(/\$/g,"\b$\b");switch(type){case"IGNORED":return spil;case"MULTI_LINE":return"/*"+spil.replace(/(\s+)/g,"$1\b")+"*/";case"DOCSTRING":return"'"+spil.replace(/\n/g,"\\n")+"'";case"EMUS":return('\b/\b/\b JavaScript Emulation from "'+runtime.original+'" to "'+spil+'"').replace(/(\s+)/g,"$1\b");case"PHANTOMS":var r=/\->/,s=/\=>/,o={},R=spil.replace(/[\b]/g,"").split(/\s*\->\s*/),S=spil.replace(/[\b]/g,"").split(/\s*\=>\s*/);if(r.test(spil))PHANTOMS.kids.push((o[R[0]]=R[1],o));else if(s.test(spil))PHANTOMS.kids.push((o[S[0]]=eval(S[1]),o));return"\b/\b/\b "+spil.replace(/(\s+)/g,"$1\b");case"SINGLE_LINE":return"\b/\b/\b"+spil.replace(/(\s+)/g,"$1\b");case"QUASI":if(runtime.has("1.6"))return spil;spil=unhandle(spil.replace(/^`|`$/g,""));for(var k=/[\b]\$[\b](BRACE\.\d+)/;k.test(spil);)spil=spil.replace(k,"' + ("+decompile(RegExp.$1).replace(/^\{|\}$/g,"")+") + '");return"'"+spil.replace(/[\n\r]/g,"").replace(/(DOUBLE_QUOTE\.\d+)/g,"\"' +$1+ '\"").replace(/^''\s*\+|\+\s*''$/g,"").replace(/\b0x(.+?)\b/g,"\b\\0x$1\b").replace(/'/g,"\\'")+"'";case"TUPLE":return"Tuple("+spil+")";case"REGEXP":return spil.replace(/\b0x(.+?)\b/g,"\b\\0x$1\b").replace(/^\/\/([imguy]*)$/,"/(?:)/$1");case"SINGLE_QUOTE":spil=unhandle(spil.replace(/^'|'$/g,""));for(var k=/[\b]\$[\b](BRACE\.\d+)/;k.test(spil);)spil=spil.replace(k,"' + ("+decompile(RegExp.$1).replace(/^\{|\}$/g,"")+") + '");return"'"+spil.replace(/(DOUBLE_QUOTE\.\d+)/g,"\"' +$1+ '\"").replace(/^''\s*\+|\+\s*''$/g,"").replace(/\b0x(.+?)\b/g,"\b\\0x$1\b")+"'";case"DOUBLE_QUOTE":spil=unhandle(spil.replace(/^"|"$/g,""));for(var k=/[\b]\$[\b](BRACE\.\d+)/;k.test(spil);)spil=spil.replace(k,'" + ('+decompile(RegExp.$1).replace(/^\{|\}$/g,"")+') + "');return'"'+spil.replace(/^""\s*\+|\+\s*""$/g,"").replace(/\b0x(.+?)\b/g,"\b\\0x$1\b")+'"';default:return compile(spil)}return input}function decompile(e,r,t){var n=1/0;if("number"==typeof t)n=t;r=void 0===r||t===!0?exps:r.constructor===Array?r:[r];for(var a=RegExp("("+r.join("|")+")\\.(\\d+)");a.test(e)&&n>0;--n)e=e.replace(a,handle(RegExp.$1,+RegExp.$2));return e}function strip(e){return(e||"").replace(/^\(|\)/g,"")}function hand(e,r){var t,n=["","Double_","Triple_","Quadruple_"],a=oprs,i="!~*/%+-<>&^|?:=".split("").join("\\"),o=e,s=function(e,r){if(+e+""!="NaN"&&void 0!==r)return n[e]+r;else if(/^([\!~\*\/%\+\-<>\&\^\|\?\:\=])\1*$/.test(e)&&void 0!==r)return n[e.length-1]+r;else{e=((e||"")+"").replace(/\\/g,"").split("");for(var t=0,i={};t<e.length;t++){i[e[t]]=void 0===i[e[t]]?0:i[e[t]];if(e[t]===e[t+1])i[e[t]]++}var o=[],u=0;for(var p in i){if(u++>3)break;o.push(s(i[p],a[p]))}return o.join("")}};for(var u in a)if(RegExp("^([\\"+u+"][\\"+i+"]{0,3})").test(e)&&"prefix-"===r)e=e.replace(RegExp("^\\"+(t=RegExp.$1.split("").join("\\"))+"(.*)$"),s(t,a[u])+"Prefix_Operator($1)");else if(RegExp("([\\"+u+"][\\"+i+"]{0,3})$").test(e)&&"suffix-"===r)e=e.replace(RegExp("^(.*)\\"+(t=RegExp.$1.split("").join("\\"))+"$"),s(t,a[u])+"Suffix_Operator($1)");else if(RegExp("^(.*?)([\\"+u+"][\\"+i+"]{0,3})(.*?)$").test(e))e=e.replace(RegExp("^(.*)\\"+(t=RegExp.$2.split("").join("\\"))+"(.*)$"),s(t,a[u])+"Operator("+(void 0!==RegExp.$1?"$1,":"")+"$2)");if(o===e&&void 0!==r){var p=RegExp("^(.*)[\\"+i+"]+(.*)$");p.test(e);e=e.replace(p,s(e)+"Operator("+(void 0!==RegExp.$1?"$1,":"")+"$2)")}if(void 0!==r&&/(prefix|suffix|media)-/.test(r)){r.replace(/^(\w)/,"");r=r.replace(RegExp.$1,RegExp.$1.toUpperCase()).replace(/-$/,"_");e=e.replace(r,"Media_"!=r?r:"")}return e.replace(/[\!~\*\/%\+\-<>\&\^\|\?\:\=]+/g,"")}function compile(input,args){var patterns={"class#(\\j)\\s*(BRACE)\\.(\\d+)":function(e,a,b,c){return"function \b"+a+"()\b "+eval(b)[+c].replace(/<init>\s*(PAREN\.\d+)?\s*(BRACE\.\d+)/,function(e,r,t){return"constructor#"+a+" ["+(r||"")+"] [true] "+t}).replace(/\.?([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/gi,"prototype#"+a+":$1 [$2] $3").replace(/(\s*)\}$/,"\n  "+a+".this <get constructor> BRACE."+(BRACE.push("{\n    -> "+a+";\n  }")-1)+"\n  "+a+".this <set constructor> BRACE."+(BRACE.push("{\n    -> "+a+", constructor;\n  }")-1)+"\n  -> "+a+".this;\n}")},"extends#(\\j)\\:(\\j)\\s*(BRACE)\\.(\\d+)":function(e,a,b,c,d){return"function \b"+b+"()\b "+eval(c)[+d].replace(/<init>\s*(PAREN\.\d+)?\s*(BRACE\.\d+)/,function(e,r,t){return"constructor#"+b+" ["+(r||"")+"] [false] "+t}).replace(/\{(\s*)/,"{$1"+b+".super = "+a+";$1"+b+".this = "+a+".apply(null, arguments) || {};$1").replace(/\.?([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/gi,"prototype#"+b+":$1 [$2] $3").replace(/(\s*)\}$/,"\n  "+b+".this <get constructor> BRACE."+(BRACE.push("{\n    -> "+b+";\n  }")-1)+"\n  "+b+".this <set constructor> BRACE."+(BRACE.push("{\n    -> "+b+", constructor;\n  }")-1)+"\n  -> "+b+".this;\n}")},"constructor#(\\j)\\s*\\[(PAREN\\.\\d+)?\\]\\s*\\[(true|false)\\]\\s*(BRACE\\.\\d+)":function(e,a,b,c,d){b=void 0!==b?strip(decompile(b,"PAREN")):"";return(eval(c)?a+".this = {};\n  ":"")+a+".this.constructor = function() "+decompile(d,"BRACE").replace(/\{(\s*)/,""===b?"{$1":"{$1var "+argify(strip(decompile(b,"PAREN")))+";$1").replace(/\b(@|this|super)\b/g,a+".$1")+";\n  "+a+".this.constructor.apply(null, arguments);"},"prototype#(\\j)\\:(\\j)\\s*\\[(.*)\\]\\s*(BRACE\\.\\d+)":function(e,r,t,n,a){n=strip(decompile(n,"PAREN"));return r+".this."+t+" = function() "+decompile(a,"BRACE").replace(/\{(\s*)/,"{$1var "+argify(strip(decompile(n,"PAREN")))+";$1")},"arrow#\\[(.*)\\]\\s*\\[(.*)\\]\\s*(BRACE\\.\\d+|PAREN\\.\\d+|.+)":function(e,r,t,n){if(/^PAREN\.\d+/.test(n))return r+"function() { return "+strip(decompile(n,"PAREN"))+"}";else if(/^BRACE\.\d+/.test(n))return r+"function() "+decompile(n,"BRACE").replace(/\{(\s*)/,"{$1var "+argify(strip(decompile(t,"PAREN")))+";$1");else return r+"function() { var "+argify(strip(decompile(t,"PAREN")))+"; return "+decompile(n)+"}"},"\\b(do|else|finally|return|try|typeof|while)\\s*(BRACE\\.\\d+)":function(e,r,t){return"\b"+r+"\b \b"+t+"\b"},"\\b(catch|for|function|if|switch|while|with|\\.\\j)\\s*(PAREN\\.\\d+)":function(e,r,t){return"\b"+r+"\b"+t+"\b"},"(\\s*)case\\s*(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)":function(e,r,t,n){var a=[r||""];t=strip(decompile(t,"PAREN")).split(/,|\s+/);for(var i=0;i<t.length;i++)if(!/^\s*$/.test(t[i]))a.push(r+"case "+t[i]+":");return a.join("")+decompile(n,"BRACE").replace(/^\{/,"").replace(/\}$/,r+"  break;")},"(\\s*)default\\s*(PAREN\\.\\d+)?\\s*(BRACE\\.\\d+)":function(e,r,t,n){var a=[r||""];t=strip(decompile(t,"PAREN")).split(/,|\s+/);for(var i=0;i<t.length;i++)if(!/^\s*$/.test(t[i]))a.push(r+"case "+t[i]+":");a.push(r+"default:");return a.join("")+decompile(n,"BRACE").replace(/^\{/,"").replace(/\}$/,r+"  break;")},"<init>\\s*(BRACE\\.\\d+)":function(e,r){return runtime.has("1.6")?"constructor\b()\b "+decompile(r,"BRACE"):"constructor = function() "+decompile(r,"BRACE")},"<init>\\s*(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)":function(e,r,t){r=strip(decompile(r,"PAREN"));return runtime.has("1.6")?"constructor\b()\b "+decompile(t,"BRACE").replace(/\{(\s*)/,"{$1var "+argify(strip(decompile(r,"PAREN")))+";$1"):"constructor = function() "+decompile(t,"BRACE").replace(/\{(\s*)/,"{$1var "+argify(strip(decompile(r,"PAREN")))+";$1")},"\\.?(\\*?\\j\\s*[\\:\\=]?\\s*)?(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)":function(e,r,t,n){r=r||"";if(/^\./.test(e))return"\b"+r+"\b"+t+"\b "+n+"\b";var a,i,o,s,u=/(\*\s*|\.{3}\s*|[a-z\$_][\w\$]*\s+)([@a-z\$_][\w\$]*)/gi,p=/([@a-z\$_][\w\$]*)(\*|\.{3})/gi;t=strip(decompile(t,"PAREN")).replace(/[\b]/g,"").replace(/^(.*)\(/,"$1 ").replace(/\)(.*)$/," $1");if(u.test(t)||p.test(t)||void 0!==Paramour.dockets[r]){t=t.replace(p,"$2 $1").replace(u,"$1 $2");s=/\.{3}/.test(t);o=Paramour.push(r,t)-1;a=Paramour.pull(r)[o].join("_").replace(/\s+/g,"").replace(/\*/g,"Any").replace(/\.{3}/g,"Spread");i=Paramour.pull(r)[o].join(",").replace(/\s+/g,"").replace(/\*/g,"Any").replace(/\.{3}/g,"Spread").split(",");return"function "+r+"__"+a.replace(/([a-z\$_][\w\$]*).*$/i,"$1")+"() "+decompile(n,"BRACE").replace(/\{(\s*)/,/^\s*$/.test(t)?"{$1":"{$1"+(s?"var arity;$1":"")+"var "+argify(t.replace(p,"$1").replace(u,"$2"),i)+";$1")}return/[\:\=]/.test(r)?r+"function() "+decompile(n,"BRACE").replace(/\{(\s*)/,""==t?"{$1":"{$1var "+argify(strip(decompile(t,"PAREN")))+";$1"):"function "+r+"() "+decompile(n,"BRACE").replace(/\{(\s*)/,""==t?"{$1":"{$1var "+argify(strip(decompile(t,"PAREN"))))+";$1"},"(\\j)\\.(\\j)\\s*(BRACE\\.\\d+)":function(e,r,t,n){if(runtime.has("1.6")){n=unhandle(decompile(n,"BRACE").replace(/^\{|\}$/g,""))||"";for(var a=/(function\s+)?([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/i;a.test(n);)n=n.replace(a,function(e,r,t,n,a){return"\b"+t+"\b"+n+" \b"+a+"\b"});return"class "+t+" extends "+r+" {"+decompile(n,"BRACE").replace(/(function\s+)?([a-zA-Z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/g,"\b$2\b$3\b $4")+"}"}return compile("extends#"+r+":"+t+" "+n)},"(\\j)\\s*(BRACE\\.\\d+)":function(e,r,t){if(runtime.has("1.6")){t=unhandle(decompile(t,"BRACE").replace(/^\{|\}$/g,""))||"";for(var n=/(function\s+)?([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/i;n.test(t);)t=t.replace(n,function(e,r,t,n,a){return"\b"+t+"\b"+n+" \b"+a+"\b"});return"class "+r+" {"+decompile(t,"BRACE").replace(/(function\s+)?([a-zA-Z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/g,"\b$2\b$3\b $4")+"}"}return compile("class#"+r+" "+t,[r])},"*(\\j)\\s*<proto\\s+(\\j)>\\s*(BRACE\\.\\d+)":function(e,r,t,n){return r+".prototype."+t+" = function() "+n},"*(\\j)\\s*<get\\s+(\\j)>\\s*(BRACE\\.\\d+)":function(e,r,t,n){return r+'.__defineGetter__("'+t+'", function() '+n+")"},"*(\\j)\\s*<get\\?\\s*(\\j)>":function(e,r,t){return r+'.__lookupGetter__("'+t+'")'},"*(\\j)\\s*<set\\s+(\\j)>\\s*(BRACE\\.\\d+)":function(e,r,t,n){return r+'.__defineSetter__("'+t+'", function('+t+") "+n+")"},"*(\\j)\\s*<set\\?\\s*(\\j)>":function(e,r,t){return r+'.__lookupSetter__("'+t+'")'},"*<(prefix-|suffix-|media-)?operator\\s+([\\!~\\*\\/%\\+\\-<>\\&\\^\\|\\?\\:\\=]{1,4}|\\j)\\s*(BRACK\\.\\d+)?>\\s*(BRACE\\.\\d+)":function(e,r,t,n,a){r=r||"media-";n=decompile(n,"BRACK");var i=/[a-z\$_][\w\$]*/i.test(t),o="";switch(r){case"prefix-":n=n||"Any";o="Prefix_";break;case"media-":n=n||"Any, Any";break;case"suffix-":n=n||"Any";o="Suffix_"}var s=[],u="",p=[];n=n.replace(/^\[\s*|\s*\]$/g,"").split(/;/);s.push(hand(t,r).replace(/\(\)$/,""));if(n.length>1)for(var l=0;l<n.length;l++)p.push(n[l].split(/,\s*/));else p.push(n[0].split(/,\s*/));for(var l=0;l<p.length;l++){for(var c=0;c<p[l].length;c++)p[l][c]=p[l][c].replace(/^\s*(\*|\.{3}|[a-z\$\_][\w\$]*)/i,"$1 \b$\b"+(c+1)+"\b");p[l]=p[l].join(", ")}u=s.join("").replace(/^.*?([a-z\$_][\w\$]*).*?$/i,"$1")+"PAREN."+(PAREN.push("("+p.join(", ")+")")-1)+" "+a;Operator(t,n,r,decompile(u),i);return compile(u)},"\\->":function(){return"return"},"\\~>":function(){return"throw"},"\\+>":function(){return"throw new"},"\\&>":function(){return"yield"},"\\b(un)?defined\\s+(\\j)":function(e,r,t){return"un"==r?"("+t+" === undefined || "+t+" === null)":"("+t+" !== undefined && "+t+" !== null)"},"(\\j\\s*[\\:\\=]\\s*)?(PAREN\\.\\d+)\\s*\\=>\\s*(BRACE\\.\\d+|PAREN\\.\\d+|.+)":function(e,r,t,n){r=r||"";return runtime.has("1.6")?r+"("+strip(decompile(t,"PAREN"))+") => "+n:compile("arrow#["+r+"] ["+t+"] "+n)},"(\\j)?\\s*\\=>\\s*([\\!~\\*\\/%\\+\\-<>\\&\\^\\|\\?\\:\\=]+)?\\s*(PAREN\\.\\d+)\\s*([\\!~\\*\\/%\\+\\-<>\\&\\^\\|\\?\\:\\=]+)?":function(e,r,t,n,a){var i=[];r=r||"";for(var o,s=/^(.*)(PAREN\.\d+|[\!~\*\/%\+\-<>\&\^\|\?\:\=]+)(.*)$/;s.test(n);)o=n.replace(s,function(e,r,t,a){n=unhandle(decompile(t,"PAREN").replace(/^\(|\)$/g,""),"PAREN");n.replace(/([\!~\*\/%\+\-<>\&\^\|\?\:\=]+)/);var o,s=RegExp.$1;if(void 0!==Operator.kids&&void 0!==(o=Operator.kids[s]))i.push(n=r+hand(n,o.fix)+a);else{for(var u=RegExp("(\\"+s[0]+")");u.test(n);)n=n.replace(u,"\b0x"+RegExp.$1.charCodeAt(0).toString(16)+"\b");i.push(n=r+n+a)}return n});o=i.reverse()[0].replace(/\s*(\(|\))\s*/g,"$1").replace(/\s+/g," ");for(var s=/\b([a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*)\b/i;s.test(o);)o=o.replace(s,function(e,r,t,n){var a,i,o,s="prefix-",u="media-",p="suffix-";r=r.replace(/[\b]/g,"");t=t.replace(/[\b]/g,"");n=n.replace(/[\b]/g,"");if(void 0!==(a=Operator.kids[r])||void 0!==(i=Operator.kids[t])||void 0!==(o=Operator.kids[n]))if((a||{}).fix==p||(o||{}).fix==s)return r+"("+t+", "+n+")";else if((a||{}).fix==s||(o||{}).fix==p)return n+"("+r+", "+t+")";else if((i||{}).fix==u)return t+"("+r+", "+n+")";else return r+"\b"+t+"\b"+n});for(s=/\b([a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*)\b/i;s.test(o);)o=o.replace(s,function(e,r,t){var n,a,i="prefix-",o="suffix-";r=r.replace(/[\b]/g,"");t=t.replace(/[\b]/g,"");if(void 0!==(n=Operator.kids[r])||void 0!==(a=Operator.kids[t]))if((n||{}).fix==o||(a||{}).fix==i)return r+"("+t+")";else if((n||{}).fix==i||(a||{}).fix==o)return t+"("+r+")";else return reserved.test(r)?r+"\b"+t+"\b":reserved.test(t)?r+"("+t+")":r+"\b"+t+"\b"});return(""==r?"":reserved.test(r)?r+" ":r+" = ")+hand((t||"")+o+(a||"")).replace(/\)\s*,\s*\)/g,"))")},"(\\j\\#?)(\\s+)(\\j)(\\s+)(\\j\\#?)":function(e,r,t,n,a,i,o,s){var u,p,l,c="prefix-",f="suffix-",d="media-";t=t||"";s=s||"";if(void 0!==Operator.kids)if(void 0!==(u=Operator.kids[r])||void 0!==(p=Operator.kids[a])||void 0!==(l=Operator.kids[o]))if((u=u||{}).fix==f||u.fix==c)return a+i+"\b"+r+t+"("+o+s+")";else if((l=l||{}).fix==c||l.fix==f)return r+t+n+"\b"+o+s+"("+a+")";else if((p||{}).fix==d)return a+"("+r+t+", "+o+s+")";if(reserved.test(r)||reserved.test(o))return ignore(decompile(e));else return decompile(r).replace(t,"")+"("+a+" "+i+compile(decompile(o).replace(s,""))+")"},"(\\j\\#?)(\\s+)(\\j\\#?)":function(e,r,t,n,a,i){var o,s,u="prefix-",p="suffix-";t=t||"";i=i||"";if(void 0!==Operator.kids)if(void 0!==(o=Operator.kids[r])||void 0!==(s=Operator.kids[a]))if((o=o||{}).fix==p||o.fix==u)return r+t+"("+a+")";else if((s=s||{}).fix==u||s.fix==p)return a+i+"("+r+")";if(reserved.test(r)||reserved.test(t))return ignore(decompile(e));else return decompile(r).replace(t,"")+"("+compile(decompile(a).replace(i,""))+")"},"var\\s*(PAREN\\.\\d+)([\\x20\\t]*[\\:\\=][\\x20\\t]*.+)?":function(e,r,t){var n;t=t||"";t=t.replace(/;$/,"").replace(/^\s*([\:\=])\s*/,"");n=RegExp.$1;return(":"==n?"const ":"var ")+strip(decompile(r,"PAREN")).replace(/(^\s*|,\s*)([a-z\$_][\w\$]*)(\s*,|\s*$)/gi,""==t?"$1$2$3":"$1$2 = "+t+"$3").replace(/(^\s*|,\s*)([a-z\$_][\w\$]*)(\s*,|\s*$)/gi,""==t?"$1$2$3":"$1$2 = "+t+"$3")+";"},"@(\\j)\\#?":function(e,r,t){if(void 0!=t&&/^[A-Z_]+$/.test(r))return"this"+r+t;else if(void 0!=t)return"this."+r+t;else return"this."+r},"@":function(){return"this"},"(\\j)\\s*(PAREN\\.\\d+)":function(e,r,t){return r+decompile(t,"PAREN")},"(DOCSTRING\\.\\d+)(\\z*\\j)(\\z+\\j)":function(e,r,t,n){return r.toDocument(n.replace(/\s/g,"").replace(/'/g,"\\'"))+t+n},"(DOCSTRING\\.\\d+)(\\z*\\j)(\\s+\\j)?":function(e,r,t){return r.toDocument(t.replace(/\s/g,"").replace(/\\/g,"\\\\").replace(/'/g,"\\'"))+t}};for(var pattern in patterns){for(var reg=pattern.replace(/\\j/g,"[@a-zA-Z\\$_][\\w\\$]*").replace(/\\s/g,"[\\x20\\t\\v ]").replace(/\\z/g,"[\\x20\\t\\v\\n\\r ]").replace(/\\#/g,"(\\.\\d+)").replace(/^\*/,""),k=/\$\{([^\}]+?)\}/;k.test(reg);)reg=reg.replace(k,function(e,a){return eval(a)});for(reg=RegExp(reg),input=unhandle(input,"DOUBLE_QUOTE SINGLE_QUOTE REGEXP QUASI MULTI_LINE");reg.test(input)&&(self=patterns[pattern],self.name=pattern);)input=input.replace(reg,self);if(IGNORED.length>0)for(var x=0,y=/IGNORED\.(\d+)/;y.test(input);x++)input=input.replace(y,function(e,r){return IGNORED[+r]})}return input}window.IGNORED=IGNORED;input=compile(input);input=decompile(input,void 0,!0);for(var x=/[\b]0x([0-9a-f]{1,2})[\b]/;x.test(input);)input=input.replace(x,String.fromCharCode(eval("0x"+RegExp.$1)));for(var x=/[\b](.+)[\b]/;x.test(input);)input=input.replace(x,"$1");for(var x=0;x<PHANTOMS.kids.length;x++)for(var kid in PHANTOMS.kids[x])input=input.replace(RegExp("\\$"+kid+"\\b","g"),(PHANTOMS.kids[x][kid]+"").replace(/\$/g,"\b$\b"));for(var docket in Paramour.dockets){input+="\nfunction \\docket() {\n  var index, args = arguments, types = Paramour.types.apply(null, arguments).split(',');\n  switch(types.join('')) {\n";for(var x=0;x<Paramour.dockets[docket].length;x++){var k,g=function(e){var r=[];k=e.join("_").replace(/\s+/g,"").replace(/\*/g,"Any").replace(/\.{3}/g,"Spread");for(var t,n,a,i,o,s=0;s<e.length;s++){t=!(e.length>s+1);n="..."===e[s];a=e.indexOf("...");i=e.lastIndexOf("...");o=i==s;i=i==a;a=a>-1&&s>a;r.push(e[s].replace(/\*/,function(){return"' + types["+(a?"++index":s)+"] + '"}).replace(/\.{3}/,function(){return"' + "+(i?t?"types.slice("+s+", args.length)":"types.slice(index = "+s+", args.length"+(t?"":" - "+(e.length-(s+1)))+")":a?t?"types.slice(++index, args.length)":o?"types.slice(++index, args.length - "+(e.length-(s+1))+")":"types[++index]":"types[index = "+s+"]")+" + '"}))}return r}(Paramour.pull(docket)[x]);input+="    case ("+("'"+g+"'").replace(/^''\s*\+\s*|\s*\+\s*''$/g,"")+"):\n      return "+docket.replace(/\*/,"")+"__"+k+".apply(null, args);\n      break;\n"}input+="    default:\n      throw TypeError('"+docket+" (' + types + ') is undefined')\n      break;\n  }\n}\n";input=input.replace(/\\docket/,docket)}function t(n,b){for(var ms=1,sec=1e3,min=60,hr=60,dy=24,yr=365,yrs=1/0,m="",x=1,y="ms sec min hr dy yr yrs".split(" "),z;x<y.length&&n>=(z=eval(y.slice(0,x).join("*")));x++);for(y=y.slice(0,x),x=1;x<y.length;x++)n/=eval(y[x-1]);if(/\./.test(n+"")&&void 0!==y[1]){m=RegExp.$_.split(".");n=+m[0];m=eval("0."+m[1]+"*"+y.slice(0,--x).join("*"));m=" "+t(m)}else n=Math.round(n);m=(n+" "+y[x-1]+m).replace(/\s0\s\w+/g,"").replace(/\s(\d+)\s(\w+)\s\d+\s\2/g," $1 $2");if(b===!0)return m.replace(/\s?(\d+)\s(ms)/g,".$1").replace(/\s?(\d+)\s(sec|min)/g,":$1").replace(/\s?(\d+)\s(hr)/g,"$1").replace(/\s?(\d+)\s(dy)/g,"$1D ").replace(/\s?(\d+)\s(yr)/g,"$1Y ").replace(/([\:\.\s])\s?(\d)\b/g,"$10$2").replace(/^[0 \:\.\s]+/g,"");else return m}with(clock){stop=(new Date).getTime();span=stop-start;start=new Date(start);stop=new Date(stop);span=t(span,!0)}var j=input.split(/[\n\r]/).length,p=backup.split(/[\n\r]/).length,J=input.length,P=backup.length;function f(e){return Math.round(+e).toString().split("").reverse().join("").replace(/(\d{3})/g,"$1,").replace(/,$/,"").split("").reverse().join("")}function h(e,r,t){for(var n="YZEPTGMK\b".split(""),a=+e>0?1:-1,e=Math.abs(+e);e>=Math.pow(t=t===!0?1e3:1024,(r||0)+1)&&n.length>1;e/=t)n.pop();return(a*e+"").replace(/\.(\d{3}).*/,".$1")+n.reverse()[0]+(1e3===t?"":"b")}function c(e,r){return["1%","10%","20%","30%","40%","50%","60%","70%","80%","90%","99%"][Math.round(e/r>1?e/r/100:10*(e/r))]}function s(){for(var e,r,t=arguments,n=[],a=0;a<t.length;a++)n.push((e=(r=(t[a]+"").replace(/[\b]/g,"")).length)<=12?r+" ".repeat(12-e):r.slice(0,9)+"...");return n.join("| ").replace(/[\b]/g,"")}function w(e){return e?(r++,"Paramour"):"JavaScript"}var d,r=0;Paramour.report="\n/* Was Paramour Useful?\n\n "+(d=s("Category","Paramour","JavaScript","Difference","Winner","Ranking"))+"\n "+"-".repeat(d.length)+"\n "+s("Version",Paramour.version,Paramour.runtime+" - "+(Paramour.runtime===runtime.original?"RAW":"EMU"),"","",Paramour.versionName)+"\n "+s("Lines",f(p),f(j),d=j-p,w(d>0),"> "+c(p,j))+"\n "+s("Characters",f(P),f(J),d=J-P,w(d>0),"> "+c(P,J))+"\n "+s("Size x1024",h(P),h(J),h(d=J-P),w(d>0),"> "+c(P,J))+"\n "+s("Size x1000",h(P,0,!0),h(J,0,!0),h(d=J-P,0,!0),w(d>0),"> "+c(P,J))+"\n "+s("Benefits",r,4-r,Math.abs(r-(4-r)),w(r>1),"> "+c(r,5))+"\n "+s("Compile Time",clock.span)+"\n\nParamour was "+(c(4-(p/j+3*(P/J)),4)||"< 1%")+" useful\n*/";Number.prototype.toTime=function(e){return t(this,e)};Paramour.toTime=function(){return t.apply(null,arguments)};Paramour.DOCSTRING=["toTime","toTime(Number time, Boolean format)/Number time - the time (in milliseconds) to be converted/Boolean format - format the returned time or not [xxxxY xxxD HH:MM:SS.NN] if true/\\\\ example//toTime(1234)///\\\\ returns 1.234 sec".replace(/(\/+)/g,function(e){return"\n"+"  ".repeat(e.length)}).replace(/\\/g,"/")];Paramour.SI=function(){return h.apply(null,arguments)};Paramour.DOCSTRING=["SI","SI(Number number, Number leaps, Boolean mode)/Number number - the number to convert/Number leaps - the number of untis to suppress\\skip/Boolean mode - use 1024 (false) or 1000 (true) counting mode/\\\\ example//SI(1024)///\\\\ returns 1Kb//SI(2440)///\\\\ returns 2Kb//SI(2440, 1)///\\\\ returns 2440".replace(/(\/+)/g,function(e){return"\n"+"  ".repeat(e.length)}).replace(/\\/g,"/")];Array.prototype.toTable=function(){return s.apply(null,this)};String.prototype.toTable=function(e){return this.split(e||"|").toTable()};Paramour.toTable=function(){return s.apply(null,arguments)};Paramour.DOCSTRING=["toTable","toTable(* content...)/* content - any value to be put into the table/\\\\ note - the content must be less than 12 characters in length/\\\\ example//.toTable('abc', 'def', 'abcdefghijklmnopqrstuvwxyz')///\\\\ returns 'abc         | def         | abcdefghi...'".replace(/(\/+)/g,function(e){return"\n"+"  ".repeat(e.length)}).replace(/\\/g,"/")];input=input.replace(/\.(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with|yield)\b/g,'["$1"]');input=input.replace(errors,"").replace(/[\t\v]/g,"");if(tabs)input=input.replace(/[\x20 ]{2}/g,"	");else input=input.replace(/[\t\v]/g,"");input+=embed?"":Paramour.report;var p={get:{form:{data:function(){var e=window.location.search+"";if(!/\?/.test(e))return{};e=e.replace("?","").replace(/\\/g,"\\\\\\").replace(/(["'])/g,"\\$1");if(""===e)return!1;e='{"'+(encodeURI(e).split("&").join('","')||"=").replace(/=/g,'":"').replace(/,\n+/g,",")+'"}';return JSON.parse(decodeURI(e))}}},storage:{set:function(){if(void 0!==Storage)for(var e=0,r=arguments;e<r.length;e++)localStorage.setItem(r[e],r[++e]);else return!1;return!0},check:function(e){return void 0!==paramour.storage.get(e)},get:function(e){return localStorage.getItem(e)},"delete":function(e){localStorage.setItem(e,void 0);return!paramour.storage.check(e)}},attr:function(e,r,t){if(void 0!==e)if(void 0!==t)return e.getAttribute(r);else return"!"===t?e.setAttribute(r,t):e.getAttribute(r)},id:function(e,r,t){if(e!==undfined&&"!"!==e){var n=document.querySelector("#"+e.replace(/\s^|\s$/g,""));if(void 0!==t)return paramour.attr(n,r,t);if(void 0!==r)if("$html"===r)n.innerHTML=r;else return n.innerHTML;return n}},"class":function(e,r,t,n){if(e!==undfined&&"!"!==e){var n=document.querySelectorAll("."+e.replace(/\s^|\s$/g,""));if(void 0!==t)return paramour.attr(n,r,t);
if(void 0!==r)if("$html"===r)n.innerHTML=r;else return n.innerHTML;return n}},tag:function(e,r,t,n){return paramour.ele(e,r,t,n)},ele:function(e,r,t,n){if(e!==undfined&&"!"!==e){var n=document.querySelectorAll(e.replace(/\s^|\s$/g,""));if(void 0!==t)return paramour.attr(n,r,t);if(void 0!==r)if("$html"===r)n.innerHTML=r;else return n.innerHTML;return n}},save:function(e,r){e=r?encodeURI(e):e;var t=window.location.pathname+"";r=r||t.substring(t.lastIndexOf("/")+1,t.length)+".cache";return paramour.storage.set(r,e)},load:function(e,r){e=r?encodeURI(e):e;var t=window.location.pathname+"";e=e||t.substring(t.lastIndexOf("/")+1,t.length)+".cache";return paramour.storage.get(e)},"delete":function(e,r){e=r?encodeURI(e):e;var t=window.location.pathname+"";e=e||t.substring(t.lastIndexOf("/")+1,t.length)+".cache";return paramour.storage["delete"](e)},"typeof":function(e){if(arguments.length>1)return paramour.typeOf.apply(null,arguments);var r="";switch(typeof e){case typeof Boolean():r="";break;case typeof Function():r="";break;case typeof Number():r="";break;case typeof Object():switch(e.constructor){case RegExp:r="";break;case Array:r="[]";break;default:r="{}"}break;case typeof String():r='""';break;case typeof Symbol():r=["(@@",")"];e=e.toString();break;case"undefined":r="";break;default:r=""}return(r[0]||"")+e+(r[1]||"")},typeOf:function(){for(var e=[],r=0,t=arguments;r<t.length&&void 0!==t[r]&&null!==t[r];r++)e.push(t[r].__proto__.constructor.name||t[r].constructor.name);return(e+"").replace(/\*/g,"ANY").toUpperCase()},random:function(){return Boolean(Math.round(Math.random()))}};for(var o in p)Paramour[o]=p[o];return input};