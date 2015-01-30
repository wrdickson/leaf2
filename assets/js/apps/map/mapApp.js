//mapApp.js
define ([
    'backbone',
    'common/dispatch',
    'leaflet',
    'leaflet.draw'
], function (
    Backbone,
    dispatch
) {
    "use strict";
    /*
    PRIVATE VARIABLES:
    */
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
    var map;
    /*
    PRIVATE FUNCTIONS:
    */
    /*
    API
    */
    var mapApp = {
        initialize: function () {
            //bit of a hack to keep the map full screen
            $("#leafletMap").css("height", document.documentElement.clientHeight);   
            $(window).resize(function () {
                $("#leafletMap").css("height", document.documentElement.clientHeight);
            });
            
            //tell leaflet where the images are
            baseUrl = dispatch.request("app:getBaseUrl");
            L.Icon.Default.imagePath =  baseUrl + 'assets/css/leaflet/images/';
        },
        getMapModel: function() {
            return mapModel;
        },
        loadMap: function (pUserModel, pMapModel) {
            //set the local, private variable
            userModel = pUserModel;
            mapModel = pMapModel;
            //wack the old map
            //map.remove();
            map = L.map('leafletMap');
            //if the user is editing, we're going to need to know his zoom and centroid
            //otherwise, the map will reset with each save-- ugly
            map.setView( [ mapModel.get("centroid").coordinates[1], mapModel.get("centroid").coordinates[0] ], mapModel.get("zoom") );
            var jjj = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}.jpg',{        
            //var jjj = L.tileLayer('http://localhost/tServer/api/eImg/{z}/{y}/{x}.jpg',{
                attribution: 'lkjlkj',
                minZoom: 2,
                maxZoom: 15
            }).addTo(map);
            var i = 0;
            var baseLayer = L.geoJson(mapModel.get("mapJson"), {
                //interesting . . . leaflet appears to call onEachFeature every time a feature . . 
                //ie- index saves off (probably not what we want??)
                onEachFeature: function (feature, layer) {
                    //console.log(feature, layer);
                    feature.properties.index = i;
                    i += 1;
                    
                    layer.on("click", function (e, g) {
                        console.log("click", e.target);
                    });
                    
                    layer.on("contextmenu", function (e) {
                        console.log("right click",e);
                    });
                    //bind the popup for description (properties.desc)
                    layer.bindPopup(feature.properties.desc);
                    
                }
            }).addTo(map);    
        }
    };
    
    return mapApp;
});