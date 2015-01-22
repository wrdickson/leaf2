<?php
class Logger {

    public static function checkDuplicateUsername($testUsername){
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE user_name = :username");
        $stmt->bindParam(":username", $testUsername, PDO::PARAM_STR);
        $stmt->execute();
        if($stmt->rowCount() > 0){
            return true;
        }else{
            return false;
        }
    }
    
    public static function check_id_key($id, $key){
    
    }
    
    public static function check_login($username,$password){  
        //check username/password pair
        $returnArr = array();
        $pwd = hash('sha256', $password);
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM users WHERE user_name = :username AND user_pass = :pwd");
        $stmt->bindParam(":username",$username, PDO::PARAM_STR);
        $stmt->bindParam(":pwd",$pwd, PDO::PARAM_STR);
        $stmt->execute();
        //TODO rowCount() is unreliable on a SELECT statement!  see php5 manual  http://php.net/manual/en/pdostatement.rowcount.php
        $returnArr['pass'] = $stmt->rowCount();
        
        
        if($returnArr['pass'] > 0){
            $result = $stmt->fetch(PDO::FETCH_OBJ);
            if($result->id != null){
                    $returnArr['id'] = (int)$result->id;
                }else{
                    $returnArr['id'] = 0;
                    }
        }else{
            $returnArr['id'] = 0;
        }
        $stmt = null;
        
        if($returnArr['pass'] == 1 AND $returnArr['id'] > 0){
            //generate a key
            $returnArr['key'] = Logger::generateKey();
            //insert it into the db
            $returnArr['keyInsertSuccess'] = Logger::updateUserKey($returnArr['key'],$returnArr['id']);
            //log the login to db
            $returnArr['lastLoginUpdate'] = Logger::updateUserLastLogin($returnArr['id']);
            $iPerson = new Person($returnArr['id']);
            $returnArr['username'] = $iPerson->get_username();
            $returnArr['permission'] = (int)$iPerson->get_permission();
        }else{
            $returnArr['key'] = "";
        }
        return $returnArr;
    }
    
    public static function createUser($username, $email, $perm, $password){
        //values have been validated at xhr/addNewUser.php
        $returnArr = array();
        $pwd = hash('sha256', $password);
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("INSERT INTO users (user_pass, user_name, user_email, user_registered, user_perm) VALUES(:pwd, :username, :email, NOW(), :perm)");
        $stmt->bindParam(":username",$username, PDO::PARAM_STR);
        $stmt->bindParam(":pwd",$pwd, PDO::PARAM_STR);
        $stmt->bindParam(":email",$email, PDO::PARAM_STR);
        $stmt->bindParam(":perm", $perm, PDO::PARAM_INT);
        $data = $stmt->execute();
        $returnArr['success'] = $stmt->rowCount();
        $returnArr['newId'] = $pdo->lastInsertId();
        return $returnArr;
    }

    private function generateKey(){
        $rnd1 = mt_rand();
        $rnd2 = mt_rand();
        $salt = "zB*r7_3kd)eJg";
        $randstr = "";
        for($i=0; $i < 12; $i++){
           $randnum = mt_rand(0,61);
           if($randnum < 10){
              $randstr .= chr($randnum+48);
           }else if($randnum < 36){
              $randstr .= chr($randnum+55);
           }else{
              $randstr .= chr($randnum+61);
           }
        }
        $hData = $rnd1 . $salt . $rnd2 . $randstr;
        $key = hash('sha256', $hData);
        return $key;
    }
    
    public static function logoff($id, $key){
        $response = array();
        
        $iUser = new Person( $id);
        $keyPassed = $iUser->verify_key($key);
        $response['keyPassed'] = $keyPassed; 
        
        $newKey = Logger::generateKey();
        if($keyPassed == true){
            $response['success'] = Logger::updateUserKey($newKey, $id);
        } else {
            
            $response['success'] = false;
        }
        return $response;
    }

    private function updateUserKey($key, $id){
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("UPDATE users SET user_key = :key WHERE id = :id"); 
        $stmt->bindParam(":key",$key, PDO::PARAM_STR);
        $stmt->bindParam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        //TODO  rowCount() is not reliable . . .
        $keyInsertSuccess = $stmt->rowCount();
        $stmt = null;
        return $keyInsertSuccess;
    }
    
    private function updateUserLastLogin($id){
        $pdo = DataConnecter::getConnection();
        $stmt = $pdo->prepare("UPDATE users SET user_last_login = NOW() WHERE id = :id"); 
        $stmt->bindParam(":id",$id, PDO::PARAM_INT);
        $stmt->execute();
        //TODO  rowCount() is not reliable . . .
        $loginDateSuccess = $stmt->rowCount();
        $stmt = null;
        return $loginDateSuccess;
    }
}
?>
