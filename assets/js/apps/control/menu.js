//menu_view.js
define([
    'dhtmlxcommon',
    'dhtmlxmenu',
    'common/dispatch',
    'jquery-ui'
], function(
    dhtmlx,
    dhtmlxMenuObject,
    dispatch
){
    'use strict';
	//private variables
	var menu={};
    var monitorMenu;
    
    //private functions
    var handleMenuClick = function(id, zoneId, cssState){
        switch (id){
            case "login":
                dispatch.trigger("app:fireLoginDialog");
            break;
            case "logoff":
                dispatch.trigger("user:logoff");
            break;
            case "allMaps":
                dispatch.trigger("control:showAllMaps");
            break;
        }    
    }
    
    menu.fireMenu = function(user){
        //set the private variable
        user = user;
        //clear the div
        $("#menu-region").html("");
        monitorMenu = new dhtmlXMenuObject("menu-region", "dhx_web");
	    monitorMenu.addNewSibling(null, "file", "File", false);
	    monitorMenu.addNewChild("file", 0, "allMaps", "All Maps", false, null);
        monitorMenu.addNewSibling("file", "user", user.get("mtoUserName"), false);
        if(parseInt(user.get("mtoUserId")) == 0){
            monitorMenu.addNewChild("user", 1, "login", "Login", false, null);
        };
        if(user.get("mtoUserId") > 0){
            monitorMenu.addNewChild("user", 1, "logoff", "Logoff", false, null);
        };
	    monitorMenu.attachEvent("onClick", function(id, zoneId, cssState){
	        handleMenuClick(id, zoneId, cssState);
	    });
    }
    

    //TODO event handlers on model change
    
    
	return menu;
});