//app.js
define([
    'backbone',
    'marionette',
    'common/dispatch',
    'routers/mapRouter',
    'apps/user/userApp',
    'apps/control/controlApp',
    'apps/map/mapApp',
    'data/data',
    'jquery'
], function (
    Backbone,
    Marionette,
    dispatch,
    mapRouter,
    userApp,
    controlApp,
    mapApp,
    data
) {
	'use strict';
    /*
    PRIVATE VARIABLES:
    */
    var app;
    var selectedFeatureIndex;
    var selectedMapId;
    var userModel;
    var mapModel;
    //this is where we get the evil global variables from php
    var baseUrl = mtoBaseUrl;
    var root = mtoRoot;
    var initialUserJson = mtoUser;
    /*
    PRIVATE FUNCTIONS:
    */
    var reburn = function () {
        //ensure that userModel AND mapModel exist 
        //this is important during the intitial sequence 
        if(userModel && mapModel) {
            console.log("reburn . . . ", userModel, mapModel);
            mapApp.loadMap(userModel, mapModel);
            controlApp.loadControl(userModel, mapModel);
        } else {
            console.log("reburn aborted: missing parameter");
        }
    };
    app = new Marionette.Application();
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
        //set the events in motion!
        userApp.setUser(initialUserJson);
        //load a default map
        var ddd = data.getMap(userModel, 70);
        ddd.done( function (pMapModel) {
            mapModel = pMapModel;
            console.log("mapModel:", mapModel);
            reburn();
        });
        
	});
    //DISPATCH EVENTS:
    dispatch.on("app:setSelectedMapId", function (id) {
        console.log("app registers selectedMapId change: ", parseInt(id, 10));
        selectedMapId = parseInt(id, 10);
        //TODO: load the mapModel via rest api call . . .
        //reburn map and control
        reburn();
    });
    dispatch.on("app:userModelChange", function (pUserModel) {
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
    
	return app;
});

