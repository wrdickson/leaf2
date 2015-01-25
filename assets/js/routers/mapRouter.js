//mapRouter.js
define ([
    'marionette',
    'common/dispatch'
], function (
    Marionette,
    dispatch
) {
    'use strict';
    var RouteController = Marionette.Controller.extend({
        loadDefaultMap: function () {
            var defaultMapId = 70;
            console.log("setting selectedMapId");
            //set selected map . . . app will handle events
            dispatch.trigger("app:setSelectedMapId", defaultMapId);
        },  
        loadMap: function (id) {
            console.log("setting selectedMapId", id);
            //set selected map . . . app will handle events
            dispatch.trigger("app:setSelectedMapId", id);
        }
    });
    var routeController = new RouteController();    
    //we don't want router to fire until the proper point in the initialization
    //sequence . . so
    var mapRouter = {};
    mapRouter.initialize = function () {
        var MapRouter = new Marionette.AppRouter({
            controller: routeController,
            appRoutes: {
                "": "loadDefaultMap",
                "maps/:id": "loadMap"
            }
        });
        //mapRouter was started with the inclusion of mapRouter in define so . . 
        //ONLY after the routers are instantiated to we start Backbone.history
        if (Backbone.history) { 
            Backbone.history.start({
                pushState: true,
                root: dispatch.request("app:getRoot")
            });
        };         
    };
    return mapRouter;
});