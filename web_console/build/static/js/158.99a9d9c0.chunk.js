"use strict";(self.webpackChunkweb_console=self.webpackChunkweb_console||[]).push([[158],{914:function(e,t,n){var a=n(9752);t.Z=a.Z},6106:function(e,t,n){var a=n(7545);t.Z=a.Z},141:function(e,t,n){n.d(t,{Z:function(){return ee}});var a=n(7462),r=n(4942),o=n(2791),i=n(9439),c=n(1002),l=n(4925),u=n(1413),s=n(1694),d=n.n(s),f=n(5501),v=n(3786),m=n(5179),b=n(3433),h=n(5314),p=n(8829);function y(e){var t=(0,o.useRef)(),n=(0,o.useRef)(!1);return(0,o.useEffect)((function(){return function(){n.current=!0,h.Z.cancel(t.current)}}),[]),function(){for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];n.current||(h.Z.cancel(t.current),t.current=(0,h.Z)((function(){e.apply(void 0,r)})))}}var Z=n(1354);function g(e,t){var n,a=e.prefixCls,i=e.id,c=e.active,l=e.tab,u=l.key,s=l.tab,f=l.disabled,v=l.closeIcon,m=e.closable,b=e.renderWrapper,h=e.removeAriaLabel,p=e.editable,y=e.onClick,g=e.onRemove,E=e.onFocus,k=e.style,w="".concat(a,"-tab");o.useEffect((function(){return g}),[]);var x=p&&!1!==m&&!f;function C(e){f||y(e)}var N=o.createElement("div",{key:u,ref:t,className:d()(w,(n={},(0,r.Z)(n,"".concat(w,"-with-remove"),x),(0,r.Z)(n,"".concat(w,"-active"),c),(0,r.Z)(n,"".concat(w,"-disabled"),f),n)),style:k,onClick:C},o.createElement("div",{role:"tab","aria-selected":c,id:i&&"".concat(i,"-tab-").concat(u),className:"".concat(w,"-btn"),"aria-controls":i&&"".concat(i,"-panel-").concat(u),"aria-disabled":f,tabIndex:f?null:0,onClick:function(e){e.stopPropagation(),C(e)},onKeyDown:function(e){[Z.Z.SPACE,Z.Z.ENTER].includes(e.which)&&(e.preventDefault(),C(e))},onFocus:E},s),x&&o.createElement("button",{type:"button","aria-label":h||"remove",tabIndex:0,className:"".concat(w,"-remove"),onClick:function(e){var t;e.stopPropagation(),(t=e).preventDefault(),t.stopPropagation(),p.onEdit("remove",{key:u,event:t})}},v||p.removeIcon||"\xd7"));return b?b(N):N}var E=o.forwardRef(g),k={width:0,height:0,left:0,top:0};var w={width:0,height:0,left:0,top:0,right:0};var x=n(1608),C=n(3241);function N(e,t){var n=e.prefixCls,a=e.editable,r=e.locale,i=e.style;return a&&!1!==a.showAdd?o.createElement("button",{ref:t,type:"button",className:"".concat(n,"-nav-add"),style:i,"aria-label":(null===r||void 0===r?void 0:r.addAriaLabel)||"Add tab",onClick:function(e){a.onEdit("add",{event:e})}},a.addIcon||"+"):null}var T=o.forwardRef(N);function I(e,t){var n=e.prefixCls,a=e.id,c=e.tabs,l=e.locale,u=e.mobile,s=e.moreIcon,f=void 0===s?"More":s,v=e.moreTransitionName,m=e.style,b=e.className,h=e.editable,p=e.tabBarGutter,y=e.rtl,g=e.removeAriaLabel,E=e.onTabClick,k=(0,o.useState)(!1),w=(0,i.Z)(k,2),N=w[0],I=w[1],P=(0,o.useState)(null),S=(0,i.Z)(P,2),R=S[0],M=S[1],L="".concat(a,"-more-popup"),A="".concat(n,"-dropdown"),B=null!==R?"".concat(L,"-").concat(R):null,D=null===l||void 0===l?void 0:l.dropdownAriaLabel;var K=o.createElement(x.ZP,{onClick:function(e){var t=e.key,n=e.domEvent;E(t,n),I(!1)},id:L,tabIndex:-1,role:"listbox","aria-activedescendant":B,selectedKeys:[R],"aria-label":void 0!==D?D:"expanded dropdown"},c.map((function(e){var t=h&&!1!==e.closable&&!e.disabled;return o.createElement(x.sN,{key:e.key,id:"".concat(L,"-").concat(e.key),role:"option","aria-controls":a&&"".concat(a,"-panel-").concat(e.key),disabled:e.disabled},o.createElement("span",null,e.tab),t&&o.createElement("button",{type:"button","aria-label":g||"remove",tabIndex:0,className:"".concat(A,"-menu-item-remove"),onClick:function(t){var n,a;t.stopPropagation(),n=t,a=e.key,n.preventDefault(),n.stopPropagation(),h.onEdit("remove",{key:a,event:n})}},e.closeIcon||h.removeIcon||"\xd7"))})));function O(e){for(var t=c.filter((function(e){return!e.disabled})),n=t.findIndex((function(e){return e.key===R}))||0,a=t.length,r=0;r<a;r+=1){var o=t[n=(n+e+a)%a];if(!o.disabled)return void M(o.key)}}(0,o.useEffect)((function(){var e=document.getElementById(B);e&&e.scrollIntoView&&e.scrollIntoView(!1)}),[R]),(0,o.useEffect)((function(){N||M(null)}),[N]);var j=(0,r.Z)({},y?"marginRight":"marginLeft",p);c.length||(j.visibility="hidden",j.order=1);var W=d()((0,r.Z)({},"".concat(A,"-rtl"),y)),q=u?null:o.createElement(C.Z,{prefixCls:A,overlay:K,trigger:["hover"],visible:N,transitionName:v,onVisibleChange:I,overlayClassName:W,mouseEnterDelay:.1,mouseLeaveDelay:.1},o.createElement("button",{type:"button",className:"".concat(n,"-nav-more"),style:j,tabIndex:-1,"aria-hidden":"true","aria-haspopup":"listbox","aria-controls":L,id:"".concat(a,"-more"),"aria-expanded":N,onKeyDown:function(e){var t=e.which;if(N)switch(t){case Z.Z.UP:O(-1),e.preventDefault();break;case Z.Z.DOWN:O(1),e.preventDefault();break;case Z.Z.ESC:I(!1);break;case Z.Z.SPACE:case Z.Z.ENTER:null!==R&&E(R,e)}else[Z.Z.DOWN,Z.Z.SPACE,Z.Z.ENTER].includes(t)&&(I(!0),e.preventDefault())}},f));return o.createElement("div",{className:d()("".concat(n,"-nav-operations"),b),style:m,ref:t},q,o.createElement(T,{prefixCls:n,locale:l,editable:h}))}var P=o.memo(o.forwardRef(I),(function(e,t){return t.tabMoving})),S=(0,o.createContext)(null),R=Math.pow(.995,20);function M(e,t){var n=o.useRef(e),a=o.useState({}),r=(0,i.Z)(a,2)[1];return[n.current,function(e){var a="function"===typeof e?e(n.current):e;a!==n.current&&t(a,n.current),n.current=a,r({})}]}var L=function(e){var t,n=e.position,a=e.prefixCls,r=e.extra;if(!r)return null;var i={};return r&&"object"===(0,c.Z)(r)&&!o.isValidElement(r)?i=r:i.right=r,"right"===n&&(t=i.right),"left"===n&&(t=i.left),t?o.createElement("div",{className:"".concat(a,"-extra-content")},t):null};function A(e,t){var n,c=o.useContext(S),l=c.prefixCls,s=c.tabs,f=e.className,v=e.style,m=e.id,Z=e.animated,g=e.activeKey,x=e.rtl,C=e.extra,N=e.editable,I=e.locale,A=e.tabPosition,B=e.tabBarGutter,D=e.children,K=e.onTabClick,O=e.onTabScroll,j=(0,o.useRef)(),W=(0,o.useRef)(),q=(0,o.useRef)(),V=(0,o.useRef)(),_=function(){var e=(0,o.useRef)(new Map);return[function(t){return e.current.has(t)||e.current.set(t,o.createRef()),e.current.get(t)},function(t){e.current.delete(t)}]}(),z=(0,i.Z)(_,2),G=z[0],H=z[1],Y="top"===A||"bottom"===A,F=M(0,(function(e,t){Y&&O&&O({direction:e>t?"left":"right"})})),X=(0,i.Z)(F,2),U=X[0],J=X[1],Q=M(0,(function(e,t){!Y&&O&&O({direction:e>t?"top":"bottom"})})),$=(0,i.Z)(Q,2),ee=$[0],te=$[1],ne=(0,o.useState)(0),ae=(0,i.Z)(ne,2),re=ae[0],oe=ae[1],ie=(0,o.useState)(0),ce=(0,i.Z)(ie,2),le=ce[0],ue=ce[1],se=(0,o.useState)(null),de=(0,i.Z)(se,2),fe=de[0],ve=de[1],me=(0,o.useState)(null),be=(0,i.Z)(me,2),he=be[0],pe=be[1],ye=(0,o.useState)(0),Ze=(0,i.Z)(ye,2),ge=Ze[0],Ee=Ze[1],ke=(0,o.useState)(0),we=(0,i.Z)(ke,2),xe=we[0],Ce=we[1],Ne=function(e){var t=(0,o.useRef)([]),n=(0,o.useState)({}),a=(0,i.Z)(n,2)[1],r=(0,o.useRef)("function"===typeof e?e():e),c=y((function(){var e=r.current;t.current.forEach((function(t){e=t(e)})),t.current=[],r.current=e,a({})}));return[r.current,function(e){t.current.push(e),c()}]}(new Map),Te=(0,i.Z)(Ne,2),Ie=Te[0],Pe=Te[1],Se=function(e,t,n){return(0,o.useMemo)((function(){for(var n,a=new Map,r=t.get(null===(n=e[0])||void 0===n?void 0:n.key)||k,o=r.left+r.width,i=0;i<e.length;i+=1){var c,l=e[i].key,s=t.get(l);s||(s=t.get(null===(c=e[i-1])||void 0===c?void 0:c.key)||k);var d=a.get(l)||(0,u.Z)({},s);d.right=o-d.left-d.width,a.set(l,d)}return a}),[e.map((function(e){return e.key})).join("_"),t,n])}(s,Ie,re),Re="".concat(l,"-nav-operations-hidden"),Me=0,Le=0;function Ae(e){return e<Me?Me:e>Le?Le:e}Y?x?(Me=0,Le=Math.max(0,re-fe)):(Me=Math.min(0,fe-re),Le=0):(Me=Math.min(0,he-le),Le=0);var Be=(0,o.useRef)(),De=(0,o.useState)(),Ke=(0,i.Z)(De,2),Oe=Ke[0],je=Ke[1];function We(){je(Date.now())}function qe(){window.clearTimeout(Be.current)}function Ve(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=Se.get(e)||{width:0,height:0,left:0,right:0,top:0};if(Y){var n=U;x?t.right<U?n=t.right:t.right+t.width>U+fe&&(n=t.right+t.width-fe):t.left<-U?n=-t.left:t.left+t.width>-U+fe&&(n=-(t.left+t.width-fe)),te(0),J(Ae(n))}else{var a=ee;t.top<-ee?a=-t.top:t.top+t.height>-ee+he&&(a=-(t.top+t.height-he)),J(0),te(Ae(a))}}!function(e,t){var n=(0,o.useState)(),a=(0,i.Z)(n,2),r=a[0],c=a[1],l=(0,o.useState)(0),u=(0,i.Z)(l,2),s=u[0],d=u[1],f=(0,o.useState)(0),v=(0,i.Z)(f,2),m=v[0],b=v[1],h=(0,o.useState)(),p=(0,i.Z)(h,2),y=p[0],Z=p[1],g=(0,o.useRef)(),E=(0,o.useRef)(),k=(0,o.useRef)(null);k.current={onTouchStart:function(e){var t=e.touches[0],n=t.screenX,a=t.screenY;c({x:n,y:a}),window.clearInterval(g.current)},onTouchMove:function(e){if(r){e.preventDefault();var n=e.touches[0],a=n.screenX,o=n.screenY;c({x:a,y:o});var i=a-r.x,l=o-r.y;t(i,l);var u=Date.now();d(u),b(u-s),Z({x:i,y:l})}},onTouchEnd:function(){if(r&&(c(null),Z(null),y)){var e=y.x/m,n=y.y/m,a=Math.abs(e),o=Math.abs(n);if(Math.max(a,o)<.1)return;var i=e,l=n;g.current=window.setInterval((function(){Math.abs(i)<.01&&Math.abs(l)<.01?window.clearInterval(g.current):t(20*(i*=R),20*(l*=R))}),20)}},onWheel:function(e){var n=e.deltaX,a=e.deltaY,r=0,o=Math.abs(n),i=Math.abs(a);o===i?r="x"===E.current?n:a:o>i?(r=n,E.current="x"):(r=a,E.current="y"),t(-r,-r)&&e.preventDefault()}},o.useEffect((function(){function t(e){k.current.onTouchMove(e)}function n(e){k.current.onTouchEnd(e)}return document.addEventListener("touchmove",t,{passive:!1}),document.addEventListener("touchend",n,{passive:!1}),e.current.addEventListener("touchstart",(function(e){k.current.onTouchStart(e)}),{passive:!1}),e.current.addEventListener("wheel",(function(e){k.current.onWheel(e)})),function(){document.removeEventListener("touchmove",t),document.removeEventListener("touchend",n)}}),[])}(j,(function(e,t){function n(e,t){e((function(e){return Ae(e+t)}))}if(Y){if(fe>=re)return!1;n(J,e)}else{if(he>=le)return!1;n(te,t)}return qe(),We(),!0})),(0,o.useEffect)((function(){return qe(),Oe&&(Be.current=window.setTimeout((function(){je(0)}),100)),qe}),[Oe]);var _e=function(e,t,n,a,r){var i,c,l,u=r.tabs,s=r.tabPosition,d=r.rtl;["top","bottom"].includes(s)?(i="width",c=d?"right":"left",l=Math.abs(t.left)):(i="height",c="top",l=-t.top);var f=t[i],v=n[i],m=a[i],b=f;return v+m>f&&v<f&&(b=f-m),(0,o.useMemo)((function(){if(!u.length)return[0,0];for(var t=u.length,n=t,a=0;a<t;a+=1){var r=e.get(u[a].key)||w;if(r[c]+r[i]>l+b){n=a-1;break}}for(var o=0,s=t-1;s>=0;s-=1)if((e.get(u[s].key)||w)[c]<l){o=s+1;break}return[o,n]}),[e,l,b,s,u.map((function(e){return e.key})).join("_"),d])}(Se,{width:fe,height:he,left:U,top:ee},{width:re,height:le},{width:ge,height:xe},(0,u.Z)((0,u.Z)({},e),{},{tabs:s})),ze=(0,i.Z)(_e,2),Ge=ze[0],He=ze[1],Ye={};"top"===A||"bottom"===A?Ye[x?"marginRight":"marginLeft"]=B:Ye.marginTop=B;var Fe=s.map((function(e,t){var n=e.key;return o.createElement(E,{id:m,prefixCls:l,key:n,tab:e,style:0===t?void 0:Ye,closable:e.closable,editable:N,active:n===g,renderWrapper:D,removeAriaLabel:null===I||void 0===I?void 0:I.removeAriaLabel,ref:G(n),onClick:function(e){K(n,e)},onRemove:function(){H(n)},onFocus:function(){Ve(n),We(),j.current&&(x||(j.current.scrollLeft=0),j.current.scrollTop=0)}})})),Xe=y((function(){var e,t,n,a,r,o,i=(null===(e=j.current)||void 0===e?void 0:e.offsetWidth)||0,c=(null===(t=j.current)||void 0===t?void 0:t.offsetHeight)||0,l=(null===(n=V.current)||void 0===n?void 0:n.offsetWidth)||0,u=(null===(a=V.current)||void 0===a?void 0:a.offsetHeight)||0;ve(i),pe(c),Ee(l),Ce(u);var d=((null===(r=W.current)||void 0===r?void 0:r.offsetWidth)||0)-l,f=((null===(o=W.current)||void 0===o?void 0:o.offsetHeight)||0)-u;oe(d),ue(f),Pe((function(){var e=new Map;return s.forEach((function(t){var n=t.key,a=G(n).current;a&&e.set(n,{width:a.offsetWidth,height:a.offsetHeight,left:a.offsetLeft,top:a.offsetTop})})),e}))})),Ue=s.slice(0,Ge),Je=s.slice(He+1),Qe=[].concat((0,b.Z)(Ue),(0,b.Z)(Je)),$e=(0,o.useState)(),et=(0,i.Z)($e,2),tt=et[0],nt=et[1],at=Se.get(g),rt=(0,o.useRef)();function ot(){h.Z.cancel(rt.current)}(0,o.useEffect)((function(){var e={};return at&&(Y?(x?e.right=at.right:e.left=at.left,e.width=at.width):(e.top=at.top,e.height=at.height)),ot(),rt.current=(0,h.Z)((function(){nt(e)})),ot}),[at,Y,x]),(0,o.useEffect)((function(){Ve()}),[g,at,Se,Y]),(0,o.useEffect)((function(){Xe()}),[x,B,g,s.map((function(e){return e.key})).join("_")]);var it,ct,lt,ut,st=!!Qe.length,dt="".concat(l,"-nav-wrap");return Y?x?(ct=U>0,it=U+fe<re):(it=U<0,ct=-U+fe<re):(lt=ee<0,ut=-ee+he<le),o.createElement("div",{ref:t,role:"tablist",className:d()("".concat(l,"-nav"),f),style:v,onKeyDown:function(){We()}},o.createElement(L,{position:"left",extra:C,prefixCls:l}),o.createElement(p.Z,{onResize:Xe},o.createElement("div",{className:d()(dt,(n={},(0,r.Z)(n,"".concat(dt,"-ping-left"),it),(0,r.Z)(n,"".concat(dt,"-ping-right"),ct),(0,r.Z)(n,"".concat(dt,"-ping-top"),lt),(0,r.Z)(n,"".concat(dt,"-ping-bottom"),ut),n)),ref:j},o.createElement(p.Z,{onResize:Xe},o.createElement("div",{ref:W,className:"".concat(l,"-nav-list"),style:{transform:"translate(".concat(U,"px, ").concat(ee,"px)"),transition:Oe?"none":void 0}},Fe,o.createElement(T,{ref:V,prefixCls:l,locale:I,editable:N,style:(0,u.Z)((0,u.Z)({},0===Fe.length?void 0:Ye),{},{visibility:st?"hidden":null})}),o.createElement("div",{className:d()("".concat(l,"-ink-bar"),(0,r.Z)({},"".concat(l,"-ink-bar-animated"),Z.inkBar)),style:tt}))))),o.createElement(P,(0,a.Z)({},e,{removeAriaLabel:null===I||void 0===I?void 0:I.removeAriaLabel,ref:q,prefixCls:l,tabs:Qe,className:!st&&Re,tabMoving:!!Oe})),o.createElement(L,{position:"right",extra:C,prefixCls:l}))}var B=o.forwardRef(A);function D(e){var t=e.id,n=e.activeKey,a=e.animated,i=e.tabPosition,c=e.rtl,l=e.destroyInactiveTabPane,u=o.useContext(S),s=u.prefixCls,f=u.tabs,v=a.tabPane,m=f.findIndex((function(e){return e.key===n}));return o.createElement("div",{className:d()("".concat(s,"-content-holder"))},o.createElement("div",{className:d()("".concat(s,"-content"),"".concat(s,"-content-").concat(i),(0,r.Z)({},"".concat(s,"-content-animated"),v)),style:m&&v?(0,r.Z)({},c?"marginRight":"marginLeft","-".concat(m,"00%")):null},f.map((function(e){return o.cloneElement(e.node,{key:e.key,prefixCls:s,tabKey:e.key,id:t,animated:v,active:e.key===n,destroyInactiveTabPane:l})}))))}function K(e){var t=e.prefixCls,n=e.forceRender,a=e.className,r=e.style,c=e.id,l=e.active,s=e.animated,f=e.destroyInactiveTabPane,v=e.tabKey,m=e.children,b=o.useState(n),h=(0,i.Z)(b,2),p=h[0],y=h[1];o.useEffect((function(){l?y(!0):f&&y(!1)}),[l,f]);var Z={};return l||(s?(Z.visibility="hidden",Z.height=0,Z.overflowY="hidden"):Z.display="none"),o.createElement("div",{id:c&&"".concat(c,"-panel-").concat(v),role:"tabpanel",tabIndex:l?0:-1,"aria-labelledby":c&&"".concat(c,"-tab-").concat(v),"aria-hidden":!l,style:(0,u.Z)((0,u.Z)({},Z),r),className:d()("".concat(t,"-tabpane"),l&&"".concat(t,"-tabpane-active"),a)},(l||p||n)&&m)}var O=["id","prefixCls","className","children","direction","activeKey","defaultActiveKey","editable","animated","tabPosition","tabBarGutter","tabBarStyle","tabBarExtraContent","locale","moreIcon","moreTransitionName","destroyInactiveTabPane","renderTabBar","onChange","onTabClick","onTabScroll"],j=0;function W(e,t){var n,s,b=e.id,h=e.prefixCls,p=void 0===h?"rc-tabs":h,y=e.className,Z=e.children,g=e.direction,E=e.activeKey,k=e.defaultActiveKey,w=e.editable,x=e.animated,C=void 0===x?{inkBar:!0,tabPane:!1}:x,N=e.tabPosition,T=void 0===N?"top":N,I=e.tabBarGutter,P=e.tabBarStyle,R=e.tabBarExtraContent,M=e.locale,L=e.moreIcon,A=e.moreTransitionName,K=e.destroyInactiveTabPane,W=e.renderTabBar,q=e.onChange,V=e.onTabClick,_=e.onTabScroll,z=(0,l.Z)(e,O),G=function(e){return(0,f.Z)(e).map((function(e){if(o.isValidElement(e)){var t=void 0!==e.key?String(e.key):void 0;return(0,u.Z)((0,u.Z)({key:t},e.props),{},{node:e})}return null})).filter((function(e){return e}))}(Z),H="rtl"===g;s=!1===C?{inkBar:!1,tabPane:!1}:!0===C?{inkBar:!0,tabPane:!0}:(0,u.Z)({inkBar:!0,tabPane:!1},"object"===(0,c.Z)(C)?C:{});var Y=(0,o.useState)(!1),F=(0,i.Z)(Y,2),X=F[0],U=F[1];(0,o.useEffect)((function(){U((0,v.Z)())}),[]);var J=(0,m.Z)((function(){var e;return null===(e=G[0])||void 0===e?void 0:e.key}),{value:E,defaultValue:k}),Q=(0,i.Z)(J,2),$=Q[0],ee=Q[1],te=(0,o.useState)((function(){return G.findIndex((function(e){return e.key===$}))})),ne=(0,i.Z)(te,2),ae=ne[0],re=ne[1];(0,o.useEffect)((function(){var e,t=G.findIndex((function(e){return e.key===$}));-1===t&&(t=Math.max(0,Math.min(ae,G.length-1)),ee(null===(e=G[t])||void 0===e?void 0:e.key));re(t)}),[G.map((function(e){return e.key})).join("_"),$,ae]);var oe=(0,m.Z)(null,{value:b}),ie=(0,i.Z)(oe,2),ce=ie[0],le=ie[1],ue=T;X&&!["left","right"].includes(T)&&(ue="top"),(0,o.useEffect)((function(){b||(le("rc-tabs-".concat(j)),j+=1)}),[]);var se,de={id:ce,activeKey:$,animated:s,tabPosition:ue,rtl:H,mobile:X},fe=(0,u.Z)((0,u.Z)({},de),{},{editable:w,locale:M,moreIcon:L,moreTransitionName:A,tabBarGutter:I,onTabClick:function(e,t){null===V||void 0===V||V(e,t);var n=e!==$;ee(e),n&&(null===q||void 0===q||q(e))},onTabScroll:_,extra:R,style:P,panes:Z});return se=W?W(fe,B):o.createElement(B,fe),o.createElement(S.Provider,{value:{tabs:G,prefixCls:p}},o.createElement("div",(0,a.Z)({ref:t,id:b,className:d()(p,"".concat(p,"-").concat(ue),(n={},(0,r.Z)(n,"".concat(p,"-mobile"),X),(0,r.Z)(n,"".concat(p,"-editable"),w),(0,r.Z)(n,"".concat(p,"-rtl"),H),n),y)},z),se,o.createElement(D,(0,a.Z)({destroyInactiveTabPane:K},de,{animated:s}))))}var q=o.forwardRef(W);q.TabPane=K;var V=q,_=n(5033),z={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"defs",attrs:{},children:[{tag:"style",attrs:{}}]},{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"},G=n(4291),H=function(e,t){return o.createElement(G.Z,(0,u.Z)((0,u.Z)({},e),{},{ref:t,icon:z}))};H.displayName="PlusOutlined";var Y=o.forwardRef(H),F=n(732),X=n(4824),U=n(9077),J=n(1815),Q=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n};function $(e){var t,n=e.type,i=e.className,c=e.size,l=e.onEdit,u=e.hideAdd,s=e.centered,f=e.addIcon,v=Q(e,["type","className","size","onEdit","hideAdd","centered","addIcon"]),m=v.prefixCls,b=v.moreIcon,h=void 0===b?o.createElement(_.Z,null):b,p=o.useContext(U.E_),y=p.getPrefixCls,Z=p.direction,g=y("tabs",m);"editable-card"===n&&(t={onEdit:function(e,t){var n=t.key,a=t.event;null===l||void 0===l||l("add"===e?a:n,e)},removeIcon:o.createElement(F.Z,null),addIcon:f||o.createElement(Y,null),showAdd:!0!==u});var E=y();return(0,X.Z)(!("onPrevClick"in v)&&!("onNextClick"in v),"Tabs","`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead."),o.createElement(J.Z.Consumer,null,(function(e){var l,u=void 0!==c?c:e;return o.createElement(V,(0,a.Z)({direction:Z,moreTransitionName:"".concat(E,"-slide-up")},v,{className:d()((l={},(0,r.Z)(l,"".concat(g,"-").concat(u),u),(0,r.Z)(l,"".concat(g,"-card"),["card","editable-card"].includes(n)),(0,r.Z)(l,"".concat(g,"-editable-card"),"editable-card"===n),(0,r.Z)(l,"".concat(g,"-centered"),s),l),i),editable:t,moreIcon:h,prefixCls:g}))}))}$.TabPane=K;var ee=$}}]);
//# sourceMappingURL=158.99a9d9c0.chunk.js.map