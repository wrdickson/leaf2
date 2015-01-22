//require_main.js
requirejs.config({
  baseUrl: mtoBaseUrl + "assets/js",
  waitSeconds: 60,
  paths: {
    backbone: "vendor/backbone",
    jquery: "vendor/jquery",
    "jquery-ui": "vendor/jquery-ui",
    json2: "vendor/json2",
    marionette: "vendor/backbone.marionette",
    spin: "vendor/spin",
    "spin.jquery": "vendor/spin.jquery",
    text: "vendor/text",
    tpl: "vendor/underscore-tpl",
    underscore: "vendor/underscore",
    dhtmlxcommon: "vendor/dhtmlxcommon",
    dhtmlxmenu: "vendor/dhtmlxmenu",
    'leaflet': "vendor/leaflet",
    'leaflet.draw': "vendor/leaflet.draw-src",
    "jquery.cookie": "vendor/jquery.cookie",
    "jqueryui-editable": "vendor/jqueryui-editable"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },    
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    "jquery-ui": ["jquery"],
    "spin.jquery": ["spin", "jquery"],
    'leaflet.draw': ["leaflet"],
    tpl: ["text"],
    "jquery.cookie":{
        deps: ["jquery"]
    },
    "jqueryui-editable":{
        deps:["jquery-ui","jquery"]
    }
  }
});

require(["app"], function(app){
  app.start();
});
