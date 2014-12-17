"use strict";angular.module("log",["toastr"]),angular.module("log").constant("WARNING_MESSAGES",{}),angular.module("log").constant("SUCCESS_MESSAGES",{}),angular.module("log").constant("INFO_MESSAGES",{}),angular.module("log").constant("ERROR_MESSAGES",{stateChangeError:{title:"Application error",message:"Could not load page",remedy:"Please try that again"}}),angular.module("packing.item",[]),angular.module("packing.item").config(["$stateProvider",function(t){t.state("packing.item",{url:"/:id",templateUrl:"app/packing/item/item.html",controller:"PackingItemCtrl",controllerAs:"packingItemCtrl",resolve:{packingLists:["$stateParams","packingItemService",function(t,e){return e.get(t.id)}]}})}]),angular.module("packing.item").service("packingItemService",["couchdb","couchUtil",function(t,e){function n(t){function e(t){return 3===t.key.length}function n(t){var e=t.key[2];a[e]={productID:e,expectedQty:t.value}}return t.rows.filter(e).forEach(n),a}var a={};this.get=function(a){var r={ddoc:"daily-deliveries",view:"delivery-packing-list",group:!0},i=e.join(a);return angular.extend(r,i),t.view(r).$promise.then(n)},this.isComplete=function(t){var e=!1;t.packedQty>=t.expectedQty&&(e=!0),a[t.productID].complete=e},this.max=function(t){t.packedQty=t.expectedQty,a[t.productID].complete=!0}}]),angular.module("packing.item").controller("PackingItemCtrl",["$stateParams","packingLists","packingItemService",function(t,e,n){this.name=t.id,this.packingLists=e,this.isComplete=n.isComplete,this.max=n.max}]),angular.module("packing.all",[]),angular.module("packing.all").config(["$stateProvider",function(t){t.state("packing.all",{url:"/all",templateUrl:"app/packing/all/all.html",controller:"PackingAllCtrl",controllerAs:"packingAllCtrl",resolve:{packings:["packingAllService",function(t){return t.all()}]}})}]),angular.module("packing.all").service("packingAllService",["user","couchdb","couchUtil",function(t,e,n){this.all=function(){var a={ddoc:"daily-deliveries",view:"by-driver",reduce:!1},r=n.key(t.email);return angular.extend(a,r),e.view(a).$promise.then(n.pluckIDs)}}]),angular.module("packing.all").controller("PackingAllCtrl",["packings",function(t){this.packings=t}]),angular.module("user",[]),angular.module("user").constant("user",{email:"abdullahi.ahmed@example.com"}),angular.module("navbar",[]),angular.module("navbar").service("navbarService",["$state",function(t){this.get=function(){function e(t){return!t.abstract&&t.data&&t.data.label}function n(t){return-1===t.name.indexOf(".")}function a(t){return{name:t.name,label:t.data.label}}var r=t.get();return r.filter(e).filter(n).map(a)}}]),angular.module("navbar").controller("NavbarCtrl",["config","navbarService",function(t,e){this.name=t.name,this.items=e.get()}]),angular.module("log").service("log",["$log","toastr","ERROR_MESSAGES","WARNING_MESSAGES","INFO_MESSAGES","SUCCESS_MESSAGES",function(t,e,n,a,r,i){function l(n,a,r,i,l){i=i||{},angular.isObject(a)||(a={log:a,toastr:a});var o=r[n]||{message:""},c=[o.message];return l&&c.push(l),("error"===a.log||"warn"===a.log)&&c.push(o.remedy),c=c.join(". ")+".",t[a.log](c,o,i),e[a.toastr](c,o.title)}this.error=function(t,e,a){return l(t,"error",n,e,a)},this.warning=function(t,e,n){var r={log:"warn",toastr:"warning"};return l(t,r,a,e,n)},this.info=function(t,e,n){return l(t,"info",r,e,n)},this.success=function(t,e,n){var a={log:"log",toastr:"success"};return l(t,a,i,e,n)}}]),angular.module("footer",[]),angular.module("footer").controller("FooterCtrl",["config",function(t){this.year=(new Date).getFullYear(),this.author=t.author,this.version=t.version}]),angular.module("couchdb",["ngResource"]),angular.module("couchdb").service("couchUtil",function(){function t(t,e){function n(t){return t[e]}return t.rows.map(n)}this.key=function(t){return{startkey:JSON.stringify(t),endkey:JSON.stringify(t+"￰")}},this.join=function(t){return{startkey:JSON.stringify([t]),endkey:JSON.stringify([t,2])}},this.pluckIDs=function(e){return t(e,"id")},this.pluckValues=function(e){return t(e,"value")},this.pluckDocs=function(e){return t(e,"doc")}}),angular.module("couchdb").factory("couchdb",["$resource","config",function(t,e){return t(e.db,{},{view:{method:"GET",url:e.db+"/_design/:ddoc/_view/:view"}})}]),angular.module("packing",["user","couchdb","packing.all","packing.item"]),angular.module("packing").config(["$stateProvider",function(t){t.state("packing",{url:"/packing",parent:"index",templateUrl:"app/packing/packing.html",controller:"PackingCtrl",controllerAs:"packingCtrl",resolve:{count:["packingService",function(t){return t.count()}]},data:{label:"Packing"}})}]),angular.module("packing").service("packingService",["user","couchdb","couchUtil",function(t,e,n){this.count=function(){var a={ddoc:"daily-deliveries",view:"by-driver"},r=n.key(t.email);return angular.extend(a,r),e.view(a).$promise.then(n.pluckValues)}}]),angular.module("packing").controller("PackingCtrl",["count",function(t){this.count=t[0]||0}]),angular.module("home",[]),angular.module("home").config(["$stateProvider",function(t){t.state("home",{url:"/",parent:"index",templateUrl:"app/home/home.html",data:{label:"Home"}})}]),angular.module("directDelivery",["ui.router","ui.bootstrap","config","navbar","footer","home","log","packing"]),angular.module("directDelivery").config(["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/"),t.state("root",{"abstract":!0,views:{root:{templateUrl:"app/index.html",controller:"IndexCtrl"}}}).state("index",{parent:"root","abstract":!0,views:{header:{templateUrl:"components/navbar/navbar.html",controller:"NavbarCtrl",controllerAs:"navbarCtrl"},content:{},footer:{templateUrl:"components/footer/footer.html",controller:"FooterCtrl",controllerAs:"footerCtrl"}}})}]),angular.module("directDelivery").controller("IndexCtrl",["$rootScope","log",function(t,e){function n(t){e.error("stateChangeError",t)}t.$on("$stateChangeError",n)}]),angular.module("config",[]).constant("config",{name:"direct-delivery",version:"1.0.1",author:"eHealth Africa",db:"https://dev-db.ehealth.org.ng/deliveries"}),angular.module("directDelivery").run(["$templateCache",function(t){t.put("app/index.html",'<div ui-view="header"></div><section class="container content"><div ui-view="content"><div ui-view=""></div></div></section><div ui-view="footer"></div>'),t.put("app/home/home.html","<h1>Welcome to Direct Delivery</h1>"),t.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#/"><span class="glyphicon glyphicon-home"></span> <span ng-bind="::navbarCtrl.name"></span></a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li ng-repeat="item in navbarCtrl.items track by item.name" ui-sref-active="active"><a ui-sref="{{item.name}}" ng-bind="::item.label"></a></li></ul></div></div></nav>'),t.put("app/packing/packing.html",'<h1>Packing List</h1><span>You have</span> <span ng-bind="packingCtrl.count"></span> <a ui-sref="packing.all">active packing lists</a><div ui-view=""></div>'),t.put("components/footer/footer.html",'<footer id="footer"><div class="container"><small class="text-muted"><span>©</span> <span ng-bind="::footerCtrl.year"></span> <span ng-bind="::footerCtrl.author"></span> <span class="pull-right"><span>v</span><span ng-bind="::footerCtrl.version"></span></span><nav role="navigation"><ul class="list-inline"><li><a ui-sref="contact">Contact Us</a></li></ul></nav></small></div></footer>'),t.put("app/packing/all/all.html",'<ul><li ng-repeat="packingID in packingAllCtrl.packings"><a ui-sref="packing.item({id: packingID})" ng-bind="packingID"></a></li></ul>'),t.put("app/packing/item/item.html",'<h2 ng-bind="packingItemCtrl.name"></h2><table class="table table-striped"><tr><th class="col-sm-1">Product</th><th class="col-sm-1">Expected Quantity</th><th class="col-sm-1">Complete?</th><th class="col-sm-2">Packed Quantity</th></tr><tr ng-repeat="item in packingItemCtrl.packingLists track by item.productID"><td ng-bind="item.productID"></td><td ng-bind="item.expectedQty"></td><td><span class="glyphicon" ng-class="{\n          \'glyphicon-ok text-success\': item.complete,\n          \'glyphicon-minus text-warning\': !item.hasOwnProperty(\'complete\'),\n          \'glyphicon-remove text-danger\': item.complete === false\n        }"></span></td><td><div class="form-inline"><button type="button" class="btn btn-default" ng-click="packingItemCtrl.max(item)">Max</button> <button type="button" class="btn btn-default" ng-click="item._partial = !item._partial">Partial</button> <input type="number" class="form-control input-sm" min="0" step="1" ng-model="item.packedQty" ng-model-options="{updateOn: \'blur\'}" ng-change="packingItemCtrl.isComplete(item)" ng-show="item._partial"></div></td></tr></table>')}]);