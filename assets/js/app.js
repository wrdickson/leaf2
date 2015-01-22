//app.js
define([
    'backbone',
    'marionette',
    'common/dispatch',
    'routers/mapRouter',
    'apps/user/userApp',
    'apps/control/controlApp',
    'apps/map/mapApp',
    'jquery'
], function (
    Backbone,
    Marionette,
    dispatch,
    mapRouter,
    userApp,
    controlApp,
    mapApp
) {
	'use strict';

 
    //bit of a hack to keep the map full screen
    //TODO: move this to map initialize()
    $("#leafletMap").css("height", document.documentElement.clientHeight);            
    $(window).resize(function(){
        $("#leafletMap").css("height", document.documentElement.clientHeight);
    });    
    
    
    //PRIVATE VARIABLES:
    var app; 
    var selectedMapId;
    var userModel;
    var mapModel;
    //this is where we get the evil global variables from php
    var baseUrl = mtoBaseUrl;
    var root = mtoRoot;
    var initialUserJson = mtoUser;
    
    //PRIVATE FUNCTIONS:
    var reburn = function () {
        console.log("reburn . . . ", userModel, mapModel);
        //ensure that userModel AND mapModel exist 
        //this is important during the intitial sequence 
    };
    
    
    
    app = new Marionette.Application;
	app.addRegions({
        dialogRegion: "#dialogRegion",
        mapInfoRegion: "#mapInfo",
        mapFeaturesRegion: "#mapFeatures",
        featureDetailInfoRegion: "#featureDetailInfo",
        featureDetailCoordsRegion: "#featureDetailCoords"
	});
    

 
	app.on("start", function () {
        console.log("app started");
        userApp.initialize();
        controlApp.initialize();
        mapApp.initialize();
        mapRouter.initialize();
        //once user is set, it will trigger map load and control load, 
        //which sets the whole system in motion . . .
        //EXCEPT that the router will try to load the map before user is set???!!!
        userApp.setUser(initialUserJson);
        
	});
    
    //DISPATCH EVENTS:
    
    dispatch.on("app:setSelectedMapId", function (id) {
        console.log("app registers selectedMapId change: ", parseInt(id, 10));
        selectedMapId = parseInt(id, 10);
        //TODO: load the mapModel via rest api call . . .
        //reburn map and control
        reburn();
    });
    
    dispatch.on("app:userModelChange", function( pUserModel) {
        console.log("app registers userModel change:", pUserModel);
        userModel = pUserModel;
        //reburn map and control
        reburn();
    });
    
    
    dispatch.setHandler("app:getBaseUrl", function () {
        return baseUrl;
    });
    
    dispatch.setHandler("app:getRoot", function () {
        return root;
    });
    
    dispatch.setHandler("app:getUser", function () {
        return userApp.getUser();
    });

    dispatch.on("app:setSelectedMapId", function (id) {
        selectedMapId = id;
    });


	return app;
    
    
});

