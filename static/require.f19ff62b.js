var requirejs,require,define;(function(global,setTimeout){var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.3.6",commentRegExp=/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!!(typeof window!="undefined"&&typeof navigator!="undefined"&&window.document),isWebWorker=!isBrowser&&typeof importScripts!="undefined",readyRegExp=isBrowser&&navigator.platform==="PLAYSTATION 3"?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera=typeof opera!="undefined"&&opera.toString()==="[object Opera]",contexts={},cfg={},globalDefQueue=[],useInteractive=!1;function commentReplace(r,a){return a||""}function isFunction(r){return ostring.call(r)==="[object Function]"}function isArray(r){return ostring.call(r)==="[object Array]"}function each(r,a){if(r){var c;for(c=0;c<r.length&&!(r[c]&&a(r[c],c,r));c+=1);}}function eachReverse(r,a){if(r){var c;for(c=r.length-1;c>-1&&!(r[c]&&a(r[c],c,r));c-=1);}}function hasProp(r,a){return hasOwn.call(r,a)}function getOwn(r,a){return hasProp(r,a)&&r[a]}function eachProp(r,a){var c;for(c in r)if(hasProp(r,c)&&a(r[c],c))break}function mixin(r,a,c,u){return a&&eachProp(a,function(h,q){(c||!hasProp(r,q))&&(u&&typeof h=="object"&&h&&!isArray(h)&&!isFunction(h)&&!(h instanceof RegExp)?(r[q]||(r[q]={}),mixin(r[q],h,c,u)):r[q]=h)}),r}function bind(r,a){return function(){return a.apply(r,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(r){throw r}function getGlobal(r){if(!r)return r;var a=global;return each(r.split("."),function(c){a=a[c]}),a}function makeError(r,a,c,u){var h=new Error(a+`
https://requirejs.org/docs/errors.html#`+r);return h.requireType=r,h.requireModules=u,c&&(h.originalError=c),h}if(typeof define!="undefined")return;if(typeof requirejs!="undefined"){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}typeof require!="undefined"&&!isFunction(require)&&(cfg=require,require=void 0);function newContext(r){var a,c,u,h,q,g={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},v={},B={},I={},M=[],w={},D={},L={},H=1,K=1;function X(e){var i,n;for(i=0;i<e.length;i++)if(n=e[i],n===".")e.splice(i,1),i-=1;else if(n===".."){if(i===0||i===1&&e[2]===".."||e[i-1]==="..")continue;i>0&&(e.splice(i-1,2),i-=2)}}function P(e,i,n){var o,t,f,d,l,p,b,E,m,x,R,A,O=i&&i.split("/"),k=g.map,j=k&&k["*"];if(e&&(e=e.split("/"),b=e.length-1,g.nodeIdCompat&&jsSuffixRegExp.test(e[b])&&(e[b]=e[b].replace(jsSuffixRegExp,"")),e[0].charAt(0)==="."&&O&&(A=O.slice(0,O.length-1),e=A.concat(e)),X(e),e=e.join("/")),n&&k&&(O||j)){f=e.split("/");e:for(d=f.length;d>0;d-=1){if(p=f.slice(0,d).join("/"),O){for(l=O.length;l>0;l-=1)if(t=getOwn(k,O.slice(0,l).join("/")),t&&(t=getOwn(t,p),t)){E=t,m=d;break e}}!x&&j&&getOwn(j,p)&&(x=getOwn(j,p),R=d)}!E&&x&&(E=x,m=R),E&&(f.splice(0,m,E),e=f.join("/"))}return o=getOwn(g.pkgs,e),o||e}function W(e){isBrowser&&each(scripts(),function(i){if(i.getAttribute("data-requiremodule")===e&&i.getAttribute("data-requirecontext")===u.contextName)return i.parentNode.removeChild(i),!0})}function Q(e){var i=getOwn(g.paths,e);if(i&&isArray(i)&&i.length>1)return i.shift(),u.require.undef(e),u.makeRequire(null,{skipMap:!0})([e]),!0}function G(e){var i,n=e?e.indexOf("!"):-1;return n>-1&&(i=e.substring(0,n),e=e.substring(n+1,e.length)),[i,e]}function S(e,i,n,o){var t,f,d,l,p=null,b=i?i.name:null,E=e,m=!0,x="";return e||(m=!1,e="_@r"+(H+=1)),l=G(e),p=l[0],e=l[1],p&&(p=P(p,b,o),f=getOwn(w,p)),e&&(p?n?x=e:f&&f.normalize?x=f.normalize(e,function(R){return P(R,b,o)}):x=e.indexOf("!")===-1?P(e,b,o):e:(x=P(e,b,o),l=G(x),p=l[0],x=l[1],n=!0,t=u.nameToUrl(x))),d=p&&!f&&!n?"_unnormalized"+(K+=1):"",{prefix:p,name:x,parentMap:i,unnormalized:!!d,url:t,originalName:E,isDefine:m,id:(p?p+"!"+x:x)+d}}function T(e){var i=e.id,n=getOwn(v,i);return n||(n=v[i]=new u.Module(e)),n}function C(e,i,n){var o=e.id,t=getOwn(v,o);hasProp(w,o)&&(!t||t.defineEmitComplete)?i==="defined"&&n(w[o]):(t=T(e),t.error&&i==="error"?n(t.error):t.on(i,n))}function y(e,i){var n=e.requireModules,o=!1;i?i(e):(each(n,function(t){var f=getOwn(v,t);f&&(f.error=e,f.events.error&&(o=!0,f.emit("error",e)))}),o||req.onError(e))}function F(){globalDefQueue.length&&(each(globalDefQueue,function(e){var i=e[0];typeof i=="string"&&(u.defQueueMap[i]=!0),M.push(e)}),globalDefQueue=[])}h={require:function(e){return e.require?e.require:e.require=u.makeRequire(e.map)},exports:function(e){if(e.usingExports=!0,e.map.isDefine)return e.exports?w[e.map.id]=e.exports:e.exports=w[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(g.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}};function U(e){delete v[e],delete B[e]}function $(e,i,n){var o=e.map.id;e.error?e.emit("error",e.error):(i[o]=!0,each(e.depMaps,function(t,f){var d=t.id,l=getOwn(v,d);l&&!e.depMatched[f]&&!n[d]&&(getOwn(i,d)?(e.defineDep(f,w[d]),e.check()):$(l,i,n))}),n[o]=!0)}function z(){var e,i,n=g.waitSeconds*1e3,o=n&&u.startTime+n<new Date().getTime(),t=[],f=[],d=!1,l=!0;if(!a){if(a=!0,eachProp(B,function(p){var b=p.map,E=b.id;if(!!p.enabled&&(b.isDefine||f.push(p),!p.error)){if(!p.inited&&o)Q(E)?(i=!0,d=!0):(t.push(E),W(E));else if(!p.inited&&p.fetched&&b.isDefine&&(d=!0,!b.prefix))return l=!1}}),o&&t.length)return e=makeError("timeout","Load timeout for modules: "+t,null,t),e.contextName=u.contextName,y(e);l&&each(f,function(p){$(p,{},{})}),(!o||i)&&d&&(isBrowser||isWebWorker)&&!q&&(q=setTimeout(function(){q=0,z()},50)),a=!1}}c=function(e){this.events=getOwn(I,e.id)||{},this.map=e,this.shim=getOwn(g.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0},c.prototype={init:function(e,i,n,o){o=o||{},!this.inited&&(this.factory=i,n?this.on("error",n):this.events.error&&(n=bind(this,function(t){this.emit("error",t)})),this.depMaps=e&&e.slice(0),this.errback=n,this.inited=!0,this.ignore=o.ignore,o.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,i){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=i)},fetch:function(){if(!this.fetched){this.fetched=!0,u.startTime=new Date().getTime();var e=this.map;if(this.shim)u.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()}));else return e.prefix?this.callPlugin():this.load()}},load:function(){var e=this.map.url;D[e]||(D[e]=!0,u.load(this.map.id,e))},check:function(){if(!(!this.enabled||this.enabling)){var e,i,n=this.map.id,o=this.depExports,t=this.exports,f=this.factory;if(!this.inited)hasProp(u.defQueueMap,n)||this.fetch();else if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(f)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{t=u.execCb(n,f,o,t)}catch(l){e=l}else t=u.execCb(n,f,o,t);if(this.map.isDefine&&t===void 0&&(i=this.module,i?t=i.exports:this.usingExports&&(t=this.exports)),e)return e.requireMap=this.map,e.requireModules=this.map.isDefine?[this.map.id]:null,e.requireType=this.map.isDefine?"define":"require",y(this.error=e)}else t=f;if(this.exports=t,this.map.isDefine&&!this.ignore&&(w[n]=t,req.onResourceLoad)){var d=[];each(this.depMaps,function(l){d.push(l.normalizedMap||l)}),req.onResourceLoad(u,this.map,d)}U(n),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}},callPlugin:function(){var e=this.map,i=e.id,n=S(e.prefix);this.depMaps.push(n),C(n,"defined",bind(this,function(o){var t,f,d,l=getOwn(L,this.map.id),p=this.map.name,b=this.map.parentMap?this.map.parentMap.name:null,E=u.makeRequire(e.parentMap,{enableBuildCallback:!0});if(this.map.unnormalized){o.normalize&&(p=o.normalize(p,function(m){return P(m,b,!0)})||""),f=S(e.prefix+"!"+p,this.map.parentMap,!0),C(f,"defined",bind(this,function(m){this.map.normalizedMap=f,this.init([],function(){return m},null,{enabled:!0,ignore:!0})})),d=getOwn(v,f.id),d&&(this.depMaps.push(f),this.events.error&&d.on("error",bind(this,function(m){this.emit("error",m)})),d.enable());return}if(l){this.map.url=u.nameToUrl(l),this.load();return}t=bind(this,function(m){this.init([],function(){return m},null,{enabled:!0})}),t.error=bind(this,function(m){this.inited=!0,this.error=m,m.requireModules=[i],eachProp(v,function(x){x.map.id.indexOf(i+"_unnormalized")===0&&U(x.map.id)}),y(m)}),t.fromText=bind(this,function(m,x){var R=e.name,A=S(R),O=useInteractive;x&&(m=x),O&&(useInteractive=!1),T(A),hasProp(g.config,i)&&(g.config[R]=g.config[i]);try{req.exec(m)}catch(k){return y(makeError("fromtexteval","fromText eval for "+i+" failed: "+k,k,[i]))}O&&(useInteractive=!0),this.depMaps.push(A),u.completeLoad(R),E([R],t)}),o.load(e.name,E,t,g)})),u.enable(n,this),this.pluginMaps[n.id]=n},enable:function(){B[this.map.id]=this,this.enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,i){var n,o,t;if(typeof e=="string"){if(e=S(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[i]=e,t=getOwn(h,e.id),t){this.depExports[i]=t(this);return}this.depCount+=1,C(e,"defined",bind(this,function(f){this.undefed||(this.defineDep(i,f),this.check())})),this.errback?C(e,"error",bind(this,this.errback)):this.events.error&&C(e,"error",bind(this,function(f){this.emit("error",f)}))}n=e.id,o=v[n],!hasProp(h,n)&&o&&!o.enabled&&u.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var i=getOwn(v,e.id);i&&!i.enabled&&u.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,i){var n=this.events[e];n||(n=this.events[e]=[]),n.push(i)},emit:function(e,i){each(this.events[e],function(n){n(i)}),e==="error"&&delete this.events[e]}};function _(e){hasProp(w,e[0])||T(S(e[0],null,!0)).init(e[1],e[2])}function J(e,i,n,o){e.detachEvent&&!isOpera?o&&e.detachEvent(o,i):e.removeEventListener(n,i,!1)}function V(e){var i=e.currentTarget||e.srcElement;return J(i,u.onScriptLoad,"load","onreadystatechange"),J(i,u.onScriptError,"error"),{node:i,id:i&&i.getAttribute("data-requiremodule")}}function Y(){var e;for(F();M.length;){if(e=M.shift(),e[0]===null)return y(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));_(e)}u.defQueueMap={}}return u={config:g,contextName:r,registry:v,defined:w,urlFetched:D,defQueue:M,defQueueMap:{},Module:c,makeModuleMap:S,nextTick:req.nextTick,onError:y,configure:function(e){if(e.baseUrl&&e.baseUrl.charAt(e.baseUrl.length-1)!=="/"&&(e.baseUrl+="/"),typeof e.urlArgs=="string"){var i=e.urlArgs;e.urlArgs=function(t,f){return(f.indexOf("?")===-1?"?":"&")+i}}var n=g.shim,o={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(t,f){o[f]?(g[f]||(g[f]={}),mixin(g[f],t,!0,!0)):g[f]=t}),e.bundles&&eachProp(e.bundles,function(t,f){each(t,function(d){d!==f&&(L[d]=f)})}),e.shim&&(eachProp(e.shim,function(t,f){isArray(t)&&(t={deps:t}),(t.exports||t.init)&&!t.exportsFn&&(t.exportsFn=u.makeShimExports(t)),n[f]=t}),g.shim=n),e.packages&&each(e.packages,function(t){var f,d;t=typeof t=="string"?{name:t}:t,d=t.name,f=t.location,f&&(g.paths[d]=t.location),g.pkgs[d]=t.name+"/"+(t.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(v,function(t,f){!t.inited&&!t.map.unnormalized&&(t.map=S(f,null,!0))}),(e.deps||e.callback)&&u.require(e.deps||[],e.callback)},makeShimExports:function(e){function i(){var n;return e.init&&(n=e.init.apply(global,arguments)),n||e.exports&&getGlobal(e.exports)}return i},makeRequire:function(e,i){i=i||{};function n(o,t,f){var d,l,p;return i.enableBuildCallback&&t&&isFunction(t)&&(t.__requireJsBuild=!0),typeof o=="string"?isFunction(t)?y(makeError("requireargs","Invalid require call"),f):e&&hasProp(h,o)?h[o](v[e.id]):req.get?req.get(u,o,e,n):(l=S(o,e,!1,!0),d=l.id,hasProp(w,d)?w[d]:y(makeError("notloaded",'Module name "'+d+'" has not been loaded yet for context: '+r+(e?"":". Use require([])")))):(Y(),u.nextTick(function(){Y(),p=T(S(null,e)),p.skipMap=i.skipMap,p.init(o,t,f,{enabled:!0}),z()}),n)}return mixin(n,{isBrowser,toUrl:function(o){var t,f=o.lastIndexOf("."),d=o.split("/")[0],l=d==="."||d==="..";return f!==-1&&(!l||f>1)&&(t=o.substring(f,o.length),o=o.substring(0,f)),u.nameToUrl(P(o,e&&e.id,!0),t,!0)},defined:function(o){return hasProp(w,S(o,e,!1,!0).id)},specified:function(o){return o=S(o,e,!1,!0).id,hasProp(w,o)||hasProp(v,o)}}),e||(n.undef=function(o){F();var t=S(o,e,!0),f=getOwn(v,o);f.undefed=!0,W(o),delete w[o],delete D[t.url],delete I[o],eachReverse(M,function(d,l){d[0]===o&&M.splice(l,1)}),delete u.defQueueMap[o],f&&(f.events.defined&&(I[o]=f.events),U(o))}),n},enable:function(e){var i=getOwn(v,e.id);i&&T(e).enable()},completeLoad:function(e){var i,n,o,t=getOwn(g.shim,e)||{},f=t.exports;for(F();M.length;){if(n=M.shift(),n[0]===null){if(n[0]=e,i)break;i=!0}else n[0]===e&&(i=!0);_(n)}if(u.defQueueMap={},o=getOwn(v,e),!i&&!hasProp(w,e)&&o&&!o.inited){if(g.enforceDefine&&(!f||!getGlobal(f)))return Q(e)?void 0:y(makeError("nodefine","No define call for "+e,null,[e]));_([e,t.deps||[],t.exportsFn])}z()},nameToUrl:function(e,i,n){var o,t,f,d,l,p,b,E=getOwn(g.pkgs,e);if(E&&(e=E),b=getOwn(L,e),b)return u.nameToUrl(b,i,n);if(req.jsExtRegExp.test(e))l=e+(i||"");else{for(o=g.paths,t=e.split("/"),f=t.length;f>0;f-=1)if(d=t.slice(0,f).join("/"),p=getOwn(o,d),p){isArray(p)&&(p=p[0]),t.splice(0,f,p);break}l=t.join("/"),l+=i||(/^data\:|^blob\:|\?/.test(l)||n?"":".js"),l=(l.charAt(0)==="/"||l.match(/^[\w\+\.\-]+:/)?"":g.baseUrl)+l}return g.urlArgs&&!/^blob\:/.test(l)?l+g.urlArgs(e,l):l},load:function(e,i){req.load(u,e,i)},execCb:function(e,i,n,o){return i.apply(o,n)},onScriptLoad:function(e){if(e.type==="load"||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var i=V(e);u.completeLoad(i.id)}},onScriptError:function(e){var i=V(e);if(!Q(i.id)){var n=[];return eachProp(v,function(o,t){t.indexOf("_@r")!==0&&each(o.depMaps,function(f){if(f.id===i.id)return n.push(t),!0})}),y(makeError("scripterror",'Script error for "'+i.id+(n.length?'", needed by: '+n.join(", "):'"'),e,[i.id]))}}},u.require=u.makeRequire(),u}req=requirejs=function(r,a,c,u){var h,q,g=defContextName;return!isArray(r)&&typeof r!="string"&&(q=r,isArray(a)?(r=a,a=c,c=u):r=[]),q&&q.context&&(g=q.context),h=getOwn(contexts,g),h||(h=contexts[g]=req.s.newContext(g)),q&&h.configure(q),h.require(r,a,c)},req.config=function(r){return req(r)},req.nextTick=typeof setTimeout!="undefined"?function(r){setTimeout(r,4)}:function(r){r()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts,newContext},req({}),each(["toUrl","undef","defined","specified"],function(r){req[r]=function(){var a=contexts[defContextName];return a.require[r].apply(a,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(r,a,c){var u=r.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return u.type=r.scriptType||"text/javascript",u.charset="utf-8",u.async=!0,u},req.load=function(r,a,c){var u=r&&r.config||{},h;if(isBrowser)return h=req.createNode(u,a,c),h.setAttribute("data-requirecontext",r.contextName),h.setAttribute("data-requiremodule",a),h.attachEvent&&!(h.attachEvent.toString&&h.attachEvent.toString().indexOf("[native code")<0)&&!isOpera?(useInteractive=!0,h.attachEvent("onreadystatechange",r.onScriptLoad)):(h.addEventListener("load",r.onScriptLoad,!1),h.addEventListener("error",r.onScriptError,!1)),h.src=c,u.onNodeCreated&&u.onNodeCreated(h,u,a,c),currentlyAddingScript=h,baseElement?head.insertBefore(h,baseElement):head.appendChild(h),currentlyAddingScript=null,h;if(isWebWorker)try{setTimeout(function(){},0),importScripts(c),r.completeLoad(a)}catch(q){r.onError(makeError("importscripts","importScripts failed for "+a+" at "+c,q,[a]))}};function getInteractiveScript(){return interactiveScript&&interactiveScript.readyState==="interactive"||eachReverse(scripts(),function(r){if(r.readyState==="interactive")return interactiveScript=r}),interactiveScript}isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(r){if(head||(head=r.parentNode),dataMain=r.getAttribute("data-main"),dataMain)return mainScript=dataMain,!cfg.baseUrl&&mainScript.indexOf("!")===-1&&(src=mainScript.split("/"),mainScript=src.pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),define=function(r,a,c){var u,h;typeof r!="string"&&(c=a,a=r,r=null),isArray(a)||(c=a,a=null),!a&&isFunction(c)&&(a=[],c.length&&(c.toString().replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(q,g){a.push(g)}),a=(c.length===1?["require"]:["require","exports","module"]).concat(a))),useInteractive&&(u=currentlyAddingScript||getInteractiveScript(),u&&(r||(r=u.getAttribute("data-requiremodule")),h=contexts[u.getAttribute("data-requirecontext")])),h?(h.defQueue.push([r,a,c]),h.defQueueMap[r]=!0):globalDefQueue.push([r,a,c])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)})(this,typeof setTimeout=="undefined"?void 0:setTimeout);
