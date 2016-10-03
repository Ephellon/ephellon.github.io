// Paramour 15.0.5 "Krogstad" - Ephellon Dantzler 2016
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
var window=void 0===window||null===window?{}:window,Paramour=window.Paramour=function(input,embed){Paramour.version="15.0.5";Paramour.versionName="Krogstad";var JavaScript_Manager=!1;if(void 0===Object.__defineGetter__||void 0===Object.__defineSetter__){JavaScript_Manager=!0;Object.prototype.__defineGetter__=function(e,r){if(void 0!==this[e])return this[e];this[e]=r;this[e].get=r};Object.prototype.__defineSetter__=function(e,r){if(void 0!==this[e])return this[e];this[e]=r;this[e].set=r}}var self,now,last,backup,tabs=!1;exps=[],errors=/(\s*var\s*;|[\b])/g,reserved=/\b(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with|yield|[gs]et|proto|defined|[\-\+\~\&]>)\b/,operators="!~*/%+-<>&^|?:=".split(""),oprs={"!":"Not_","~":"Tilde_","*":"Star_","/":"Slash_","%":"Cent_","+":"Plus_","-":"Minus_","<":"Less_Than_",">":"Greater_Than_","&":"And_","^":"Caret_","|":"Or_","?":"Question_Mark_",":":"Colon_","=":"Equals_"},MULTI_LINE=[],SINGLE_LINE=[],REGEXP=[],DOUBLE_QUOTE=[],SINGLE_QUOTE=[],QUASI=[],PAREN=[],BRACK=[],BRACE=[],TUPLE=[],EMUS=[],PHANTOMS=[],DOCSTRING=[],IGNORED=[],patterns={MULTI_LINE:/###([\s\S]*?)###/,DOCSTRING:/\/\*([\s\S]*?)\*\//,EMUS:/#\s*@([\d\.]+)/,PHANTOMS:/#\s*\$(.+)/,SINGLE_LINE:/#(.*)/,DOUBLE_QUOTE:/("[^"\n\r]*?")/,SINGLE_QUOTE:/('[^'\n\r]*?')/,REGEXP:/(\/.*?\/[imguy]*)/,QUASI:/(`[^`]*?`)/,TUPLE:/\{\{\s*([^\{\}]*?)\s*\}\}/,BRACK:/(\[[^\[\]]*?\])/,PAREN:/(\([^\(\)]*?\))/,BRACE:/(\{[^\{\}]*?\})/};PHANTOMS.kids=[];switch(typeof input){case"string":break;case"object":if(void 0!=input.value)input=input.value;else if(void 0!==input.innerText)input=input.innerText;else if(void 0!==input.innerHTML)input=input.innerHTML;else if(input.constructor===Array)input=input.join("");break;default:try{input=input.toString()}catch(error){throw error}}backup=input="\b"+input.replace(/[\t\v]/g,function(e){if(void 0!==e)tabs=!0;return"  "});var clock={start:(new Date).getTime(),stop:null,span:null},runtime={is:function(e){switch(e+""){case"*":return runtime.is("1.8.5");case"1.8.5":if(void 0===Object.create||null===Object.create)return runtime.is("1.8.1");break;case"1.8.1":if(void 0===Object.getPrototypeOf||null===Object.getPrototypeOf)return runtime.is("1.8");break;case"1.8":if(void 0===Array.prototype.reduce||null===Array.prototype.reduce)return runtime.is("1.7");break;case"1.7":if(void 0!==Array.prototype.indexOf&&null!==Array.prototype.indexOf&&(void 0===Array.prototype.reduce||null===Array.prototype.reduce))return runtime.is("1.6");break;case"1.6":if(void 0===Array.prototype.indexOf||null===Array.prototype.indexOf)return runtime.is("1.5");break;case"1.5":if(void 0===Number.prototype.toExponential||null===Number.prototype.toExponential)return runtime.is("1.4");break;case"1.4":if(void 0===Function.prototype.length||null===Function.prototype.length)return runtime.is("1.3");break;case"1.3":if(void 0===Function.prototype.apply||null===Function.prototype.apply)return runtime.is("1.2");break;case"1.2":if(void 0===Array.prototype.concat||null===Array.prototype.concat)return runtime.is("1.1");break;default:return"1.1"}return e},has:function(e){if(void 0!==Paramour.support)return Paramour.support.indexOf(e)>-1;var r=["1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.8.1","1.8.5"],t=0;return t=r.slice(0,r.indexOf(runtime.is("*"))+1),Paramour.runtime=t[t.length-1],(Paramour.support=t).indexOf(e)>-1},emulate:function(e){var r=["*","1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.8.1","1.8.5"];return Paramour.support=r.slice(0,(r.indexOf(e)||r.indexOf(runtime.is("*")))+1),Paramour.runtime=runtime.emu=Paramour.support[Paramour.support.length-1]+".*",Paramour.support},original:null,emu:null,manned:JavaScript_Manager,unmanned:!JavaScript_Manager};runtime.original=runtime.is("*");window.navigator=window.navigator||{};try{window.navigator.__defineGetter__("runtime",function(){return runtime});window.navigator.__defineGetter__("paramour",function(){return Paramour})}catch(e){throw"(Paramour "+Paramour.version+": [__defineGetter__, __defineSetter__] are undefined: due to the current <JavaScript Manager> in <Java>) "+e}Paramour.types=function(){for(var e=[].slice.call(arguments),r=0,t=[];r<e.length;r++)if(void 0!==e[r]&&void 0!==e[r].name&&e[r].constructor===Function)t.push(e[r].name);else if(void 0!==e[r]&&void 0!==e[r].constructor.name)t.push(e[r].constructor.name);else if(void 0!==e[r])t.push(typeof e[r]);else t.push("");return t.join(",")};Paramour.dockets={};Paramour.pull=function(e){return Paramour.dockets[e]};Paramour.push=function(e,r){for(var t=/(^\s*|,\s*)([@\.a-z\$_][\w\$]*\.{0,3})\s*(,|$)/i;t.test(r);)r=r.replace(t,"$1* $2$3");e=e.name||e;Paramour.dockets[e]=void 0===Paramour.dockets[e]||void 0===Paramour.dockets[e].length||0===Paramour.dockets[e].length?[]:Paramour.dockets[e];return Paramour.dockets[e].push(r.replace(/(\*|\.{3}|[a-z\$_][\w\$]*)\s+([@\.a-z\$_][\w\$]*\.{0,3})/gi,"$1").split(/,\s*/))};Paramour.DOCSTRING=Paramour.DOCSTRING||{"@Stamps":void 0===Paramour["@Stamps"]?[clock]:Paramour["@Stamps"].concat(clock)};String.prototype.attachTo=function(f){var w,x,y,z;z=+this+""=="NaN"?this:DOCSTRING[+this];x=Paramour.DOCSTRING[f=void 0!==f?(w="function"==typeof f?f.name||"":f,f):w="Anonymous Expression"]=void 0===Paramour.DOCSTRING[w]?[]:Paramour.DOCSTRING[w];return y=x.push(("'"+w+"\\n'+\n'"+z.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/[\n\r]/g,"\\n'+\n'")+"'").replace(/\+\s*''/,"")),f.DOCSTRING=eval(x[y-1]),this};String.prototype.repeat=function(e){for(var r=[];e>0;--e)r.push(this);return r.join("")};var Tuple=window.Tuple=Paramour.Tuple=function(){function e(){var r=[].slice.call(arguments);e.last={index:this.index=this.index||0,arguments:this.arguments=this.arguments||r,length:this.length=this.length||r.length};e.objects=e.objects||[];if(void 0!==e.objects[r.join("+")])return this.arguments[self.index++];else e.objects[r.join("+")]=this}e.prototype.every=function(e){for(var r=0,t=this.arguments,n=!0;r<t.length&&n;r++)n=e.apply(null,t[r]);return n};e.prototype.forEach=function(e){for(var r,t=0,n=this.arguments;t<n.length;t++)r=e.apply(null,n[t]);return reponse};e.prototype.join=function(e){arguments[0];return this.arguments.join(e)};e.prototype.next=function(){return this.arguments[this.index++]};e.prototype.toString=function(){return this.arguments.toString()};e.__defineGetter__("next",function(){return this.arguments[this.index++]});return e}();Tuple.from=function(){for(var index=0,object,array=[];(object=arguments[index++])||index<arguments.length;)array.push("function"==typeof object?object.name||"function(){}":object===window?"window":object);return eval("new Tuple("+array+")")};for(var Operator=window.Operator=Paramour.Operator=function(e,r,t,n,a){Operator.__defineGetter__("constructor",function(){return Operator});Operator.kids=Operator.kids||{};Operator.kids[e]={operator:e,"argument-types":r,fix:t,"function":n,brace:a}},x=/(\n\r\t)/;x.test(input);)input=input.replace(x,function(e){return"\\"+{"\n":"n","\r":"r","	":"t"}[e]});for(var pattern in patterns)if(-1===exps.indexOf(pattern.replace(/-/g,"")))exps.push(pattern.replace(/-/g,""));function argify(e,r){r=(r||[]).join(",").replace(/\*/g,"Any").replace(/\.{3}/g,"Spread").replace(/\s/g,"").split(",");if("string"==typeof e)e=e.split(",");function t(r){return e.length-(r+1)>0?" - "+(e.length-(r+1)):""}for(var n,a,i,s,o,u=0,p=[];u<e.length;u++){n=!(e.length>u+1);i="Spread"===r[u];s=r.indexOf("Spread");a=r.lastIndexOf("Spread");o=a==u;a=a==s;s=s>-1&&u>s;p.push(e[u].replace(/[\b]\$[\b]/g,"$").replace(/\bthis\b/,"$"+(u+1)).replace(/^\s*([@a-z\$_][\w\$]*)\s*\=\s*(.*)$/i,(i?a?"$1 = [].slice.call(arguments).slice("+(n?"":"arity = ")+u+t(u)+", arguments.length"+t(u)+")":s?n?"$1 = [].slice.call(arguments).slice(++arity, arguments.length"+t(u)+")":"$1 = arguments[++arity]":"$1 = arguments[arity = "+u+"]":"$1 = arguments["+(s?"++arity":u)+"]")+" || $2").replace(/^\s*([@a-z\$_][\w\$]*)\s*$/i,i?a?"$1 = [].slice.call(arguments).slice("+(n?"":"arity = ")+u+", arguments.length"+t(u)+")":s?n?"$1 = [].slice.call(arguments).slice(++arity, arguments.length"+t(u)+")":o?"$1 = [].slice.call(arguments).slice(++arity, arguments.length"+t(u)+")":"$1 = arguments[++arity]":"$1 = arguments[arity = "+u+"]":"$1 = arguments["+(s?"++arity":u)+"]").replace(/^\s*\.([@a-z\$_][\w\$]*)\s*\=\s*(.*)$/i,(i?a?"$1 = (@$1 = [].slice.call(arguments).slice("+(n?"":"arity = ")+u+(n?"":" - "+(e.length-(u+1)))+", arguments.length"+t(u)+"))":s?n?"$1 = (@$1 = [].slice.call(arguments).slice(++arity, arguments.length"+t(u)+"))":"$1 = (@$1 = arguments[++arity])":"$1 = (@$1 = arguments[arity = "+u+"])":"$1 = (@$1 = arguments["+(s?"++arity":u)+"]")+" || $2)").replace(/^\s*\.([@a-z\$_][\w\$]*)\s*$/i,i?a?"$1 = (@$1 = [].slice.call(arguments).slice("+(n?"":"arity = ")+u+", arguments.length"+t(u)+"))":s?n?"$1 = (@$1 = [].slice.call(arguments).slice(++arity, arguments.length"+t(u)+"))":o?"$1 = (@$1 = [].slice.call(arguments).slice(++arity, arguments.length"+t(u)+"))":"$1 = (@$1 = arguments[++arity])":"$1 = (@$1 = arguments[arity = "+u+"])":"$1 = (@$1 = arguments["+(s?"++arity":u)+"])").replace(/\.slice\(0,\s+arguments\.length\)/g,"").replace(/@([a-z\$_][\w\$]*)/gi,"this.$1").replace(/@/g,"this").replace(/,/g,"\b0x2c\b").replace(/\$/g,"\b$\b"))}return p.join(",$1    ")}function ignore(e){return"\bIGNORED."+(IGNORED.push(e)-1)+"\b"}function unhandle(string,type){if(void 0===type)type=exps;else if("string"==typeof type)type=type.split(/\s|,/);for(var pattern in patterns)if(RegExp(type.join("|")).test(pattern))for(var l,p,k=patterns[pattern];k.constructor===RegExp&&k.test(string);){p=pattern.replace(/-/g,"");l=eval("(window."+p+" = "+p+")").push(RegExp.$1)-1;string=string.replace(k,p+"."+l)}return string}input=unhandle(input);for(var x=/\\([^\d])/;x.test(input);)input=input.replace(x,function(e,r){return"\b0x"+r.charCodeAt(0).toString(16)+"\b"});for(var x=/([\$\\])(\d+)/;x.test(input);)input=input.replace(x,function(e,r,t){return"\b"+r+"\b\b"+t+"\b"});for(var x=0;x<EMUS.length;x++)runtime.emulate(EMUS[x]);function randle(r,e){r=r.replace(/(\\.|[^\\]\[.*?[^\\]\]|[^\\]\(.*?[^\\]\))\+\+/g,"$1$1+").replace(/\\a/g,"[a-zA-Z]").replace(/\\A/g,"[^a-zA-Z]").replace(/\\j/g,e?"[@a-zA-Z\\$_][\\w\\$]*":"[a-zA-Z\\$_][\\w\\$]*").replace(/\\J/g,e?"[^@a-zA-Z\\$_][\\w\\$]*":"[^a-zA-Z\\$_][\\w\\$]*").replace(/\\k\\e/g,"[a-z\\u03b1-\\u03c9]").replace(/\\k\\E/g,"[^a-z\\u03b1-\\u03c9]").replace(/\\K\\e/g,"[A-Z\\u0391-\\u03a9]").replace(/\\K\\E/g,"[^A-Z\\u0391-\\u03a9]").replace(/\\e/g,"[A-Z\\u0391-\\u03a9a-z\\u03b1-\\u03c9]").replace(/\\E/g,"[^A-Z\\u0391-\\u03a9a-z\\u03b1-\\u03c9]").replace(/\\s/g,e?"[\\x20\\t\\v ]":"\\s").replace(/\\z/g,e?"[\\x20\\t\\v\\n\\r ]":"\\z").replace(/\\#/g,e?"(\\.\\d+)":"\\#");for(var k=/\\k(\[.*?\])/;k.test(r);)r=r.replace(k,function(e,r){return r.toLowerCase().replace(/(\w\-\w)\1/g,"$1")});for(var k=/\\K(\[.*?\])/;k.test(r);)r=r.replace(k,function(e,r){return r.toUpperCase().replace(/(\w\-\w)\1/g,"$1")});for(var k=/\$\{([^\}]+?)\}/;e&&k.test(r);)r=r.replace(k,function(e,a){return eval(a)});return r}function handle(type,index){var spil=(eval(type)[index]||"").replace(/([^\u0008])\$/g,"$1\b$\b");switch(type){case"DOCSTRING":return"DOCSTRING#"+index;case"IGNORED":return spil;case"MULTI_LINE":return"/*"+spil.replace(/(\s+)/g,"$1\b")+"*/";case"EMUS":return('\b/\b/\b JavaScript Emulation from "'+runtime.original+'" to "'+spil+'"').replace(/(\s+)/g,"$1\b");case"PHANTOMS":var r=/\->/,s=/\=>/,o={},R=spil.replace(/[\b]/g,"").split(/\s*\->\s*/),S=spil.replace(/[\b]/g,"").split(/\s*\=>\s*/);if(r.test(spil))PHANTOMS.kids.push((o[R[0]]=R[1],o));else if(s.test(spil))PHANTOMS.kids.push((o[S[0]]=eval(S[1]),o));return"\b/\b/\b "+spil.replace(/(\s+)/g,"$1\b");case"SINGLE_LINE":return"\b/\b/\b"+spil.replace(/(\s+)/g,"$1\b");case"QUASI":if(runtime.has("1.6"))return spil;spil=unhandle(decompile(spil.replace(/^`|`$/g,"")).replace(/[\b]\$[\b]/g,"$"),"BRACE");for(var k=/\$(BRACE\.\d+)/;k.test(spil);)spil=spil.replace(k,"' + ("+decompile(RegExp.$1).replace(/^\{|\}$/g,"")+") + '");return("'"+spil.replace(/[\n\r]/g,"").replace(/'/g,"\\'")+"'").replace(/(DOUBLE_QUOTE\.\d+)/g,"\"' +$1+ '\"").replace(/^''\s*\+|\+\s*''$/g,"").replace(/\b0x(.+?)\b/g,"\b\\0x$1\b").replace(/^\s*|\s*$/g,"").replace(/\$/g,"\b$\b");case"TUPLE":return"new Tuple("+spil+")";case"REGEXP":return randle(spil.replace(/\b0x(.+?)\b/g,"\b\\0x$1\b").replace(/^\/\/([imguy]*)$/,"/(?:)/$1"));case"SINGLE_QUOTE":spil=unhandle(decompile(spil.replace(/^'|'$/g,"")).replace(/[\b]\$[\b]/g,"$"),"BRACE");for(var k=/\$(BRACE\.\d+)/;k.test(spil);)spil=spil.replace(k,"' + ("+decompile(RegExp.$1).replace(/^\{|\}$/g,"")+") + '");return("'"+spil+"'").replace(/(DOUBLE_QUOTE\.\d+)/g,"\"' +$1+ '\"").replace(/^''\s*\+|\+\s*''$/g,"").replace(/\b0x(.+?)\b/g,"\b\\0x$1\b").replace(/^\s*|\s*$/g,"").replace(/\$/g,"\b$\b");case"DOUBLE_QUOTE":spil=unhandle(decompile(spil.replace(/^"|"$/g,"")).replace(/[\b]\$[\b]/g,"$"),"BRACE");for(var k=/\$(BRACE\.\d+)/;k.test(spil);)spil=spil.replace(k,'" + ('+decompile(RegExp.$1).replace(/^\{|\}$/g,"")+') + "');return('"'+spil+'"').replace(/^""\s*\+|\+\s*""$/g,"").replace(/\b0x(.+?)\b/g,"\b\\0x$1\b").replace(/^\s*|\s*$/g,"").replace(/\$/g,"\b$\b");default:return compile(spil)}return input}function decompile(e,r,t){var n=1/0;if("number"==typeof t)n=t;r=void 0===r||t===!0?exps:r.constructor===Array?r:[r];for(var a=RegExp("("+r.join("|")+")\\.(\\d+)");a.test(e)&&n>0;--n)e=e.replace(a,handle(RegExp.$1,+RegExp.$2));return e}function strip(e){return(e||"").replace(/^\(|\)/g,"")}function hand(e,r){var t,n=["","Double_","Triple_","Quadruple_"],a=oprs,i="!~*/%+-<>&^|?:=".split("").join("\\"),s=e,o=function(e,r){if(+e+""!="NaN"&&void 0!==r)return n[e]+r;else if(/^([\!~\*\/%\+\-<>\&\^\|\?\:\=])\1*$/.test(e)&&void 0!==r)return n[e.length-1]+r;else{e=((e||"")+"").replace(/\\/g,"").split("");for(var t=0,i={};t<e.length;t++){i[e[t]]=void 0===i[e[t]]?0:i[e[t]];if(e[t]===e[t+1])i[e[t]]++}var s=[],u=0;for(var p in i){if(u++>3)break;s.push(o(i[p],a[p]))}return s.join("")}};for(var u in a)if(RegExp("^([\\"+u+"][\\"+i+"]{0,3})").test(e)&&"prefix-"===r)e=e.replace(RegExp("^\\"+(t=RegExp.$1.split("").join("\\"))+"(.*)$"),o(t,a[u])+"Prefix_Operator($1)");else if(RegExp("([\\"+u+"][\\"+i+"]{0,3})$").test(e)&&"suffix-"===r)e=e.replace(RegExp("^(.*)\\"+(t=RegExp.$1.split("").join("\\"))+"$"),o(t,a[u])+"Suffix_Operator($1)");else if(RegExp("^(.*?)([\\"+u+"][\\"+i+"]{0,3})(.*?)$").test(e))e=e.replace(RegExp("^(.*)\\"+(t=RegExp.$2.split("").join("\\"))+"(.*)$"),o(t,a[u])+"Operator("+(void 0!==RegExp.$1?"$1,":"")+"$2)");if(s===e&&void 0!==r){var p=RegExp("^(.*)[\\"+i+"]+(.*)$");p.test(e);e=e.replace(p,o(e)+"Operator("+(void 0!==RegExp.$1?"$1,":"")+"$2)")}if(void 0!==r&&/(prefix|suffix|media)-/.test(r)){r.replace(/^(\w)/,"");r=r.replace(RegExp.$1,RegExp.$1.toUpperCase()).replace(/-$/,"_");e=e.replace(r,"Media_"!=r?r:"")}return e.replace(/[\!~\*\/%\+\-<>\&\^\|\?\:\=]+/g,"")}function compile(string,args){var r=/(\*\s*|\.{3}\s*|[a-z\$_][\w\$]*\s+)([@\.a-z\$_][\w\$]*)/gi,R=/([@\.a-z\$_][\w\$]*)(\*|\.{3})/gi;function S(e,t){return decompile(t,"BRACE").replace(/\{(\s*)/,(/^\s*$/.test(e)?"{$1":"{$1"+(/\.{3}/.test(e)?"var arity;$1":"")+"var "+argify(strip(decompile(e,"PAREN")).replace(R,"$1").replace(r,"$2"),strip(decompile(e,"PAREN")).replace(R,"$2").replace(r,"$1").split(",")))+";$1")}var patterns={"class#(\\j)\\s*(BRACE)\\.(\\d+)":function(e,a,b,c){return"var "+a+" = (function\b()\b "+eval(b)[+c].replace(/<init>\s*(PAREN\.\d+)?\s*(BRACE\.\d+)/,function(e,r,t){return"constructor#"+a+" ["+(r||"")+"] [true] "+t}).replace(/\.?([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/gi,"prototype#"+a+":$1 [$2] $3").replace(/(\s*)\}$/,"$1  return "+a+";$1})();")},"extends#(\\j)\\:(\\j)\\s*(BRACE)\\.(\\d+)":function(e,a,b,c,d){return"var "+b+" = (function\b(__super__)\b "+eval(c)[+d].replace(/<init>\s*(PAREN\.\d+)?\s*(BRACE\.\d+)/,function(e,r,t){return"constructor#"+b+" ["+(r||"")+"] [false] "+t}).replace(/\.?([a-z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/gi,"prototype#"+b+":$1 [$2] $3").replace(/(\s*)\}$/,"$1  return "+b+";$1})("+a+");")},"constructor#(\\j)\\s*\\[(PAREN\\.\\d+)?\\]\\s*\\[(true|false)\\]\\s*(BRACE\\.\\d+)":function(e,r,t,n,a){t=void 0!==t?t:"";return"function "+r+"() "+S(t,a).replace(/\bsuper\b/g,"__super__.constructor.apply(this, arguments)")+";"},"prototype#(\\j)\\:(\\j)\\s*\\[(.*)\\]\\s*(BRACE\\.\\d+)":function(e,r,t,n,a){var i;n=strip(decompile(n,"PAREN"));i=r+".prototype."+t+" = function() "+S(n,a);for(var s=/\bsuper\b([^;\n\r]*)/;s.test(i);)i=i.replace(s,function(e,r){return"__super__."+t+".call(this"+(/^\s*$/.test(r)?"":","+strip(r))+")"});return i},"arrow#\\[(.*)\\]\\s*\\[(.*)\\]\\s*(BRACE\\.\\d+|PAREN\\.\\d+|.+)":function(e,r,t,n){if(/^PAREN\.\d+/.test(n))return r+"function() { return "+strip(decompile(n,"PAREN"))+"}";else if(/^BRACE\.\d+|^\{/.test(n))return r+"function() "+S(t,n);else return r+"function() { var "+argify(strip(decompile(t,"PAREN")))+"; return "+decompile(n)+"}"},"\\b(do|else|finally|return|try|typeof|while)\\s*(BRACE\\.\\d+)":function(e,r,t){return"\b"+r+"\b \b"+t+"\b"},"\\b(catch|for|function|if|switch|while|with|\\.\\j)\\s*(PAREN\\.\\d+)":function(e,r,t){return"\b"+r+"\b"+t+"\b"},"(\\s*)case\\s*(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)":function(e,r,t,n){var a=[r||""];t=strip(decompile(t,"PAREN")).split(/,|\s+/);for(var i=0;i<t.length;i++)if(!/^\s*$/.test(t[i]))a.push(r+"case "+t[i]+":");return a.join("")+decompile(n,"BRACE").replace(/^\{/,"").replace(/\}$/,r+"  break;")},"(\\s*)default\\s*(PAREN\\.\\d+)?\\s*(BRACE\\.\\d+)":function(e,r,t,n){var a=[r||""];t=strip(decompile(t,"PAREN")).split(/,|\s+/);for(var i=0;i<t.length;i++)if(!/^\s*$/.test(t[i]))a.push(r+"case "+t[i]+":");a.push(r+"default:");return a.join("")+decompile(n,"BRACE").replace(/^\{/,"").replace(/\}$/,r+"  break;")},"<init>\\s*(BRACE\\.\\d+)":function(e,r){return runtime.has("1.6")?"constructor\b()\b "+decompile(r,"BRACE"):"constructor = function() "+decompile(r,"BRACE")},"<init>\\s*(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)":function(e,r,t){r=strip(decompile(r,"PAREN"));return runtime.has("1.6")?"constructor\b()\b "+S(r,t):"constructor = function() "+S(r,t)},"\\.?(\\*?\\j\\s*[\\:\\=]?\\s*)?(PAREN\\.\\d+)\\s*(BRACE\\.\\d+)":function(e,t,n,a){t=t||"";var i,s,o,u;if(/^\./.test(e))if(/[\=]/.test(t))return".\b"+t+"\b()\b "+S(n,a);else return 0/0+t+"\b"+n+"\b "+a+"\b";n=strip(decompile(n,"PAREN")).replace(/[\b]/g,"").replace(/^(.*)\(/,"$1 ").replace(/\)(.*)$/," $1");if(r.test(n)||R.test(n)||void 0!==Paramour.dockets[t]){n=n.replace(R,"$2 $1").replace(r,"$1 $2");u=/\.{3}/.test(n);o=Paramour.push(t,n)-1;i=Paramour.pull(t)[o].join("_").replace(/\s+/g,"").replace(/\*/g,"Any").replace(/\.{3}/g,"Spread");s=Paramour.pull(t)[o].join(",").replace(/\s+/g,"").replace(/\*/g,"Any").replace(/\.{3}/g,"Spread").split(",");return"function "+t+"__"+i.replace(/([a-z\$_][\w\$]*).*$/i,"$1")+"() "+S(n,a)}return/[\:\=]/.test(t)?t+"function() "+S(n,a):"function "+t+"() "+S(n,a)},"(\\j)\\.(\\j)\\s*(BRACE\\.\\d+)":function(e,r,t,n){if(runtime.has("1.6")){n=unhandle(decompile(n,"BRACE").replace(/^\{|\}$/g,""))||"";for(var a=/[\b]?(function\s+)?([a-z\$_][\w\$]*)[\b]?\s*(PAREN\.\d+)\s*(BRACE\.\d+)/i;a.test(n);)n=n.replace(a,function(e,r,t,n,a){return"\b"+t+"\b() \b"+S(n,a)+"\b"});return"class "+t+" extends "+r+" {"+decompile(n,"BRACE").replace(/(function\s+)?([a-zA-Z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/g,"\b$2\b$3\b $4")+"}"}return compile("extends#"+r+":"+t+" "+n)},"(\\j)\\s*(BRACE\\.\\d+)":function(e,r,t){if(runtime.has("1.6")){t=unhandle(decompile(t,"BRACE").replace(/^\{|\}$/g,""))||"";for(var n=/[\b]?(function\s+)?([a-z\$_][\w\$]*)[\b]?\s*(PAREN\.\d+)\s*(BRACE\.\d+)/i;n.test(t);)t=t.replace(n,function(e,r,t,n,a){return"\b"+t+"\b"+n+" \b"+a+"\b"});return"class "+r+" {"+decompile(t,"BRACE").replace(/(function\s+)?([a-zA-Z\$_][\w\$]*)\s*(PAREN\.\d+)\s*(BRACE\.\d+)/g,"\b$2\b$3\b $4")+"}"}return compile("class#"+r+" "+t,[r])},"(\\j)\\s*@\\s*(\\j)":function(e,r,t){return r+".prototype."+t},"(\\j)\\s*<get\\s+(\\j)>\\s*(BRACE\\.\\d+)":function(e,r,t,n){return r+'.__defineGetter__("'+t+'", function() '+n+")"},"(\\j)\\s*<get\\?\\s*(\\j)>":function(e,r,t){return r+'.__lookupGetter__("'+t+'")'},"(\\j)\\s*<set\\s+(\\j)>\\s*(BRACE\\.\\d+)":function(e,r,t,n){return r+'.__defineSetter__("'+t+'", function('+t+") "+n+")"},"(\\j)\\s*<set\\?\\s*(\\j)>":function(e,r,t){return r+'.__lookupSetter__("'+t+'")'},"<(prefix-|suffix-|media-)?operator\\s+([\\!~\\*\\/%\\+\\-<>\\&\\^\\|\\?\\:\\=]{1,4}|\\j)\\s*(BRACK\\.\\d+)?>\\s*(BRACE\\.\\d+)":function(e,r,t,n,a){r=r||"media-";n=decompile(n,"BRACK");var i=/[a-z\$_][\w\$]*/i.test(t),s="";switch(r){case"prefix-":n=n||"Any";s="Prefix_";break;case"media-":n=n||"Any, Any";break;case"suffix-":n=n||"Any";s="Suffix_"}var o=[],u="",p=[];n=n.replace(/^\[\s*|\s*\]$/g,"").split(/;/);o.push(hand(t,r).replace(/\(\)$/,""));if(n.length>1)for(var l=0;l<n.length;l++)p.push(n[l].split(/,\s*/));else p.push(n[0].split(/,\s*/));for(var l=0;l<p.length;l++){for(var c=0;c<p[l].length;c++)p[l][c]=p[l][c].replace(/^\s*(\*|\.{3}|[a-z\$\_][\w\$]*)/i,"$1 \b$\b"+(c+1)+"\b");p[l]=p[l].join(", ")}u=o.join("").replace(/^.*?([a-z\$_][\w\$]*).*?$/i,"$1")+"PAREN."+(PAREN.push("("+p.join(", ")+")")-1)+" "+a;Operator(t,n,r,decompile(u),i);return compile(u)},"\\->":function(){return"return"},"\\~>":function(){return"throw"},"\\+>":function(){return"throw new"},"\\&>":function(){return"yield"},"\\b(un)?defined\\s+(\\j)\\#?":function(e,r,t,n){t+=n||"";return"un"==r?"("+t+" === undefined || "+t+" === null)":"("+t+" !== undefined && "+t+" !== null)"},"(\\j\\s*[\\:\\=]\\s*)?(PAREN\\.\\d+)\\s*\\=>\\s*(BRACE\\.\\d+|PAREN\\.\\d+|.+)":function(e,r,t,n){var a="";r=r||"";if(e!==strip(string)){string.replace(/^(\(+)(.+)(\)+)$/g,"$1$2$3");a=RegExp.$3.slice(0,RegExp.$1.length);self.pattern.test(RegExp.$2);e=RegExp.$_,r=RegExp.$1||"",t=RegExp.$2,n=RegExp.$3}return(runtime.has("1.6")?r+"("+strip(decompile(t,"PAREN"))+") => "+n:compile("arrow#["+r+"] ["+t+"] "+n))+a},"(\\j)?\\s*([\\!~\\*\\/%\\+\\-\\^\\?\\:]|[\\&\\|\\=]{1,2}|[<>]{1,3})?\\s*\\=>\\s*([\\!~\\*\\/%\\+\\-<>\\&\\^\\|\\?\\:\\=]+)?\\s*(PAREN\\.\\d+)\\s*([\\!~\\*\\/%\\+\\-<>\\&\\^\\|\\?\\:\\=]+)?":function(e,r,t,n,a,i){var s=[];r=r||"";t=t||"";for(var o,u=/^(.*)(PAREN\.\d+|[\!~\*\/%\+\-<>\&\^\|\?\:\=]+)(.*)$/;u.test(a);)o=a.replace(u,function(e,r,t,n){a=unhandle(decompile(t,"PAREN").replace(/^\(|\)$/g,""));a.replace(/([\!~\*\/%\+\-<>\&\^\|\?\:\=]+)/);var i,o=RegExp.$1;if(void 0!==Operator.kids&&void 0!==(i=Operator.kids[o]))s.push(a=r+hand(a,i.fix)+n);else{for(var u=RegExp("(\\"+o[0]+")");u.test(a);)a=a.replace(u,"\b0x"+RegExp.$1.charCodeAt(0).toString(16)+"\b");s.push(a=r+a+n)}return a});o=s.reverse()[0].replace(/\s*(\(|\))\s*/g,"$1").replace(/\s+/g," ");for(var u=/\b([a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*)\b/i;u.test(o);)o=o.replace(u,function(e,r,t,n){var a,i,s,o="prefix-",u="media-",p="suffix-";r=r.replace(/[\b]/g,"");t=t.replace(/[\b]/g,"");n=n.replace(/[\b]/g,"");if(void 0!==(a=Operator.kids[r])||void 0!==(i=Operator.kids[t])||void 0!==(s=Operator.kids[n]))if((a||{}).fix==p||(s||{}).fix==o)return r+"("+t+", "+n+")";else if((a||{}).fix==o||(s||{}).fix==p)return n+"("+r+", "+t+")";else if((i||{}).fix==u)return t+"("+r+", "+n+")";else return r+"\b"+t+"\b"+n});for(u=/\b([a-z\$_][\w\$]*)\s+([a-z\$_][\w\$]*)\b/i;u.test(o);)o=o.replace(u,function(e,r,t){var n,a,i="prefix-",s="suffix-";r=r.replace(/[\b]/g,"");t=t.replace(/[\b]/g,"");if(void 0!==(n=Operator.kids[r])||void 0!==(a=Operator.kids[t]))if((n||{}).fix==s||(a||{}).fix==i)return r+"("+t+")";else if((n||{}).fix==i||(a||{}).fix==s)return t+"("+r+")";else return reserved.test(r)?r+"\b"+t+"\b":reserved.test(t)?r+"("+t+")":r+"\b"+t+"\b"});return(""==r?"":reserved.test(r)?r+" ":r+" "+t+"= ")+hand((n||"")+o+(i||"")).replace(/\)\s*,\s*\)/g,"))")},"(\\j\\#?)(\\s+)(\\j)(\\s+)(\\j\\#?)":function(e,r,t,n,a,i,s,o){var u,p,l,c="prefix-",f="suffix-",d="media-";t=t||"";o=o||"";if(void 0!==Operator.kids)if(void 0!==(u=Operator.kids[r])||void 0!==(p=Operator.kids[a])||void 0!==(l=Operator.kids[s]))if((u=u||{}).fix==f||u.fix==c)return a+i+"\b"+r+t+"("+s+o+")";else if((l=l||{}).fix==c||l.fix==f)return r+t+n+"\b"+s+o+"("+a+")";else if((p||{}).fix==d)return a+"("+r+t+", "+s+o+")";if(reserved.test(r)||reserved.test(s))return ignore(decompile(e));else return decompile(r).replace(t,"")+"("+a+" "+i+compile(decompile(s).replace(o,""))+")"},"(\\j\\#?)(\\s+)(\\j\\#?)":function(e,r,t,n,a,i){var s,o,u="prefix-",p="suffix-";t=t||"";i=i||"";if(void 0!==Operator.kids)if(void 0!==(s=Operator.kids[r])||void 0!==(o=Operator.kids[a]))if((s=s||{}).fix==p||s.fix==u)return r+t+"("+a+")";else if((o=o||{}).fix==u||o.fix==p)return a+i+"("+r+")";if(reserved.test(r)||reserved.test(t))return ignore(decompile(e));else return decompile(r).replace(t,"")+"("+compile(decompile(a).replace(i,""))+")"},"var\\s*(PAREN\\.\\d+)([\\x20\\t]*[\\:\\=][\\x20\\t]*.+)?":function(e,r,t){var n;t=t||"";t=t.replace(/;$/,"").replace(/^\s*([\:\=])\s*/,"");n=RegExp.$1;return(":"==n?"const ":"var ")+strip(decompile(r,"PAREN")).replace(/(^\s*|,\s*)([a-z\$_][\w\$]*)(\s*,|\s*$)/gi,""==t?"$1$2$3":"$1$2 = "+t+"$3").replace(/(^\s*|,\s*)([a-z\$_][\w\$]*)(\s*,|\s*$)/gi,""==t?"$1$2$3":"$1$2 = "+t+"$3")+";"},"@(\\j)\\#?":function(e,r,t){if(void 0!=t&&/^[A-Z_]+$/.test(r))return"this"+r+t;else if(void 0!=t)return"this."+r+t;else return"this."+r},"@":function(){return"this"},"(\\j)\\s*(PAREN\\.\\d+)":function(e,r,t){return r+decompile(t,"PAREN")},"\\.${reserved.source.replace(/\\\\/g, '\\\\')}":function(e,r){return'["'+r+'"]'},"${reserved.source.replace(/\\\\/g, '\\\\')}\\s*\\:":function(e,r){if(/arguments|continue|eval|false|null|super|this|true|undefined|void/.test(r))return r+"\b:";else return'"'+r+'":'}};for(var pattern in patterns){var flags,reg=randle(pattern,!0).replace(/^\*([imuy]+)/,function(e){flags=e}).replace(/^\*/,function(){throw new SyntaxError("Paramour [Special RegExp Handling]: Beginning * in '"+pattern+"'")});for(reg=RegExp(reg,flags),string=unhandle(string,"DOUBLE_QUOTE SINGLE_QUOTE REGEXP QUASI MULTI_LINE");reg.test(string)&&(self=patterns[pattern],self.name=pattern,self.pattern=reg);)string=string.replace(/[\b]\$[\b]/g,"$").replace(reg,self).replace(/\$/g,"\b$\b");if(IGNORED.length>0)for(var x=0,y=/IGNORED\.(\d+)/;y.test(string);x++)string=string.replace(y,function(e,r){return IGNORED[+r]})}return string}var SnapShot=window.SnapShot=Paramour.SnapShot=input;input=compile(input);input=decompile(input,void 0,!0);for(var x=/[\b]0x([0-9a-f]{1,2})[\b]/;x.test(input);)input=input.replace(x,String.fromCharCode(eval("0x"+RegExp.$1)));for(var x=/[\b](.+)[\b]/;x.test(input);)input=input.replace(x,"$1");for(var x=0;x<PHANTOMS.kids.length;x++)for(var kid in PHANTOMS.kids[x])input=input.replace(RegExp("[\\b]?\\$[\\b]?"+kid+"\\b","g"),(PHANTOMS.kids[x][kid]+"").replace(/\$/g,"\b$\b"));for(var docket in Paramour.dockets){input+="\nfunction \\docket() {\n  var index, args = arguments, types = Paramour.types.apply(null, arguments).split(',');\n  switch(types + '') {\n";for(var x=0;x<Paramour.dockets[docket].length;x++){var k,g=function(e){var r=[];k=e.join("_").replace(/\s+/g,"").replace(/\*/g,"Any").replace(/\.{3}/g,"Spread");for(var t,n,a,i,s,o=0;o<e.length;o++){e[o]=e[o].replace(/\bAny\b/g,"*").replace(/\bSpread\b/g,"...");t=!(e.length>o+1);n="..."===e[o];a=e.indexOf("...");i=e.lastIndexOf("...");s=i==o;i=i==a;a=a>-1&&o>a;r.push(e[o].replace(/\*/,function(){return"' + types["+(a?"++index":o)+"] + '"}).replace(/\.{3}/,function(){return"' + "+(i?t?"types.slice("+o+", args.length)":"types.slice(index = "+o+", args.length"+(t?"":" - "+(e.length-(o+1)))+")":a?t?"types.slice(++index, args.length)":s?"types.slice(++index, args.length - "+(e.length-(o+1))+")":"types[++index]":"types[index = "+o+"]")+" + '"}))}return r}(Paramour.pull(docket)[x]);input+="    case ("+("'"+g+"'").replace(/^''\s*\+\s*|\s*\+\s*''$/g,"")+"):\n      return "+docket.replace(/\*/,"")+"__"+k+".apply(null, args);\n      break;\n"}input+="    default:\n      throw TypeError('"+docket+" (' + types + ') is undefined')\n      break;\n  }\n}\n";input=input.replace(/\\docket/,docket)}var q={"DOCSTRING#(\\d+)(\\z*\\j)(\\z+\\j)":function(e,r,t,n){return"Paramour.DOCSTR["+r+"].attachTo("+n.replace(/\s/g,"")+");\n"+t+n},"DOCSTRING#(\\d+)(\\z*\\j)":function(e,r,t){return"Paramour.DOCSTR["+r+"].attachTo("+t.replace(/\s/g,"")+");\n"+t},"DOCSTRING#(\\d+)":function(e,r){return"Paramour.DOCSTR["+r+"].attachTo();\n"},"\\{\\{":function(){return"new Tuple("},"\\}\\}":function(){return")"}};for(var o in q)for(var k=RegExp(o.replace(/\\j/g,"[@a-zA-Z\\$_][\\w\\$]*").replace(/\\s/g,"[\\x20\\t\\v ]").replace(/\\z/g,"[\\x20\\t\\v\\n\\r ]").replace(/\\#/g,"(\\.\\d+)").replace(/^\*/,""));k.test(input);)input=input.replace(k,q[o]);Paramour.DOCSTR=DOCSTRING;function t(n,b){for(var ms=1,sec=1e3,min=60,hr=60,dy=24,yr=365,Y=1/0,m,o,q=0,x=q,y="ms sec min hr dy yr Y".split(" ");x<y.length&&n>=eval(y[x]);q=x++)n/=eval(y[x]);return n+" "+y[x-1]}with(clock){stop=(new Date).getTime();span=stop-start;start=new Date(start);stop=new Date(stop);span=t(span,!0)}var j=input.split(/[\n\r]/).length,p=backup.split(/[\n\r]/).length,J=input.length,P=backup.length;function f(e){return Math.round(+e).toString().split("").reverse().join("").replace(/(\d{3})/g,"$1,").replace(/,$/,"").split("").reverse().join("")}function h(e,r,t){for(var n="YZEPTGMK\b".split(""),a=+e>0?1:-1,e=Math.abs(+e);e>=Math.pow(t=t===!0?1e3:1024,(r||0)+1)&&n.length>1;e/=t)n.pop();return(a*e+"").replace(/\.(\d{3}).*/,".$1")+n.reverse()[0]+(1e3===t?"":"b")}function c(e,r){return["1%","10%","20%","30%","40%","50%","60%","70%","80%","90%","99%"][Math.round(e/r>1?e/r/100:10*(e/r))]}function s(){for(var e,r,t=arguments,n=[],a=0;a<t.length;a++)n.push((e=(r=(t[a]+"").replace(/[\b]/g,"")).length)<=12?r+" ".repeat(12-e):r.slice(0,9)+"...");return n.join("| ").replace(/[\b]/g,"")}function w(e){return e?(r++,"Paramour"):"JavaScript"}var d,r=0;Paramour.report="\n/* Was Paramour Useful?\n\n "+(d=s("Category","Paramour","JavaScript","Difference","Winner","Ranking"))+"\n "+"-".repeat(d.length)+"\n "+s("Version",Paramour.version,Paramour.runtime+" - "+(Paramour.runtime===runtime.original?"RAW":"EMU"),"","",Paramour.versionName)+"\n "+s("Lines",f(p),f(j),d=j-p,w(d>0),"~ "+c(p,j))+"\n "+s("Characters",f(P),f(J),d=J-P,w(d>0),"~ "+c(P,J))+"\n "+s("Size x1024",h(P),h(J),h(d=J-P),w(d>0),"~ "+c(P,J))+"\n "+s("Size x1000",h(P,0,!0),h(J,0,!0),h(d=J-P,0,!0),w(d>0),"~ "+c(P,J))+"\n "+s("Benefits",r,4-r,Math.abs(r-(4-r)),w(r>1),"~ "+c(r,5))+"\n "+s("Compile Time",clock.span)+"\n\nParamour was ~ "+(c(4-(p/j+3*(P/J)),4)||"~ 1%")+" useful\n*/";Number.prototype.toTime=function(e){return t(this,e)};Paramour.toTime=function(){return t.apply(null,arguments)};"toTime(Number time, Boolean format)/Number time - the time (in milliseconds) to be converted/Boolean format - format the returned time or not [xxxxY xxxD HH:MM:SS.NN] if true/\\\\ example//toTime(1234)///\\\\ returns 1.234 sec".replace(/(\/+)/g,function(e){return"\n"+"  ".repeat(e.length)}).replace(/\\/g,"/").attachTo(Number.prototype.toTime).attachTo(Paramour.toTime);Paramour.SI=function(){return h.apply(null,arguments)};"SI(Number number, Number leaps, Boolean mode)/Number number - the number to convert/Number leaps - the number of untis to suppress\\skip/Boolean mode - use 1024 (false) or 1000 (true) counting mode/\\\\ example//SI(1024)///\\\\ returns 1Kb//SI(2440)///\\\\ returns 2Kb//SI(2440, 1)///\\\\ returns 2440".replace(/(\/+)/g,function(e){return"\n"+"  ".repeat(e.length)}).replace(/\\/g,"/").attachTo(Paramour.SI);Array.prototype.toTable=function(){return s.apply(null,this)};String.prototype.toTable=function(e){return this.split(e||"|").toTable()
};Paramour.toTable=function(){return s.apply(null,arguments)};"toTable(* content...)/* content - any value to be put into the table/\\\\ note - the content must be less than 12 characters in length/\\\\ example//.toTable('abc', 'def', 'abcdefghijklmnopqrstuvwxyz')///\\\\ returns 'abc         | def         | abcdefghi...'".replace(/(\/+)/g,function(e){return"\n"+"  ".repeat(e.length)}).replace(/\\/g,"/").attachTo(Array.prototype.toTable).attachTo(String.prototype.toTable).attachTo(Paramour.toTable);input=input.replace(/\.(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with|yield)\b/g,'["$1"]');input=input.replace(errors,"").replace(/[\t\v]/g,"");if(tabs)input=input.replace(/[\x20 ]{2}/g,"	");else input=input.replace(/[\t\v]/g,"");input+=embed?"":Paramour.report;var p={get:{form:{data:function(){var e=window.location.search+"";if(!/\?/.test(e))return{};e=e.replace("?","").replace(/\\/g,"\\\\\\").replace(/(["'])/g,"\\$1");if(""===e)return!1;e='{"'+(encodeURI(e).split("&").join('","')||"=").replace(/=/g,'":"').replace(/,\n+/g,",")+'"}';return JSON.parse(decodeURI(e))}}},storage:{set:function(){if(void 0!==Storage)for(var e=0,r=arguments;e<r.length;e++)localStorage.setItem(r[e],r[++e]);else return!1;return!0},check:function(e){return void 0!==paramour.storage.get(e)},get:function(e){return localStorage.getItem(e)},"delete":function(e){localStorage.setItem(e,void 0);return!paramour.storage.check(e)}},attr:function(e,r,t){if(void 0!==e)if(void 0!==t)return e.getAttribute(r);else return"!"===t?e.setAttribute(r,t):e.getAttribute(r)},id:function(e,r,t){if(e!==undfined&&"!"!==e){var n=document.querySelector("#"+e.replace(/\s^|\s$/g,""));if(void 0!==t)return paramour.attr(n,r,t);if(void 0!==r)if("$html"===r)n.innerHTML=r;else return n.innerHTML;return n}},"class":function(e,r,t,n){if(e!==undfined&&"!"!==e){var n=document.querySelectorAll("."+e.replace(/\s^|\s$/g,""));if(void 0!==t)return paramour.attr(n,r,t);if(void 0!==r)if("$html"===r)n.innerHTML=r;else return n.innerHTML;return n}},tag:function(e,r,t,n){return paramour.ele(e,r,t,n)},ele:function(e,r,t,n){if(e!==undfined&&"!"!==e){var n=document.querySelectorAll(e.replace(/\s^|\s$/g,""));if(void 0!==t)return paramour.attr(n,r,t);if(void 0!==r)if("$html"===r)n.innerHTML=r;else return n.innerHTML;return n}},save:function(e,r){e=r?encodeURI(e):e;var t=window.location.pathname+"";r=r||t.substring(t.lastIndexOf("/")+1,t.length)+".cache";return paramour.storage.set(r,e)},load:function(e,r){e=r?encodeURI(e):e;var t=window.location.pathname+"";e=e||t.substring(t.lastIndexOf("/")+1,t.length)+".cache";return paramour.storage.get(e)},"delete":function(e,r){e=r?encodeURI(e):e;var t=window.location.pathname+"";e=e||t.substring(t.lastIndexOf("/")+1,t.length)+".cache";return paramour.storage["delete"](e)},"typeof":function(e){if(arguments.length>1)return paramour.typeOf.apply(null,arguments);var r="";switch(typeof e){case typeof Boolean():r="";break;case typeof Function():r="";break;case typeof Number():r="";break;case typeof Object():switch(e.constructor){case RegExp:r="";break;case Array:r="[]";break;default:r="{}"}break;case typeof String():r='""';break;case typeof Symbol():r=["(@@",")"];e=e.toString();break;case"undefined":r="";break;default:r=""}return(r[0]||"")+e+(r[1]||"")},typeOf:function(){for(var e=[],r=0,t=arguments;r<t.length&&void 0!==t[r]&&null!==t[r];r++)e.push(t[r].__proto__.constructor.name||t[r].constructor.name);return(e+"").replace(/\*/g,"ANY").toUpperCase()},random:function(){return Boolean(Math.round(Math.random()))}};for(var o in p)Paramour[o]=p[o];return input};