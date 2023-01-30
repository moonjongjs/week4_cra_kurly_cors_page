<?
include_once('./sql_header.php');



// 조회하기 
$sql = "SELECT id FROM week_kurly_member";
$result = mysqli_query($conn, $sql);

// 데이터베이스 데이터를 
// 자바스크립트에서 사용가능한 형태의 배열 객체(아이디: id)로 생성해서 
// JSON 객체 형식으로 변환한다.
// 그리고 응답한다.

// 1. 배열 객체 선언
$arr = array();

// 2. 반복문(while) 사용 한줄씩 데이터 추출해서 객체를 생성 저장한다.
while( $row = mysqli_fetch_array($result)  ){
   // 한 줄씩 배열 객체에 저장하기 
   array_push($arr, array(
      '아이디' => $row['id']
   ));
}

// JSON 인코딩(encode)  유니코드 출력된다.
// echo  json_encode($arr);   // \uc544\uc774\ub514: 'moonjjong', \uc544\uc774\ub514: 'asdasdfa asdfa' ...
// JSON 인코딩(encode)  유니코드 사용안함 옵션 추가  JSON_UNESCAPED_UNICODE
echo  json_encode($arr, JSON_UNESCAPED_UNICODE);   // 아이디: 'moonjjong', 아이디: 'asdasdfa asdfa' ...


include_once('./sql_footer.php');
?>