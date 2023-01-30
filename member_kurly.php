<?
include_once('./sql_header.php');
  

   //2. AJAX 폼데이터를 받아서 $변수에 저장
   $id       = $_POST['id'];
   $pw       = $_POST['pw'];
   $irum     = $_POST['irum'];
   $email    = $_POST['email'];
   $hp       = $_POST['hp'];
   $addr     = $_POST['addr'];
   $gender   = $_POST['gender'];
   $birth    = $_POST['birth'];
   $addInput = $_POST['addInput'];
   $service  = $_POST['service'];
   $gaibDate = $_POST['gaibDate'];


   //3. SQL 이용 데이터베이스에 저장
   $sql = "INSERT INTO week_kurly_member (id, pw, irum, email, hp, addr, gender, birth, add_input, service, gaib_date) 
           VALUES ('$id', '$pw', '$irum', '$email', '$hp', '$addr', '$gender', '$birth', '$addInput', '$service', '$gaibDate')";
   $result = mysqli_query($conn, $sql);
   
   if($result){ //결과가 TRUE 이면 성공
        //4. 앞단(프론트단)에 응답한다.  {"이름": "이순신"}; 출력
        echo  '{"이름": "' .$irum. '"}';
   }
   else{
        echo '';
   }
  

   




   include_once('./sql_footer.php');

?>