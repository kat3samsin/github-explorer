(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,a){e.exports=a(28)},23:function(e,t,a){},28:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(10),c=a.n(s),l=(a(23),a(1)),i=a(2),o=a(4),u=a(3),p=a(5),h=a(6),d=a(8),m={isError:!1,isFetching:!1,data:{},headers:{},sort:"stars",order:"desc",name:"",gravatar:"",page:1,totalPage:0},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(console.log("action",t),t.type){case"GET_PROJECTS":return Object.assign({},e,{isError:!1,isFetching:!0,data:{}});case"GET_PROJECTS_SUCCESS":return Object.assign({},e,{isError:!1,isFetching:!1,data:t.data,headers:t.headers,page:t.page,totalPage:t.totalPage,sort:t.sort,order:t.order});case"GET_PROJECTS_ERROR":return Object.assign({},e,{isFetching:!1,isError:!0,data:{}});default:return e}},f=a(17),E=Object(d.c)(g,Object(d.a)(f.a)),b="",v=function(e){b=e?e.replace(/\s/g,""):b;var t={url:"https://api.github.com/search/repositories?q=user:".concat(b,"&sort=stars&order=desc"),isFirstPage:!0,isLastPage:!1,sort:"stars",order:"desc"};return function(e){return e({type:"GET_PROJECTS"}),y(e,t)}},O=function(e){var t={url:"https://api.github.com/search/repositories?q=user:".concat(b,"+").concat(e.type,":").concat(e.value,"&sort=stars&order=desc"),isFirstPage:!0,isLastPage:!1,sort:"stars",order:"desc"};return function(e){return y(e,t)}},j=function(e){return function(t,a){var r=a();if(r.headers[e]){var n={url:r.headers[e],isFirstPage:"first"===e,isLastPage:"last"===e||Number(r.page)+1===Number(r.totalPage)};return y(t,n)}}},y=function(e,t){var a=[];return fetch(t.url).then(function(e){return a=e.headers.get("link")?P(e.headers.get("link")):{},e.json()}).then(function(r){if("Not Found"===r.message)throw new Error("No such user found!!");var n=0===Object.keys(a).length?1:t.isLastPage?k(a):C(a);e(function(e){return{type:"GET_PROJECTS_SUCCESS",data:e.data,headers:e.headers,page:e.page,totalPage:e.totalPage,sort:e.sort,order:e.order}}({data:r.items,headers:a,page:t.isFirstPage?1:t.isLastPage?n:k(a),totalPage:n,order:t.order,sort:t.sort}))}).catch(function(t){console.log("callApi",t.toString()),e({type:"GET_PROJECTS_ERROR"})})},k=function(e){return e.next?Number(e.next.match(/page=(\d+)/)[1])-1:Number(e.prev.match(/page=(\d+)/)[1])+1},C=function(e){return e.last?e.last.match(/page=(\d+)/)[1]:null},P=function(e){var t={};return e.split(",").forEach(function(e){var a=e.split(";");t[a[1].match(/"(.*)"/)[1]]=a[0].match("<(.*)>")[1]}),t.first=t.next?t.next.replace(/page=\d+/,"page=1"):t.prev.replace(/page=\d+/,"page=1"),t},F=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(n)))).handleSubmit=function(e){e.preventDefault();var t=a.getSearch?a.getSearch.value:"",r={id:new Date,searchKey:t};a.props.search(r.searchKey)},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement("form",{onSubmit:this.handleSubmit},n.a.createElement("input",{className:"org",required:!0,type:"text",ref:function(t){return e.getSearch=t},placeholder:"Enter organization name"}),n.a.createElement("br",null),n.a.createElement("button",{className:"button"},"Search")))}}]),t}(r.Component);var S=Object(h.b)(null,function(e){return{search:function(t){e(v(t))}}})(F),N=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return this.props&&this.props.project?n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("a",{href:this.props.project.html_url+"/branches/all"},this.props.project.name)),n.a.createElement("td",null,this.props.project.language),n.a.createElement("td",null,this.props.project.stargazers_count.toLocaleString()),n.a.createElement("td",null,this.props.project.forks.toLocaleString())):null}}]),t}(r.Component),w=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"handleClick",value:function(e){this.props.turnPage(e)}},{key:"render",value:function(){return 1===this.props.totalPage?n.a.createElement("div",{className:"pagination"},"Page ",this.props.page," of ",this.props.totalPage):n.a.createElement("div",{className:"pagination"},"Page ",this.props.page," of ",this.props.totalPage,"\xa0\xa0",n.a.createElement("span",{id:"first",className:"link",onClick:this.handleClick.bind(this,"first")},"<<"),"\xa0",n.a.createElement("span",{id:"prev",className:"link",onClick:this.handleClick.bind(this,"prev")},"<"),"\xa0",n.a.createElement("span",{id:"next",className:"link",onClick:this.handleClick.bind(this,"next")},">"),"\xa0",n.a.createElement("span",{id:"last",className:"link",onClick:this.handleClick.bind(this,"last")},">>"))}}]),t}(r.Component);var R=Object(h.b)(function(e){return e},function(e){return{turnPage:function(t){e(j(t))}}})(w),L=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(n)))).applyFilters=function(){var e={type:"language",value:a.getFilter?encodeURIComponent(a.getFilter.value.toLowerCase()):""};a.props.applyFilters(e)},a.clearFilters=function(){a.props.clearFilters(),a.getFilter.value=""},a.handleOnClick=function(e){13===e.keyCode&&a.applyFilters()},a}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"filterform"},n.a.createElement("input",{className:"filter",onKeyUp:this.handleOnClick,required:!0,type:"text",ref:function(t){return e.getFilter=t},placeholder:"Enter language"}),"\xa0",n.a.createElement("button",{id:"applyFilters",className:"filterbutton",onClick:this.applyFilters},"APPLY"),"\xa0",n.a.createElement("button",{id:"clearFilters",className:"filterbutton",onClick:this.clearFilters},"CLEAR"))}}]),t}(r.Component);var x=Object(h.b)(null,function(e){return{applyFilters:function(t){e(O(t))},clearFilters:function(){e(v())}}})(L),T=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"sort",value:function(e){this.props.dispatch(function(e){var t=E.getState(),a=t.order||"desc";t.sort===e&&(a="asc"===a?"desc":"asc");var r={url:"https://api.github.com/search/repositories?q=user:".concat(b,"&sort=").concat(e,"&order=").concat(a),isFirstPage:!0,isLastPage:!1,sort:e,order:a};return function(e){return y(e,r)}}(e))}},{key:"render",value:function(){return n.a.createElement("div",null,this.props.isFetching?n.a.createElement("h3",null,"Loading..."):null,this.props.isError?n.a.createElement("h3",null,"Nada."):null,this.props.data&&this.props.data.length>0?n.a.createElement("div",null,n.a.createElement("h2",{className:"title"},"Repositories"),n.a.createElement("table",{width:"100%"},n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement(x,null)),n.a.createElement("td",null,n.a.createElement(R,null))))),n.a.createElement("table",{width:"100%"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("td",null,"Name"),n.a.createElement("td",null,"Language"),n.a.createElement("td",{onClick:this.sort.bind(this,"stars")},"Stars","stars"===this.props.sort?"desc"===this.props.order?"\u25bc":"\u25b2":"\u25b2\u25bc"),n.a.createElement("td",{onClick:this.sort.bind(this,"forks")},"Forks","forks"===this.props.sort?"desc"===this.props.order?"\u25bc":"\u25b2":"\u25b2\u25bc"))),n.a.createElement("tbody",null,this.props.data.map(function(e){return n.a.createElement(N,{key:e.id,project:e})}))),n.a.createElement(R,null)):null)}}]),t}(r.Component),_=Object(h.b)(function(e){return e})(T),G=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("a",{href:"https://github.com"},n.a.createElement("img",{src:"https://image.flaticon.com/icons/svg/25/25231.svg",alt:"GitHub",width:"200px",height:"200px"})),n.a.createElement("h1",{className:"title"},"GitHub Repository Explorer"),n.a.createElement(S,null),n.a.createElement(_,null))}}]),t}(r.Component);c.a.render(n.a.createElement(h.a,{store:E},n.a.createElement(G,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.a3f449f4.chunk.js.map