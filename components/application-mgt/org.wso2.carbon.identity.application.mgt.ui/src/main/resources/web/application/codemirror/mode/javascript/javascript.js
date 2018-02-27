'use strict';(function(p){"object"==typeof exports&&"object"==typeof module?p(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],p):p(CodeMirror)})(function(p){function ja(p,q,n){return/^(?:operator|sof|keyword c|case|new|export|default|[\[{}\(,;:]|=>)$/.test(q.lastType)||"quasi"==q.lastType&&/\{\s*$/.test(p.string.slice(0,p.pos-(n||0)))}p.defineMode("javascript",function(xa,q){function n(a,c,b){G=a;P=b;return c}function C(a,c){var b=a.next();if('"'==
b||"'"==b)return c.tokenize=ya(b),c.tokenize(a,c);if("."==b&&a.match(/^\d+(?:[eE][+\-]?\d+)?/))return n("number","number");if("."==b&&a.match(".."))return n("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(b))return n(b);if("="==b&&a.eat(">"))return n("=>","operator");if("0"==b&&a.eat(/x/i))return a.eatWhile(/[\da-f]/i),n("number","number");if("0"==b&&a.eat(/o/i))return a.eatWhile(/[0-7]/i),n("number","number");if("0"==b&&a.eat(/b/i))return a.eatWhile(/[01]/i),n("number","number");if(/\d/.test(b))return a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),
n("number","number");if("/"==b){if(a.eat("*"))return c.tokenize=Q,Q(a,c);if(a.eat("/"))return a.skipToEnd(),n("comment","comment");if(ja(a,c,1)){a:for(var f=c=!1;null!=(b=a.next());){if(!c){if("/"==b&&!f)break a;"["==b?f=!0:f&&"]"==b&&(f=!1)}c=!c&&"\\"==b}a.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);return n("regexp","string-2")}a.eatWhile(R);return n("operator","operator",a.current())}if("`"==b)return c.tokenize=Z,Z(a,c);if("#"==b)return a.skipToEnd(),n("error","error");if(R.test(b))return">"==b&&
c.lexical&&">"==c.lexical.type||a.eatWhile(R),n("operator","operator",a.current());if(aa.test(b)){a.eatWhile(aa);b=a.current();if("."!=c.lastType){if(ka.propertyIsEnumerable(b))return a=ka[b],n(a.type,a.style,b);if("async"==b&&a.match(/^\s*[\(\w]/,!1))return n("async","keyword",b)}return n("variable","variable",b)}}function ya(a){return function(c,b){var f=!1,k;if(S&&"@"==c.peek()&&c.match(za))return b.tokenize=C,n("jsonld-keyword","meta");for(;null!=(k=c.next())&&(k!=a||f);)f=!f&&"\\"==k;f||(b.tokenize=
C);return n("string","string")}}function Q(a,c){for(var b=!1,f;f=a.next();){if("/"==f&&b){c.tokenize=C;break}b="*"==f}return n("comment","comment")}function Z(a,c){for(var b=!1,f;null!=(f=a.next());){if(!b&&("`"==f||"$"==f&&a.eat("{"))){c.tokenize=C;break}b=!b&&"\\"==f}return n("quasi","string-2",a.current())}function ba(a,c){c.fatArrowAt&&(c.fatArrowAt=null);var b=a.string.indexOf("=>",a.start);if(!(0>b)){if(v){var f=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(a.string.slice(a.start,b));f&&
(b=f.index)}for(var f=0,d=!1,b=b-1;0<=b;--b){var z=a.string.charAt(b),e="([{}])".indexOf(z);if(0<=e&&3>e){if(!f){++b;break}if(0==--f){"("==z&&(d=!0);break}}else if(3<=e&&6>e)++f;else if(aa.test(z))d=!0;else{if(/["'\/]/.test(z))return;if(d&&!f){++b;break}}}d&&!f&&(c.fatArrowAt=b)}}function ma(a,b,d,f,e,z){this.indented=a;this.column=b;this.type=d;this.prev=e;this.info=z;null!=f&&(this.align=f)}function g(){for(var a=arguments.length-1;0<=a;a--)d.cc.push(arguments[a])}function b(){g.apply(null,arguments);
return!0}function H(a){function b(b){for(;b;b=b.next)if(b.name==a)return!0;return!1}var k=d.state;d.marked="def";k.context?b(k.localVars)||(k.localVars={name:a,next:k.localVars}):!b(k.globalVars)&&q.globalVars&&(k.globalVars={name:a,next:k.globalVars})}function I(){d.state.context={prev:d.state.context,vars:d.state.localVars};d.state.localVars=Aa}function J(){d.state.localVars=d.state.context.vars;d.state.context=d.state.context.prev}function h(a,b){var c=function(){var c=d.state,k=c.indented;if("stat"==
c.lexical.type)k=c.lexical.indented;else for(var e=c.lexical;e&&")"==e.type&&e.align;e=e.prev)k=e.indented;c.lexical=new ma(k,d.stream.column(),a,null,c.lexical,b)};c.lex=!0;return c}function e(){var a=d.state;a.lexical.prev&&(")"==a.lexical.type&&(a.indented=a.lexical.indented),a.lexical=a.lexical.prev)}function l(a){function c(d){return d==a?b():";"==a?g():b(c)}return c}function r(a,c){return"var"==a?b(h("vardef",c.length),ca,l(";"),e):"keyword a"==a?b(h("form"),da,r,e):"keyword b"==a?b(h("form"),
r,e):"{"==a?b(h("}"),T,e):";"==a?b():"if"==a?("else"==d.state.lexical.info&&d.state.cc[d.state.cc.length-1]==e&&d.state.cc.pop()(),b(h("form"),da,r,e,na)):"function"==a?b(w):"for"==a?b(h("form"),Ba,r,e):"variable"==a?v&&"type"==c?(d.marked="keyword",b(t,l("operator"),t,l(";"))):b(h("stat"),Ca):"switch"==a?b(h("form"),da,l("{"),h("}","switch"),T,e,e):"case"==a?b(m,l(":")):"default"==a?b(l(":")):"catch"==a?b(h("form"),I,l("("),ea,l(")"),r,e,J):"class"==a?b(h("form"),oa,e):"export"==a?b(h("stat"),Da,
e):"import"==a?b(h("stat"),Ea,e):"module"==a?b(h("form"),x,l("{"),h("}"),T,e,e):"async"==a?b(r):"@"==c?b(m,r):g(h("stat"),m,l(";"),e)}function m(a){return pa(a,!1)}function u(a){return pa(a,!0)}function da(a){return"("!=a?g():b(h(")"),m,l(")"),e)}function pa(a,c){if(d.state.fatArrowAt==d.stream.start){var k=c?qa:ra;if("("==a)return b(I,h(")"),y(x,")"),e,l("=>"),k,J);if("variable"==a)return g(I,x,l("=>"),k,J)}k=c?K:D;return Fa.hasOwnProperty(a)?b(k):"function"==a?b(w,k):"class"==a?b(h("form"),Ga,e):
"keyword c"==a||"async"==a?b(c?Ha:fa):"("==a?b(h(")"),fa,l(")"),e,k):"operator"==a||"spread"==a?b(c?u:m):"["==a?b(h("]"),Ia,e,k):"{"==a?L(ga,"}",null,k):"quasi"==a?g(U,k):"new"==a?b(Ja(c)):b()}function fa(a){return a.match(/[;\}\)\],]/)?g():g(m)}function Ha(a){return a.match(/[;\}\)\],]/)?g():g(u)}function D(a,c){return","==a?b(m):K(a,c,!1)}function K(a,c,k){var f=0==k?D:K,la=0==k?m:u;if("=>"==a)return b(I,k?qa:ra,J);if("operator"==a)return/\+\+|--/.test(c)?b(f):"?"==c?b(m,l(":"),la):b(la);if("quasi"==
a)return g(U,f);if(";"!=a){if("("==a)return L(u,")","call",f);if("."==a)return b(Ka,f);if("["==a)return b(h("]"),fa,l("]"),e,f);if(v&&"as"==c)return d.marked="keyword",b(t,f)}}function U(a,c){return"quasi"!=a?g():"${"!=c.slice(c.length-2)?b(U):b(m,La)}function La(a){if("}"==a)return d.marked="string-2",d.state.tokenize=Z,b(U)}function ra(a){ba(d.stream,d.state);return g("{"==a?r:m)}function qa(a){ba(d.stream,d.state);return g("{"==a?r:u)}function Ja(a){return function(c){return"."==c?b(a?Ma:Na):g(a?
u:m)}}function Na(a,c){if("target"==c)return d.marked="keyword",b(D)}function Ma(a,c){if("target"==c)return d.marked="keyword",b(K)}function Ca(a){return":"==a?b(e,r):g(D,l(";"),e)}function Ka(a){if("variable"==a)return d.marked="property",b()}function ga(a,c){if("async"==a)return d.marked="property",b(ga);if("variable"==a||"keyword"==d.style)return d.marked="property","get"==c||"set"==c?b(Oa):b(A);if("number"==a||"string"==a)return d.marked=S?"property":d.style+" property",b(A);if("jsonld-keyword"==
a)return b(A);if("modifier"==a)return b(ga);if("["==a)return b(m,l("]"),A);if("spread"==a)return b(m,A);if(":"==a)return g(A)}function Oa(a){if("variable"!=a)return g(A);d.marked="property";return b(w)}function A(a){if(":"==a)return b(u);if("("==a)return g(w)}function y(a,c,k){function f(e,z){return(k?-1<k.indexOf(e):","==e)?(e=d.state.lexical,"call"==e.info&&(e.pos=(e.pos||0)+1),b(function(b,f){return b==c||f==c?g():g(a)},f)):e==c||z==c?b():b(l(c))}return function(d,e){return d==c||e==c?b():g(a,
f)}}function L(a,c,k){for(var f=3;f<arguments.length;f++)d.cc.push(arguments[f]);return b(h(c,k),y(a,c),e)}function T(a){return"}"==a?b():g(r,T)}function M(a,c){if(v){if(":"==a)return b(t);if("?"==c)return b(M)}}function t(a){if("variable"==a)return d.marked="type",b(N);if("string"==a||"number"==a||"atom"==a)return b(N);if("{"==a)return b(h("}"),y(V,"}",",;"),e,N);if("("==a)return b(y(sa,")"),Pa)}function Pa(a){if("=>"==a)return b(t)}function V(a,c){if("variable"==a||"keyword"==d.style)return d.marked=
"property",b(V);if("?"==c)return b(V);if(":"==a)return b(t);if("["==a)return b(m,M,l("]"),V)}function sa(a){if("variable"==a)return b(sa);if(":"==a)return b(t)}function N(a,c){if("<"==c)return b(h(">"),y(t,">"),e,N);if("|"==c||"."==a)return b(t);if("["==a)return b(l("]"),N);if("extends"==c)return b(t)}function ca(){return g(x,M,O,Qa)}function x(a,c){if("modifier"==a)return b(x);if("variable"==a)return H(c),b();if("spread"==a)return b(x);if("["==a)return L(x,"]");if("{"==a)return L(Ra,"}")}function Ra(a,
c){if("variable"==a&&!d.stream.match(/^\s*:/,!1))return H(c),b(O);"variable"==a&&(d.marked="property");return"spread"==a?b(x):"}"==a?g():b(l(":"),x,O)}function O(a,c){if("="==c)return b(u)}function Qa(a){if(","==a)return b(ca)}function na(a,c){if("keyword b"==a&&"else"==c)return b(h("form","else"),r,e)}function Ba(a){if("("==a)return b(h(")"),Sa,l(")"),e)}function Sa(a){return"var"==a?b(ca,l(";"),W):";"==a?b(W):"variable"==a?b(Ta):g(m,l(";"),W)}function Ta(a,c){return"in"==c||"of"==c?(d.marked="keyword",
b(m)):b(D,W)}function W(a,c){return";"==a?b(ta):"in"==c||"of"==c?(d.marked="keyword",b(m)):g(m,l(";"),ta)}function ta(a){")"!=a&&b(m)}function w(a,c){if("*"==c)return d.marked="keyword",b(w);if("variable"==a)return H(c),b(w);if("("==a)return b(I,h(")"),y(ea,")"),e,M,r,J);if(v&&"<"==c)return b(h(">"),y(t,">"),e,w)}function ea(a){return"spread"==a?b(ea):g(x,M,O)}function Ga(a,b){return"variable"==a?oa(a,b):X(a,b)}function oa(a,c){if("variable"==a)return H(c),b(X)}function X(a,c){if("<"==c)return b(h(">"),
y(t,">"),e,X);if("extends"==c||"implements"==c||v&&","==a)return b(v?t:m,X);if("{"==a)return b(h("}"),B,e)}function B(a,c){if("variable"==a||"keyword"==d.style){if(("async"==c||"static"==c||"get"==c||"set"==c||v&&("public"==c||"private"==c||"protected"==c||"readonly"==c||"abstract"==c))&&d.stream.match(/^\s+[\w$\xa1-\uffff]/,!1))return d.marked="keyword",b(B);d.marked="property";return b(v?ha:w,B)}if("["==a)return b(m,l("]"),v?ha:w,B);if("*"==c)return d.marked="keyword",b(B);if(";"==a)return b(B);
if("}"==a)return b();if("@"==c)return b(m,B)}function ha(a,c){return"?"==c?b(ha):":"==a?b(t,O):"="==c?b(u):g(w)}function Da(a,c){return"*"==c?(d.marked="keyword",b(ia,l(";"))):"default"==c?(d.marked="keyword",b(m,l(";"))):"{"==a?b(y(ua,"}"),ia,l(";")):g(r)}function ua(a,c){if("as"==c)return d.marked="keyword",b(l("variable"));if("variable"==a)return g(u,ua)}function Ea(a){return"string"==a?b():g(Y,va,ia)}function Y(a,c){if("{"==a)return L(Y,"}");"variable"==a&&H(c);"*"==c&&(d.marked="keyword");return b(Ua)}
function va(a){if(","==a)return b(Y,va)}function Ua(a,c){if("as"==c)return d.marked="keyword",b(Y)}function ia(a,c){if("from"==c)return d.marked="keyword",b(m)}function Ia(a){return"]"==a?b():g(y(u,"]"))}var E=xa.indentUnit,wa=q.statementIndent,S=q.jsonld,F=q.json||S,v=q.typescript,aa=q.wordCharacters||/[\w$\xa1-\uffff]/,ka=function(){function a(a){return{type:a,style:"keyword"}}var b=a("keyword a"),d=a("keyword b"),f=a("keyword c"),e=a("operator"),g={type:"atom",style:"atom"},b={"if":a("if"),"while":b,
"with":b,"else":d,"do":d,"try":d,"finally":d,"return":f,"break":f,"continue":f,"new":a("new"),"delete":f,"throw":f,"debugger":f,"var":a("var"),"const":a("var"),let:a("var"),"function":a("function"),"catch":a("catch"),"for":a("for"),"switch":a("switch"),"case":a("case"),"default":a("default"),"in":e,"typeof":e,"instanceof":e,"true":g,"false":g,"null":g,undefined:g,NaN:g,Infinity:g,"this":a("this"),"class":a("class"),"super":a("atom"),yield:f,"export":a("export"),"import":a("import"),"extends":f,await:f};
if(v){var d={type:"variable",style:"type"},f={"interface":a("class"),"implements":f,namespace:f,module:a("module"),"enum":a("module"),"public":a("modifier"),"private":a("modifier"),"protected":a("modifier"),"abstract":a("modifier"),string:d,number:d,"boolean":d,any:d},h;for(h in f)b[h]=f[h]}return b}(),R=/[+\-*&%=<>!?|~^@]/,za=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,G,P,Fa={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"jsonld-keyword":!0},
d={state:null,column:null,marked:null,cc:null},Aa={name:"this",next:{name:"arguments"}};e.lex=!0;return{startState:function(a){a={tokenize:C,lastType:"sof",cc:[],lexical:new ma((a||0)-E,0,"block",!1),localVars:q.localVars,context:q.localVars&&{vars:q.localVars},indented:a||0};q.globalVars&&"object"==typeof q.globalVars&&(a.globalVars=q.globalVars);return a},token:function(a,b){a.sol()&&(b.lexical.hasOwnProperty("align")||(b.lexical.align=!1),b.indented=a.indentation(),ba(a,b));if(b.tokenize!=Q&&a.eatSpace())return null;
var c=b.tokenize(a,b);if("comment"==G)return c;b.lastType="operator"!=G||"++"!=P&&"--"!=P?G:"incdec";a:{var f=G,e=P,g=b.cc;d.state=b;d.stream=a;d.marked=null;d.cc=g;d.style=c;b.lexical.hasOwnProperty("align")||(b.lexical.align=!0);for(;;)if((g.length?g.pop():F?m:r)(f,e)){for(;g.length&&g[g.length-1].lex;)g.pop()();if(d.marked){c=d.marked;break a}if(a="variable"==f)b:{for(a=b.localVars;a;a=a.next)if(a.name==e){a=!0;break b}for(b=b.context;b;b=b.prev)for(a=b.vars;a;a=a.next)if(a.name==e){a=!0;break b}a=
void 0}if(a){c="variable-2";break a}break a}}return c},indent:function(a,b){if(a.tokenize==Q)return p.Pass;if(a.tokenize!=C)return 0;var c=b&&b.charAt(0),d=a.lexical,g;if(!/^\s*else\b/.test(b))for(var h=a.cc.length-1;0<=h;--h){var l=a.cc[h];if(l==e)d=d.prev;else if(l!=na)break}for(;!("stat"!=d.type&&"form"!=d.type||"}"!=c&&(!(g=a.cc[a.cc.length-1])||g!=D&&g!=K||/^[,\.=+\-*:?[\(]/.test(b)));)d=d.prev;wa&&")"==d.type&&"stat"==d.prev.type&&(d=d.prev);g=d.type;h=c==g;return"vardef"==g?d.indented+("operator"==
a.lastType||","==a.lastType?d.info+1:0):"form"==g&&"{"==c?d.indented:"form"==g?d.indented+E:"stat"==g?(c=d.indented,a="operator"==a.lastType||","==a.lastType||R.test(b.charAt(0))||/[,.]/.test(b.charAt(0)),c+(a?wa||E:0)):"switch"!=d.info||h||0==q.doubleIndentSwitch?d.align?d.column+(h?0:1):d.indented+(h?0:E):d.indented+(/^(?:case|default)\b/.test(b)?E:2*E)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:F?null:"/*",blockCommentEnd:F?null:"*/",lineComment:F?null:"//",fold:"brace",
closeBrackets:"()[]{}''\"\"``",helperType:F?"json":"javascript",jsonldMode:S,jsonMode:F,expressionAllowed:ja,skipExpression:function(a){var b=a.cc[a.cc.length-1];b!=m&&b!=u||a.cc.pop()}}});p.registerHelper("wordChars","javascript",/[\w$]/);p.defineMIME("text/javascript","javascript");p.defineMIME("text/ecmascript","javascript");p.defineMIME("application/javascript","javascript");p.defineMIME("application/x-javascript","javascript");p.defineMIME("application/ecmascript","javascript");p.defineMIME("application/json",
{name:"javascript",json:!0});p.defineMIME("application/x-json",{name:"javascript",json:!0});p.defineMIME("application/ld+json",{name:"javascript",jsonld:!0});p.defineMIME("text/typescript",{name:"javascript",typescript:!0});p.defineMIME("application/typescript",{name:"javascript",typescript:!0})});