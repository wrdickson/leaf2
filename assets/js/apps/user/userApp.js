//userApp.js
define ([
    'backbone',
    'common/dispatch',
    'jquery'
], function (
    Backbone,
    dispatch
) {
    
    //PRIVATE VARIABLES:
    var baseUrl; 
    var UserModel = Backbone.Model.extend({
        initialize: function(){
            this.on("change", function () {
                console.log("userchange", this);
                dispatch.trigger("app:userModelChange", this);
            });
        }        
    });
    var userModel;
    
    //PRIVATE FUNCTIONS:
    

    var userApp =  {
        //public functions:
        initialize: function () {
            console.log("userApp initailizes . . . ");
            userModel = new UserModel();         
        },
        
        getUser: function () {
            return userModel;
        },

        login: function () {
            
        },
        
        logoff: function () {
            
        },
        
        setUser: function (userJson) {
            userModel.set(userJson); 
        }
    
        
    };
    
    
    
    
    
    return userApp;
});