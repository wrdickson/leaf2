//controlApp.js
define ([
    

], function (

) {

    //PRIVATE VARIABLES:
    var userModel;
    var mapModel;
    
    //PRIVATE FUNCTIONS:
    
    var controlApp = {
        
        initialize: function () {
            
        },
        
        loadControl: function (pUserModel, pMapModel) {
            //set the local, private variable
            userModel = pUserModel;
            mapModel = pMapModel;
        }
        
    };
    
    return controlApp;
});