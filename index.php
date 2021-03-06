<?php 
    session_start();
    define('BASE_URL', "http://localhost/leaf2/");
    define('BASE_ROOT', "leaf2");
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>leafletMap-dev</title>
    <!--
    NOTE: because of the routing from maps/:id, we need to use absolute urls, boo!
    -->    
    <link href="<?php echo BASE_URL?>assets/css/application.css "rel="stylesheet">
    <link href="<?php echo BASE_URL?>assets/css/jquery-ui/jquery-ui.structure.css" rel="stylesheet">
    <link href="<?php echo BASE_URL?>assets/css/jquery-ui/jquery-ui.theme.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL?>assets/css/dhtmlxMenu/dhtmlxmenu.css">
    <link rel="stylesheet" type="text/css" href="<?php echo BASE_URL?>assets/css/jqueryui-editable/css/jqueryui-editable.css">
    <link rel="stylesheet" href="<?php echo BASE_URL?>assets/css/leaflet/leaflet.css" type="text/css">    
    <link rel="stylesheet" href="<?php echo BASE_URL?>assets/css/leaflet-draw/leaflet.draw.css" type="text/css">
    <?php
        //get session user data if available
        //this is to handle the situation where a user refreshes or manually enters a url
        if(isset($_SESSION['mtoUserId']) && isset($_SESSION['mtoUserKey']) && isset($_SESSION['mtoUserPerm'])){
        }else{
            $_SESSION['mtoUserId'] = 0;
            $_SESSION['mtoUserKey'] = 0;
            $_SESSION['mtoUsername'] = "Guest";
            $_SESSION['mtoUserPerm'] = 0;
        }
        $mtoUser = array();
        $mtoUser['mtoUserId'] = $_SESSION['mtoUserId'];
        $mtoUser['mtoUserKey'] = $_SESSION['mtoUserKey'];
        $mtoUser['mtoUserName'] = $_SESSION['mtoUsername'];
        $mtoUser['mtoUserPerm'] = $_SESSION['mtoUserPerm'];
        $userJson = json_encode($mtoUser);
        echo"<script>var mtoUser= " . $userJson . ";</script>";
        //send BASE_URL and BASE_ROOT to javascript
        echo"<script>var mtoBaseUrl = '" . BASE_URL . "';</script>";
        echo"<script>var mtoRoot = '" . BASE_ROOT . "';</script>";
    ?>
    <style>
       .leafletMap {
        height: 700px;
        width: 100%;    
    </style>
  </head>
  <body>
    <div id="leafletMap" class="leafletMap"></div>
    <div id="dialogRegion"></div>
    <div id="mtoControl" style="display: none">
    	<div id="mtoControlUpper">
	        <span id="mtoLogo" style="height: 26px;"><img src="<?php echo BASE_URL?>assets/img/mto_green.png"  style="height: 24px;padding: 2px; margin-top: 3px;"/>
	        </span>
	        <button id="btnDemo" style="float: right; margin-top: 3px; margin-right: 3px;"></button>
	    </div>
        <div id="menu-region" style="margin-right:2px;margin-left:2px;margin-bottom: 2px;"></div>
        <div id="controlTabs" style="margin-left: 2px;margin-right: 2px; margin-bottom: 2px;">
            <ul>
                <li><a href="#tabs-0">Map</a></li>
                <li><a href="#tabs-1">Features</a></li>
                <li><a href="#tabs-2">Detail</a></li>
                <li><a href="#tabs-3">Debug</a></li>
            </ul>
            <div id="tabs-0" class="tabs-content">
                <div id="mapInfo">mapInfo</div>
            </div>
            <div id="tabs-1" class="tabs-content">
                <div id="mapFeatures">mapFeatures</div>
            </div>
            <div id="tabs-2" class="tabs-content">
                <div id="mapDetails">
                    <div id="featureDetailInfo"></div>
                    <div id="featureDetailCoords"></div>
                </div>
            </div>
            <div id="tabs-3" class="tabs-content">
                <?php
                    echo"<hr/>SESSION:";
                    echo var_dump($_SESSION);
                    $p = "quetzal123";
                    $p1 = hash('sha256', $p);
                    echo $p1 ;
                ?>          
            </div>
        </div>        
    </div>
    <div id="main-region" class="container">
    </div>
    <div id="dialog-region"></div>
    <script type="text/template" id="user-login">
    	Username:<br/>
    	<input type="text" id="loginUsername"/><br/>
    	Password:<br/>
    	<input type="password" id="loginPassword"/><br/><br/>
    	<button class="btn" type="button" id="btnLogin">Login</button>
    	<button class="btn" type="button" id="btnCancelLogin">Cancel</button>
   	</script>
    <script data-main="<?php echo BASE_URL?>assets/js/require_main.js" src="<?php echo BASE_URL?>assets/js/vendor/require.js"></script>
	<!--   
    <script src="<?php echo BASE_URL?>assets/js/require_main.built.js"></script>
    -->   
   </body>
</html>


