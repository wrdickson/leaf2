//data.js
define ([
    'common/dispatch',
    'backbone',
    'jquery'
], function (
    dispatch,
    Backbone
) {
    
    /*
    PRIVATE FUNCTIONS
    */
    
    
        
    
    
    var data = {
        getMap: function (userModel, mapId) {
            var baseUrl = dispatch.request("app:getBaseUrl");
            var MapModel = Backbone.Model.extend({
                urlRoot: baseUrl + "api/maps/" + mapId
            });
            var mapModel = new MapModel();
            var deferred = $.Deferred();
            mapModel.fetch( {
                success: function (model, response, options) {
                    console.log("success-model");
                    //console.log(model);
                    deferred.resolve(model);
                }
            });
            return deferred.promise();
        }
    };
    
    return data;
});