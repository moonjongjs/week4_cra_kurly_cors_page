<?
include_once('./sql_header.php');



$sql = "SELECT email FROM week_kurly_member";
$result = mysqli_query($conn, $sql);


$arr = array();
while( $row = mysqli_fetch_array($result)  ){
   array_push($arr, array(
      '이메일' => $row['email']
   ));
}

echo  json_encode($arr, JSON_UNESCAPED_UNICODE);


include_once('./sql_footer.php');
?>