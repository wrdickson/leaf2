//controlApp.js
define ([
    'common/dispatch',
    'apps/control/menu',
    'jquery-ui'
], function (
    dispatch,
    menu
) {
    'use strict';
    /*
    PRIVATE VARIABLES:
    */
    var userModel;
    var mapModel;
    /*
    PRIVATE FUNCTIONS:
    */
    function fireJqueryUi () {
        $("#mtoControl").show("slow");
        $("#mtoControl").draggable({
            handle: "#mtoControlUpper"	
        });
        $("#controlTabs").tabs();
        //initailly disable detail tab
        $("#controlTabs").tabs("option", "disabled", [2]);
        $("#controlTabs").on("tabsactivate", function(event,ui){
            activeTab = $("#controlTabs").tabs("option","active");
            //reset selected if user clicks map or features tab 
            if(activeTab < 2){
                selectedFeatureIndex = -1;
                //tell map to unselect all
                    //reqres.trigger("control:unselectFeature");
                //disable tab2 (detail)
                $("#controlTabs").tabs("option", "disabled", [2]);
            }
        });
        $( "#mtoControl" ).resizable({
            handles: "e"
        });
        //debug . . .
        $("#btnDemo").button({
            icons: {
                primary: "ui-icon-minusthick"
            },
            text: false,
            label: 'Minimize'
        });
    };
    /*
    DEFINITION - API:
    */
    var controlApp = {
        initialize: function () {
            //style and activate control w/ jqueryUi
            fireJqueryUi();
        },
        loadControl: function (pUserModel, pMapModel) {
            //set the local, private variables
            userModel = pUserModel;
            mapModel = pMapModel;
            menu.fireMenu(pUserModel);
            //TODO: here we load the tabs with the model data . . . 
        }
    };
    /*
    EVENTS - .on:
    */
    dispatch.on("app:fireLoginDialog", function (p) {
        
    });
    /*
    EVENTS - .setHandler():
    */
    
    return controlApp;
});
    