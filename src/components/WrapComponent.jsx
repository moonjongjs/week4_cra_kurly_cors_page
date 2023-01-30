import React from 'react';
import IntroModalComponent from './wrap_component/IntroModalComponent';
import TopModalComponent from './wrap_component/TopModalComponent';
import HeaderComponent from './wrap_component/HeaderComponent';
import MainComponent from './wrap_component/MainComponent';
import FooterComponent from './wrap_component/FooterComponent';

function WrapComponent(){
   // 상태관리자 state => React.useState();
   // 로그인 상태관리 [변수 singIn=false, 변수변경함수 setSingIn(true)] = React.useState(false)
   // 변수를 '스테이트' 라한다. 
   // 변수변경=> '셋스테이트' 라한다.
   const [intModal, setIntModal]  = React.useState(true);    // 인트로모달
   const [modal, setModal]    = React.useState(true);    // 탑모달
   const [intro, setIntro]    = React.useState(true);    // 인트로
   const [singIn, setSingIn]  = React.useState(false);   // 로그인
   const [singUp, setSingUP]  = React.useState(false);   // 회원가입
 
   // const [state, setState] = React.useState({
   //    intModal: true,
   //    modal: true,
   //    intro: true,
   //    singIn: true,
   //    singUp: true
   // });   

   // setState({
   //    ...state,
   //    singUp: false
   // });

   // 컴포넌트안에서 함수는 화살표함수 사용한다.



   // 홈페이지 열리면서 실행하는 쿠키 가져오기 함수필요
   // 로딩시 실행하는 함수는 반드시 React.useEffect(); 훅이 필요한다.
   React.useEffect(()=>{

         // 다시는 안보기 인트로 모달
         // localstorage
         let introModal = localStorage.getItem('MJKURLYINTROMODAL');

         if(introModal!==null){ // 인트로 모달이 있다면
            setIntModal(false);
         }
         else {
            setIntModal(true);
         }

            

         try{    //오류가 없으면 실행
        
            // console.log(' 홈페이지 로딩시 모든 화면이 그려진 다음 실행 ', document.cookie );
            // 문선종쿠키=마켓컬리탑모달창; 문종쿠키=마켓컬리탑모달창  
            // 여러개의 쿠키는 쿠키 쿠키 사이 쎄미콜론으로 구분되어 있다.
            
            // 1단계 : 그러므로 ;  쎄미콜론 단위로 배열처리하여 변수에 저장한다. 
            const cookie = document.cookie.split(';');  //결과는 변수에 배열처리되어 저장된다.
            // console.log( cookie );

            // 2단계 : 쿠키이름과 쿠키값을 분리하는 반복 작업 객체로 저장한다.
            let obj = [];
            cookie.map((item, idx)=>{
               obj[idx] = {
                  쿠키이름: item.split('=')[0].trim(),  //'문선종쿠키=마켓컬리탑모달창'
                  쿠키값: item.split('=')[1].trim()     //'문선종쿠키=마켓컬리탑모달창'
               }
            });

            // 분류된 쿠키이름, 쿠키값 확인
            // console.log( obj );
            // 모달창 띄우기 또는 숨기기
            // 쿠키이름이 있다면 숨기기            
            // 쿠키이름이 없다면 모달창 띄우기

            // 탑모달
            obj.map((item)=>{

               // 탑 모달
               //MJKURLYTOPMODAL=MARKETKURLYTOPMODAL
               if(item.쿠키이름==='MJKURLYTOPMODAL' && item.쿠키값==='MARKETKURLYTOPMODAL'){
                  setModal(false);
               }
               else{
                  setModal(true);
               }

            });


         }
         catch{ // 오류가 있으면 실행 (쿠키가 없다면)
            return;
         }
            

   });


   // 인트로 모달 함수
   const setIntModalFn=()=>{
      setIntModal(false);
   } 


   // 탑모달 변경 함수
   const setModalFn=()=>{
      setModal(false);
   }

 
   // 인트로 스테이트 함수
   const setIntroFn=()=>{
      setIntro(true);    //인트로 보임
      setSingIn(false);  //로그인 숨김
      setSingUP(false);  //회원가입 숨김
   }
 
   // 로그인 스테이트 함수 
   // 헤더컴포넌트에서 로그인 버튼 클리하면 함수 호출 실행
   const siginInFn=(a,b,c)=>{
      // alert(a);
      // alert(b);
      // alert(c);
      setIntro(false);    //인트로 숨김
      setSingIn(true);    //로그인 보이고
      setSingUP(false);   //회원가입 숨김
   }

   // 회원가입 스테이트 함수
   const singUpFn=(a,b)=>{
      // alert(a);  // 매개변수도 받아사 사용가능
      // alert(b);  // 매개변수도 받아사 사용가능 
      setIntro(false);    //인트로 숨김     
      setSingUP(true);    // 회원가입 보이고
      setSingIn(false);   // 로그인 숨김
   }

   // 로딩시 실행하고 싶은 내용은 여기에서 실행
   React.useEffect(()=>{
      // siginInFn();
   // });            // 반복 실행 무한 반복 실행 가능 주의
   },[]);            // 1회만 실행 [] 빈 배열을 사용 모두 초기화
   // },[singIn]);   // signIn 이 변경되면 실행  !토글로 실해하면 무한 반복

   return(
      <div id="wrap">
         {intModal && <IntroModalComponent setIntModalFn={setIntModalFn} />}
         {modal && <TopModalComponent setModalFn={setModalFn} />}
         <HeaderComponent setIntroFn={setIntroFn}  siginInFn={siginInFn} singUpFn={singUpFn} /> {/* 함수를 내려준다. => 버튼클릭해서 함수 호출 실행 값 변경 */}
         <MainComponent intro={intro}  singIn={singIn} singUp={singUp} /> {/* 변수만 내려준다 props 프롭스 */}
         <FooterComponent />
      </div>
   )
}

export default WrapComponent;

