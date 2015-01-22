//mapApp.js
define ([
    'backbone'

], function (
    Backbone
    
) {
    
    //PRIVATE VARIABLES:
    var baseUrl;
    var userModel;
    var MapModel = Backbone.Model.extend({
        initialize: function(){
            this.on("change", function () {
                console.log("mapModel change", this);
            });
        }        
    });    
    var mapModel;
    
    //PRIVATE FUNCTIONS:

    var mapApp = {
        
        initialize: function () {

        },
        
        getMapModel: function() {
            return mapModel;
        },
        
        loadMap: function (pUserModel, pMapModel) {
            //set the local, private variable
            userModel = pUserModel;
            mapModel = pMapModel;
        }
        
        
    };
    
    return mapApp;
});