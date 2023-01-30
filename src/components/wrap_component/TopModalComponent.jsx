import React from 'react';

function ModalComponent({setModalFn}) {

   const onClickModalClose=(e)=>{
      e.preventDefault();
      setModalFn();  // 1단계 상위컴포넌트의 상태변경 함수 호출 => 하루동안 열리지 않도록 모달 닫기
                     // 2단계 1일 또는  3일  7일  10일  1달  1년 동안 열리지 않음 쿠키설정 삭제
      // 쿠키설정 :  모달 닫기 버튼 클릭하면
      // 쿠키란? 웹브라우저에 정보를 담아두는 기한이있는 설정 정보이다.
      //        만료기한이 지나면 자동 삭제된다.
      //        쿠키 설정 요소로는 4가지를 필수요소로 설정한다.
      //        Name(쿠키 이름), Value(쿠키 값), Path(경로 기본 path=/), Expires(만료기한)
      // 도큐먼트에 있는 모든 쿠키 가져오기
      // console.log( document.cookie  );  // 현재 쿠키없다. 개발자모드에서 빈줄 이면 없는거예요!

      // 쿠키설정
      // 시분초 일 월 년 설정가능
      // 1. 날짜 객체 생성하기
      let newDate = new Date();
      // console.log( newDate );
      // 2. 하루를 현재날짜 더하기 설정
      //    setDate() 날짜수정
      // newDate.setDate( newDate.getDate() + 7 ); //오늘날짜에 7일 더하기
      // console.log('7일 만료기한 설정 ', newDate );
      
      //    시간을 현재시간에 더하기 설정
      // newDate.setHours( newDate.getHours() + 3 ); //오늘 현재시간에 3시간 더하기
      // console.log('3시간 만료기한',  newDate );
      newDate.setMinutes( newDate.getMinutes() + 1 ); //오늘 현재시간에 1분 더하기

      // 3. 쿠키 설정 하기 셋쿠키
      // document.cookie = `쿠키이름=쿠키값; 패스경로=/; 만료기한=세계표준시.toUTCString();`;
      // document.cookie = `문선종쿠키=마켓컬리탑모달창; path=/; expires=${newDate.toUTCString()};`;
      document.cookie = `MJKURLYTOPMODAL=MARKETKURLYTOPMODAL; path=/; expires=${newDate.toUTCString()};`;

      // 도큐먼트에 있는 모든 쿠키 가져오기
      // console.log( document.cookie  );  // 현재 쿠키 개발자 모드 확인

      // 4. 쿠키 가져와서  없다면 모달창 띄우기 
      //    쿠키 있다면 안띄우기(만료기한 있으면)
      //    상위컴포넌트에서 쿠키가져오기를 수행
      
      // 정리 : 모달닫기하면서 쿠키 7일간 설정한다. 끝

   }

   return (
      <div id="modal">
         <div className="container">
            <a href="#https://www.kurly.com/shop/event/kurlyEvent.php?htmid=event/join/join_220824" className="modal-link-btn">지금 가입하고 인기상품 <strong>100원</strong>에 받아가세요!</a>  
            <button onClick={onClickModalClose} title="하루동안 열리지 않음!" className="modal-close-btn"><img src="./img/ico_close_fff_84x84.webp" alt="" /></button>
         </div> 
      </div>
   );
};

export default ModalComponent;