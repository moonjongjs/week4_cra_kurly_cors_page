<?
// CORS API
// $request_origin = "https://moonjongjs.github.io/cra_kurly_cors";
$request_origin = "http://127.0.0.1:3000";
// $request_origin = "http://localhost:3000";
header("Access-Control-Allow-Origin: {$request_origin}");
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Headers: *');

$db_server_name   = 'localhost';
$db_user_name     = 'moonjong';
$db_user_pw       = 'anstjswhd0105#';
$db_name          = 'moonjong';

// 데이터베이스 접속
$conn = mysqli_connect($db_server_name, $db_user_name, $db_user_pw, $db_name);
mysqli_set_charset($conn, 'utf8');

if( !$conn ){
   die('데이터베이스 접속 실패!');
}

?>