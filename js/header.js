(function($){

   const Header = {
      init: function(){
         this.mainFn();
      },
      mainFn: function(){

         
         // 로그아웃 클릭 이벤트
         // 세션스토레이지 키 PHPSESSID 삭제
         $('#header .login-info2').on({
            click(){
              
               if(  $(this).text()==='로그아웃' ){
                  // 세션 삭제
                  sessionStorage.removeItem('PHPSESSID');

                  // 세션 쿠키 삭제
                  // 1. 날짜를 설정
                  // 2. 오늘 날짜보다 -1 이상 설정 setDate()
                  // 3. 오늘 이전 날짜로 쿠키지정 그러면 삭제
                  let newDate = new Date();                 
                  const cookieName = 'PHPSESSID';
                  newDate.setDate( newDate.getDate()-1 );  // 날짜 셋팅
                  // document.cookie = `쿠키이름(키); 경로path; 만료기한.세계표준시toUTCString();`;
                  document.cookie = `${cookieName}=; path=/; expires=${newDate.toUTCString()};`;
                  sessionState();                         // 로그인 상태 감시
                  // 홈으로 이동
                  location.href = path;
               }          
            }
         });


         //moonjong.co.kr/week_kurly
         //moonjong.co.kr/myadmin
         // 헤더는 모든 페이지에 공통으로 실행되니까
         // 로그인은 계속 유지 시킨다.
         function sessionState(){
            // 헤더 영역에 회원가입 => 이순신님
            // 헤더 영역에 로그인 => 로그아웃
            
            // 세션 정보 가져오기 그리고 로그인 유지하기
            if( sessionStorage.getItem('PHPSESSID')!==null ){ //로그인 키가 있다면 로그인유지
               const result = JSON.parse(sessionStorage.getItem('PHPSESSID'));
               $('#header .login-info1').html(`${result.이름}님`);
               $('#header .login-info2').html(`로그아웃`);
            }  
            else{ // 키가 없다면 로그아웃
               $('#header .login-info1').html(`회원가입`);
               $('#header .login-info2').html(`로그인`);
            } 
          
         }
         sessionState();



         // 고객센터 마우스 올리면 
         // 툴팁메뉴 보이기
         $('#header .call-center-btn').on({
            mouseenter: function(){
               $('#header .member-popup').show();
            }
         });


         // 고객센트 서브메뉴 위치를  마우스가 떠나면
         $('#header .member-popup').on({
            mouseleave: function(){
               $('#header .member-popup').hide();
            }
         });

         // 스크롤 이벤트 발생하면
         // 윈도 스크롤 탑값(윈도우.scrollTop())이 .row3 에 탑값(142)에 도달하면(이상이면)  on 클래스를 
         // .row3 요소에 추가(addClass('on'))하여 고정된다.
         let row3Top =  $('#header .row3').offset().top; //142

         $(window).scroll(function(){

            if( $(window).scrollTop() >= row3Top ){
               $('#header .row3').addClass('on');   //클래스 추가
            }
            else{
               $('#header .row3').removeClass('on'); //클래스 삭제
            }

         });

         
         
         
         
         // 스크롤 이벤트 아래와 같이 학습하기(점검용)
         // 스크롤 이벤트 
         //$(window).scroll();  //스크롤이 발생 되면 반응하는 이벤트
         $(window).scroll(function(){
            //scrollEvent();

         });  //스크롤이 발생 되면 반응하는 이벤트

         // scrollEvent();
         // 함수
         function scrollEvent(){
            // 스크롤 발생되는 스크롤 탑값(보이는 화면의 맨위상단의 답값)을 출력 해보기
            console.log('윈도우 스크롤 값 : ' + $(window).scrollTop() );

            console.log('.row1 탑값 : ' +  $('#header .row1').offset().top );  //헤더의 로우1의 탑값(맨위에서 탑까지 간격)
            console.log('.row1 레프트 값 : ' +   $('#header .row1').offset().left );  //헤더의 로우1의 탑값(맨왼쪽에서 레프트까지 간격)

            console.log('.row2 탑값 : ' +   $('#header .row2').offset().top );  //헤더의 로우2의 탑값
            console.log('.row3 탑값 : ' +   $('#header .row3').offset().top );  //헤더의 로우3의 탑값

            console.log('#section1 탑값 : ' +   $('#section1').offset().top );  //섹션1의 탑값
            console.log('#section2 탑값 : ' +   $('#section2').offset().top );  //섹션2의 탑값
            console.log('#section3 탑값 : ' +   $('#section3').offset().top );  //섹션3의 탑값
            console.log('#section4 탑값 : ' +   $('#section4').offset().top );  //섹션4의 탑값
         }




         
      }
   }
   Header.init();


})(jQuery);