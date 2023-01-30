import React from 'react';
import ConfirmModal from './ConfirmModal';
import axios from 'axios';
import PropTypes from 'prop-types';


function SingupComponent(props) {

   // 상태관리 
   const [state, setState] = React.useState(props.회원);


   // 입력상자(타겟) 이벤트
   // 1. 아이디
   const onChangeId=(e)=>{
      // 정규표현식
      const {value} = e.target;  // e.target.value  비구조화 
      const regExp1 = /.{6,16}/g;                                 // 6~16 제한조건
      const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;             // 영문(1자이상)은필수 숫자(0자이상)는 선택
      const regExp3 = /\s/g;                                      // 공백문자
      const regExp4 = /[`~!@#$%^&*()\-_=+|[\]{}'";:/?.>,<]/g;  // 특수문자는 입력과 동시에 삭제

      let   imsiValue = '';
      let   isImsi = '';
                           
            // 특수문자 입력 즉시 삭제
            imsiValue = value.replace(regExp4, '');

            // 리액트는 선택자를 직접선택안하고 입력값을 상태관리자 변수에 저장하고,
            // 상태변수 값을 입력상자에 값으로 입력한다.
            // 키보드 입력상자 입력값 => 상태변수 = > 입력상자 입력(상태변수와 입력상자)
            if(regExp1.test(value)===false || regExp2.test(value)===false || regExp3.test(value)===true){                  
               isImsi = true;            
            }
            else{          
               isImsi = false;
            }         

            // 상태관리 변수 1회 저장
            setState({
               ...state, 
               아이디:imsiValue, 
               isId: isImsi
            });
   }  // id 입력상자 끝


   //////////////////////////////////////////////////////////////////
   // 2. 아이디 중복검사 버튼 클릭 이벤트 
   const onClickIdOk=(e)=>{
      e.preventDefault();
      
         // let arr = [];
         const {아이디} = state;                                 // 입력 값(문자열 스트링)
         const regExp1 = /.{6,16}/g;                                 // 6~16 제한조건
         const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;             // 영문(1자이상)은필수 숫자(0자이상)는 선택
         const regExp3 = /\s/g;                                      // 공백문자
         const regExp4 = /[`~!@#$%^&*()\-_=+|\[\]{}'";:/?.>,<]/g;  // 특수문자는 입력과 동시에 삭제
            
         let isImsi = false;
         let imsiText = '';
         let 아이디중복확인 = false;

            if(regExp1.test(아이디)===false || regExp2.test(아이디)===false || regExp3.test(아이디)===true || regExp4.test(아이디)===true ){                  
                  isImsi = true;   
                  imsiText = `6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합`
                  // return;
            }
            else{ //정규표현식 조건 오류 없으면 : 데이터베이스 아이디 가져오기 그리고 중복검사 비교하기

                  // CORS(교차주소인데 서로다른 서버주소를 이용 공유정책) API
                  // http://moonjong.co.kr/week_kurl_cra4_cors/id_select.php
                  // http://moonjong.co.kr/myadmin/
                  // AXIOS 패키지 설치(Install)
                  // AXIOS 는 데이터를 단순하게 조회(R)하여 가져오기 : 메서드방식 => GET 방식
                  // AXIOS 는 데이터를 전송하여 저장(C), 조회(R), 수정(U), 삭제(D) : 메서드방식 => POST 방식
                  // axios({url,method,formdata}).then((성공데이터매개변수)=>{}).catch((실패매개변수)=>{});
                  axios({
                     url:'http://moonjong.co.kr/week_kurl_cra4_cors/id_select.php',
                     mothod:'GET',
                     mode:'CORS'
                  })
                  .then((res)=>{
                     // console.log( res.data );
                     // const arr = JSON.parse(res); //제이쿼리에선 필요 리액트 가져오기가 JSON 객체로 가져오기된다. 사용안한다.
                     const arr = res.data; // 반드시 res.data 속성을 사용한다.
                     const result = arr.map((item)=>item.아이디===state.아이디); //result[true, false, false]
                     // console.log( result );
                     if( result.includes( true )  ){
                        아이디중복확인 = false;
                        isImsi = true;
                        imsiText = '사용 불가능한 아이디 입니다';
                     }
                     else{
                        아이디중복확인 = true;
                        isImsi = true;
                        imsiText = '사용 할 수 있는 아이디 입니다';
                     } 
                     
                     setState({  // 프로미스 기법으로 반드시 AXIOS  내부에서 상태관리를 처리한다.
                        ...state, 
                        isConfirmModal: isImsi,
                        isConfirmModalText: imsiText,
                        아이디중복확인: 아이디중복확인
                     });

                  })
                  .catch((err)=>{
                     console.log( err );
                  });
            }
   }
   

   // 3. 비밀번호
   const onChangePw=(e)=>{
      const {value}   = e.target; //비구조화

      // 정규표현식
      const regExp1 = /.{10,16}/g;  //10자~16자
      const regExp2 = /\s/g;        //공백문자
      const regExp3 = /((?=.*[A-Z])+(?=.*[0-9])+)+|((?=.*[A-Z])+(?=.*[`~!@#$%^&*()\-_=+|[\]{}'";:/?.>,<])+)+|((?=.*[0-9])(?=.*[`~!@#$%^&*()\-_=+|[\]{}'";:/?.>,<]))/gi;   //조건1 영문숫자, 조건2 영문특수문자, 조건3 숫자특수문자 반드시 2개이상 조함
                     // ((?=.*[A-Z])+(?=.*[0-9])+)+|  // 영문숫자
                     // ((?=.*[A-Z])+(?=.*[`~!@#$%^&*()-_=+|[\]{}'";:/?.>,<])+)+|  //영문특수문자 
                     // ((?=.*[0-9])(?=.*[`~!@#$%^&*()-_=+|[\]{}'";:/?.>,<]))  //숫자특수문자
                     // (영문숫자|영문특수문자|숫자특수문자)
      const regExp4 = /(.)\1\1/g;  //연속 동일문자

      // 임시변수
      let isImsi1 = false;
      let isImsi2 = false;
      let isImsi3 = false;

      if(regExp1.test(value)===false){ //1. 10자이상 16자이하
         isImsi1 = true;  // 오류발생
         isImsi2 = false;
         isImsi3 = false;
      }
      else if(regExp2.test(value)===true || regExp3.test(value)===false){ //영문,숫자,특수문자 2가지이상조함 그리고 공백사용금지
         isImsi1 = false;
         isImsi2 = true; // 오류발생
         isImsi2 = false;
      }
      else if(regExp4.test(value)===true){ //동일한문자 3자이상 사용금지      
         isImsi1 = false;
         isImsi2 = false;
         isImsi3 = true; // 오류발생
      }
      else {
         isImsi1 = false;
         isImsi2 = false;
         isImsi3 = false;
      }

      // 상태관리 변경
      setState({
         ...state,
         비밀번호: value,
         isPw1:isImsi1,
         isPw2:isImsi2,
         isPw3:isImsi3
      });
   }

   // 4. 비밀번호 확인
   const onChangePwOk=(e)=>{
     
      const pwVal = state.비밀번호;
      const pw2Val = e.target.value;
      let isImsi1 = false;
      let isImsi2 = false;

      if(e.target.value===''){ // 빈값이면 한번더 입력....
         isImsi1 = true;
         isImsi2 = false;
      }
      else if(pwVal!==pw2Val){ //비밀번호와 비밀번호한번더 입력값 비교 다르면
         isImsi1 = false;
         isImsi2 = true;
      }
      else{
         isImsi1 = false;
         isImsi2 = false;
      }

      setState({
         ...state,
         비밀번호확인: pw2Val,
         isPwOk1: isImsi1,
         isPwOk2: isImsi2
      })

   }

   // 5. 이름
   const onChangeName=(e)=>{
      const regExp  = /[`~!@#$%^&*()\-_=+|[\]{}'";:/?.>,<]/g; // 불변변수
      const nameVal = e.target.value; //불변변수
      let irum = '';      // 가변변수
      let isImsi = false; // 가변변수

      irum = nameVal.replace(regExp,'');  // 특수문자 입력과동시에 삭제

      if(nameVal===''){
         isImsi = true;
      }
      else{
         isImsi = false;
      }
      setState({
         ...state,
         이름: irum,
         isName: isImsi
      })
   }

   // 6. 이메일
   const onChangeEmail=(e)=>{

      const emailVal = e.target.value;
      const regExp1 = /[\s]/g;  //공백사용불가 
      const regExp2 = /^([A-Z0-9`~#$%^&*()=|._:;?/-]+)([`~#$%^&*()=|._:;?/-]?[A-Z0-9]*)@([A-Z0-9`~#$%^&*()=|._:;?/-]+)([`~#$%^&*()=|._:;?/-]?[A-Z0-9]*).[A-Z]{2,3}$/gi;  //영문숫자특수문자
      
      let isImsi1 = false;
      let isImsi2 = false;

      if(emailVal===''){
         isImsi1 = true;
         isImsi2 = false;
      }         
      else if(regExp1.test(emailVal)===true || regExp2.test(emailVal)===false ){
         isImsi1 = false;
         isImsi2 = true;
      }
      else{
         isImsi1 = false;
         isImsi2 = false;
      }

      setState({
         ...state,
         이메일: emailVal,
         isEmail1: isImsi1,
         isEmail2: isImsi2
      })


   }

   // 7. 이메일 중복확인 클릭 이벤트
   const onClickEmail=(e)=>{
      e.preventDefault();
      let arr = [];
      const emailVal = state.이메일;
      const regExp1 = /[\s]/g;  //공백사용불가         
      const regExp2 = /^([A-Z0-9`~#$%^&*()=|._:;?/-]+)([`~#$%^&*()=|._:;?/-]?[A-Z0-9]*)@([A-Z0-9`~#$%^&*()=|._:;?/-]+)([`~#$%^&*()=|._:;?/-]?[A-Z0-9]*).[A-Z]{2,3}$/gi;  //영문숫자특수문자
      
      let isImsi = false;
      let txt = '';
      let 이메일중복확인 = false;
      
      if(emailVal===''){
         isImsi = true;
         txt = `이메일을 입력해 주세요.`;
      }
      else if(regExp1.test(emailVal)===true || regExp2.test(emailVal)===false ){
         isImsi = true;
         txt = `이메일 형식으로 입력해 주세요.`;
      }
      else{
         
               // HTTP 통신 : AJAX, AXIOS 
               // 리액트 axios() 구현
               axios({
                  url:'http://moonjong.co.kr/week_kurl_cra4_cors/email_select.php',
                  method: 'GET',
                  mode:'CORS'
               })
               .then((res)=>{
                  // console.log('AXIOS 성공 결과 : ', res.data );
                     const arr = res.data;
                     const result = arr.map((item)=>item.이메일===state.이메일);
               
                     if( result.includes( true )  ){
                        isImsi = true;
                        txt = `사용 불가능한 이메일 입니다`;
                        이메일중복확인 = false;
                     }
                     else{
                        isImsi = true;
                        txt = `사용 할 수 있는 이메일 입니다`;
                        이메일중복확인 = true;
                     }  

                     setState({
                        ...state,
                        isConfirmModal: isImsi,
                        isConfirmModalText: txt,
                        이메일중복확인: 이메일중복확인
                     })


               })
               .catch((err)=>{
                  console.log('AXIOS 실패 결과 : ', err );
               });

      }


   }

   // 8. 휴대폰   
   const onChangeHp=(e)=>{      
      const regExp = /[^0-9]/;
      let imsi = '';
      let isImsi1 = false;
      let isImsi2 = false;

      imsi = e.target.value.replace(regExp, ''); 

      if( e.target.value==="" ){
         isImsi1 = true;
      }
      else{
         isImsi1 = false;
         if( e.target.value.length >= 1 ) {
            isImsi2 = true;
            // $('.hp-btn').attr('disabled', false);  //버튼 false 사용가능 / true 사용불가
         }
         else {
            isImsi2 = false;
            // $('.hp-btn').attr('disabled', true);  
            
         }

      }

      setState({
         ...state,
         휴대폰: imsi,
         isHp: isImsi1,
         isHpButton: isImsi2,
      })
   }

   // 9. 휴대폰 인증번호 받기 클릭 이벤트
   const onClickHpNumber=(e)=>{
      e.preventDefault();    
      const regExp = /^01[0|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/;
      let isHp2Box = false;
      let isHp2 = false;
      let isHp2Btn = false;
      let isModal = false;
      let txt = '';
      let randomNum = '';

      if(regExp.test(state.휴대폰) === false ){
         isModal = true;
         txt = `잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.`;
      }
      else{
         // 인증번호 6자리 랜덤번호 생성
         randomNum = Math.floor(Math.random()*900000+100000);  //랜덤숫자 0 ~ 1 사이의 무작위 숫자          

         isHp2Box = true;
         isHp2 = true;
         isHp2Btn = true;

         isModal = true;
         txt = `인증코드가 발송 되었습니다. 인증코드 ${randomNum}`;

      }

      setState({
         ...state,
         isHp2Box: isHp2Box,
         isHp2: isHp2,
         isHp2Btn: isHp2Btn,
         isConfirmModal: isModal,
         isConfirmModalText: txt,
         휴대폰인증번호발급: randomNum
      })
      randomNum='';

   }



   // 10. 휴대폰 인증번호 입력상자
   const onChangeHp2=(e)=>{
      setState({
         ...state,
         휴대폰인증번호입력: e.target.value
      })
   }

   // 11. 휴대폰 인증번호 확인 버튼 클릭 이벤트
   const onClickHp2Btn=(e)=>{
      e.preventDefault();
      let isHpInput = false;
      let isHpButtonOn = false;
      let isHp3Btn = false;
      let isHp2Box = false;
      let isHp2 = false;
      let isHp2Btn = false;
      let isModal = false;
      let txt = '';
      let 휴대폰인증확인= false;


      if( state.휴대폰인증번호발급 === Number(state.휴대폰인증번호입력) ){  // 숫자 === Number(문자형숫자) 숫자형변환
         isHpInput = true;
         isHpButtonOn = true;
         isHp3Btn = true;
         isHp2Box = false;
         isHp2 = false;
         isHp2Btn = false;
         isModal = true;
         txt = '인증에 성공 하였습니다.';
         휴대폰인증확인 = true;
      }
      else {
         isModal = true;
         txt = '잘못된 인증 코드 입니다.';
         휴대폰인증확인 = false;
      }

      setState({
         ...state,
         isHpInput: isHpInput,
         isHpButtonOn: isHpButtonOn,
         isHp3Btn: isHp3Btn,
         isHp2Box: isHp2Box,
         isHp2: isHp2,
         isHp2Btn: isHp2Btn,
         isConfirmModal: isModal,
         isConfirmModalText: txt,
         휴대폰인증확인: 휴대폰인증확인
      })
   }


   // 12. 다른번호 인증 버튼 클릭 이벤트
   //     클릭하면 다른번호 인증 버튼 사라지고 인증번호 받기 버튼 비 활성화 처음단계
   //     입력상자 아래에 빨간 가이드 텍스트 : 휴대폰 번호를 입력해주세요
   const onClickHp3Button=(e)=>{
      e.preventDefault();
      setState({
         ...state,
         isHp3Btn: false,
         isHpButtonOn: false,
         isHpInput: false,
         isHp: true,
         휴대폰: '',
         휴대폰인증번호입력: '',
         휴대폰인증번호발급: '',
         휴대폰인증확인: false
      });
   }

   // 13.  주소검색 팝업창 띄우기 버튼클릭 이벤트
   const onClickAddressBtn=(e)=>{
      e.preventDefault();
      // 팝업창 띄우기
      let fileName = './popup.html';
      let windowName = '_address_search_popup';
      let popW = 530;
      let popH = 569;
      let winW = window.innerWidth;
      let winH = window.innerHeight;
      let posL = (winW-popW)/2;
      let posT = (winH-popH)/2;

      window.open(fileName, windowName, `width=${popW}, height=${popH}, top=${posT}, left=${posL}` );
   }


   
   // 14. 주소1 입력상자 온 체인지 이벤트
   const onChangeAddress1=(e)=>{
      
      setState({
         ...state,
         주소1: e.target.value,
      })
   }


   // 15. 주소2 입력상자 온 체인지 이벤트
   const onChangeAddress2=(e)=>{
      
      setState({
         ...state,
         주소2: e.target.value,
      })
   }


   // 16. 팝업창에서 세션스토레이지 저장된 주소를 가져온다
   // 16-1 키가 없는경우 => 만약 저장된 주소의 키가 없으면 
   //      => 주소검색 버튼을 보이고,
   //      주소1, 주소2입력상자, 재검색버튼은 숨긴다.

   // 16-2 키가 있는경우 => 키가 있다면 키값을 가져와서 주소를 주소1, 주소2 입력란에 입력 바인딩한다.
   //     주소1, 주소2입력상자, 재검색버튼을 보이게한다.
   //     주소검색 버튼은 숨긴다.

   // 16-3 주소검색 함수 : 
   // 로딩시 실행주기(라이프 사이클) Life Cycle 생명주기
   // 리액트 컨스트럭터(리액트 생성자 constructor()) => 상태관리 변수(state) 훅 실행(React.useState())
   // => 렌더링(render()) => 리턴(return()) => 템플릿(JSX)이용 화면에 태그가 브라우저에 그려진다(마운트)
   // => 이펙트 훅 실행(React.useEffect()) => 종료 Distrory

   const addressStrorageSearch=()=>{
      const key = 'MJ-KURLY_ADDRESS';
      let address = {};
      let 주소1 = '';
      let 주소2 = '';
      let isAddress = false;

      // 세션 스토레이지에서 주소검색 정의된 키('MJ-KURLY_ADDRESS')를  가져온다.
      // 빈값이 아니면(즉' 키가 있다면)
      if( sessionStorage.getItem( key ) !== null ) {
         address = JSON.parse(sessionStorage.getItem(key));
         주소1 = address.주소1;
         주소2 = address.주소2;
         isAddress = true;
      }
      else{
         isAddress = false;
      }

      setState({
         ...state,
         주소1: 주소1,
         주소2: 주소2,
         isAddress: isAddress
      })

   }




   // 16-4
   React.useEffect(()=>{
      setTimeout(addressStrorageSearch, 300);
   },[]);  // 실행 후 빈배열 이용 비워버린다.  배열에 값, 상태 변경되면 실행


   //17. 성별
   const onChangeGender=(e)=>{
      setState({
         ...state,
         성별: e.target.value
      })
   }

   //18. 생년월일  메인함수
   const birthCheckFn=()=>{
      
      const {생년, 생월, 생일} = state;
      let isBirth = false;
      let 생년월일에러메시지 = '';
      
      //생년, 생월, 생일 모두 비어 있으면 빈칸 
      if( 생년 === '' && 생월 === '' && 생일 === '' ){         
         isBirth = false;
      }
      else {
         // *  생년월일 모든 조건
         // 1. 생년 체크
         const regexp_year = /[\d]{4}/g
         const newYear = new Date().getFullYear(); //현재년도 getFullYear()  2022  getYear() 22   getMonth() 월 getDate() 일
         if( regexp_year.test(state.생년)===false ){
            isBirth = true;         
            생년월일에러메시지 = '태어난 년도 4자리를 정확하게 입력해주세요.'
         }
         else if( Number(state.생년) < newYear-100 ){
            isBirth = true;         
            생년월일에러메시지 = '생년월일을 다시 확인해주세요.';
         }
         else if( Number(state.생년) > newYear ){
            isBirth = true;         
            생년월일에러메시지 = '생년월일이 미래로 입력 되었습니다.';
         }
         else if( Number(state.생년) >= newYear-14 ){
            isBirth = true;         
            생년월일에러메시지 = '만 14세 미만은 가입이 불가합니다.';
         }
         else{
            // 생년 모든 조건 만족하면 다음 월을 입력하라는 메시지
            isBirth = true;         
            생년월일에러메시지 = '태어난 월을 정확하게 입력해주세요.';

            // 2. 생월 체크 ?: 조건 | 01 ~ 09 | 10 11 12        
            const regExp_month = /^(?:0?[1-9]|1[0-2])$/g;
            if( regExp_month.test( state.생월 )===false ){
               isBirth = true;         
               생년월일에러메시지 = '태어난 월을 정확하게 입력해주세요.';
            }
            else {

               // 생월 모든 조건 만족하면 다음 일을 입력하라는 메시지
               isBirth = true;         
               생년월일에러메시지 = '태어난 일을 정확하게 입력해주세요.';

               // 3. 생일 체크 ?: 조건  01 ~ 09 | 10 ~ 19 | 21 ~ 30 | 30 ~ 31
               const regExp_date = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;
               if( regExp_date.test( state.생일 )===false  ){
                  isBirth = true;         
                  생년월일에러메시지 = '태어난 일을 정확하게 입력해주세요.';
               }
               else{
                  isBirth = false;         
                  생년월일에러메시지 = '태어난 일을 정확하게 입력해주세요.';
               }
            }
         }
      }


      setState({
         ...state,
         isBirth: isBirth,
         생년월일에러메시지: 생년월일에러메시지
      })


   }
   React.useEffect(()=>{
      birthCheckFn();      
   },[state.생년,state.생월,state.생일]);


   //18-1 생년
   const onChangeYear=(e)=>{
      const regExp_num = /[^\d]/g;
      let 생년 = '';
      생년 = e.target.value.replace(regExp_num,'');

      setState({
         ...state,
         생년: 생년
      })
   }
   //18-2 생월
   const onChangeMonth=(e)=>{
      const regExp_num = /[^\d]/g;
      let 생월 = '';
      생월 = e.target.value.replace(regExp_num,'');

      setState({
         ...state,
         생월: 생월
      })
   }
   //18-3 생일
   const onChangeDate=(e)=>{
      const regExp_num = /[^\d]/g;
      let 생일 = '';
      생일 = e.target.value.replace(regExp_num,'');

      setState({
         ...state,
         생일: 생일
      })
   }


   //19-1. 추가입력사항 라이디오 버튼 이벤트
   const onChangeAddInput=(e)=>{
      setState({
         ...state,
         추가입력사항: e.target.value,
         isAddInput: true
      })
   }
   //19-2. 추가입력사항 입력상자
   const onChangeAddInputBox=(e)=>{
      setState({
         ...state,
         추가입력사항입력상자: e.target.value
      })
   }



   //20. 이용약관동의
   //20-1 모두체크
   const onChangeServiceAllCheck=(e)=>{
      let 이용약관동의 = [];

      if(  e.target.checked === true ){
         이용약관동의 = state.이용약관;  //7개 전체목록
      }
      else {        
         이용약관동의 = [];  //빈 배열로 삭제
      }

      setState({
         ...state,
         이용약관동의: 이용약관동의
      })

   }

   //20-2 개별체크
   const onChangeServiceChecked=(e)=>{
      if(e.target.checked === true){
         setState({
            ...state,
            이용약관동의: [...state.이용약관동의, e.target.value]
         })
      }
      else{
         setState({
            ...state,
            이용약관동의: state.이용약관동의.filter((item)=>item !== e.target.value)
         })
      }
   }


   //21. 데이터 타입 설정 : 패키지 설치 prop-types 설치하고 type 지정 완료





   // 전성버튼 클릭이벤트 => 그리고 axios 전송
   const onClickSumbmit=(e)=>{
      e.preventDefault();

         // 22. AXIOS API 서버에 전송
         // 22-1. 전송할 데이터 저장할 객체 생성 대입
         // 22-2. 폼데이터 생성
         // 22-3. 폼데이터에 전송객체 속성을 대입
         // 22-4. 폼데이터 axios 패키지 이용 데이터베이스 서벙에 전송 저장
         // 22-5. 회원가입 최종 테스트 완료

         // 22-1. 전송할 데이터 저장할 객체 생성 대입
         const imsi = {
            아이디: state.아이디,
            비밀번호: state.비밀번호,
            이름: state.이름,
            이메일: state.이메일,
            휴대폰: state.휴대폰.replace(/(^\d{3})(\d{3,4})(\d{4}$)/,'$1-$2-$3'),  // 010-7942-5305  010-348-6441
            주소: `${state.주소1} ${state.주소2}`,
            성별: state.성별,
            생년월일: `${state.생년}-${state.생월}-${state.생일}`,
            추가입력사항: `${state.추가입력사항}, ${state.추가입력사항입력상자}`,
            이용약관동의: state.이용약관동의,
            가입일자: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
         }


         // 22-2. 폼데이터 생성
         let newFormData = new FormData();
      
         // 22-3. 폼데이터에 전송객체 속성을 대입
         newFormData.append('id', imsi.아이디);
         newFormData.append('pw', imsi.비밀번호);
         newFormData.append('irum', imsi.이름);
         newFormData.append('email', imsi.이메일);
         newFormData.append('hp', imsi.휴대폰);
         newFormData.append('addr', imsi.주소);
         newFormData.append('gender', imsi.성별);
         newFormData.append('birth', imsi.생년월일);
         newFormData.append('addInput', imsi.추가입력사항);
         newFormData.append('service', imsi.이용약관동의);
         newFormData.append('gaibDate', imsi.가입일자);


         // // 22-4. 폼데이터 axios 패키지 이용 데이터베이스 서벙에 전송 저장
         axios({
            url:'http://moonjong.co.kr/week_kurl_cra4_cors/member_kurly.php',
            method:'POST',
            mode:'CORS',
            data: newFormData
         })
         .then((res)=>{
            console.log('AXIOS 성공 결과 : ', res.data );
         })
         .catch((err)=>{
            console.log('AXIOS 실패 결과 : ', err );
         });

   }  //AXIOS 전송 완료





   //23. 깃허브에 배포하기




   // 컨펌 모달창 닫기 함수
   const isConfirmModalCloseFn=()=>{
      setState({...state, isConfirmModal: false});
   }


   return (
         <main id="main" className="member-gaib">
            <div className="container">
                {/* 회원 가입폼             */}
               <div id="memberGaib">
                  
                     <div className="title">
                           <h2>회원가입</h2>
                           <p><i>*</i>필수입력사항</p>
                     </div>

                     <div className="content">
                        <form autoComplete="off" method='post' action='./member_kurly.php'>
                           <ul>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>아이디<i>*</i></h3>
                                       </div>
                                       <div className="right">
                                          <input 
                                          maxLength="16" 
                                          type="text" 
                                          id="id"
                                          name="id" 
                                          className='id' 
                                          placeholder="아이디를 입력해주세요"
                                          onChange={onChangeId}  
                                          value={state.아이디}
                                          />
                                          <button 
                                          className="idok-btn" 
                                          type='button'
                                          onClick={onClickIdOk}
                                          >중복확인
                                          </button>

                                          {/* 조건 삼항연산자 변수 isId = false */}
                                          <p className={`error-msg ${state.isId?'on':''}`}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>                                         
                                          {/* <p className={state.isId ? `error-msg on'` : `error-msg'`}>6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p> */}
                                       </div>
                                    </div>
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>비밀번호<i>*</i></h3>
                                       </div>
                                       <div className="right">
                                          <input 
                                          maxLength="16" 
                                          type="password" 
                                          id="pw" 
                                          name="pw" 
                                          placeholder="비밀번호를 입력해주세요" 
                                          onChange={onChangePw}
                                          />
                                          <p className={`error-msg error-msg1 ${state.isPw1 ? 'on':''}`}>최소 10자 이상 입력</p>
                                          <p className={`error-msg error-msg2 ${state.isPw2 ? 'on':''}`}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                                          <p className={`error-msg error-msg3 ${state.isPw3 ? 'on':''}`}>동일한 숫자 3개 이상 연속 사용 불가</p>
                                       </div>
                                    </div>
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>비밀번호확인<i>*</i></h3>
                                       </div>
                                       <div className="right">
                                          <input 
                                          maxLength="17" 
                                          type="password" 
                                          id="pw2" 
                                          name="pw2" 
                                          placeholder="비밀번호를 한번더 입력해주세요" 
                                          onChange={onChangePwOk}
                                          />
                                          <p className={`error-msg error-msg1 ${state.isPwOk1 ? 'on':''}`}>비밀번호를 한번 더 입력해 주세요.</p>
                                          <p className={`error-msg error-msg2 ${state.isPwOk2 ? 'on':''}`}>동일한 비밀번호를 입력</p>
                                       </div>
                                    </div>
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>이름<i>*</i></h3>
                                       </div>
                                       <div className="right">
                                          <input 
                                          maxLength="20" 
                                          type="text" 
                                          id="name" 
                                          name="name" 
                                          placeholder="이름을 입력해주세요" 
                                          onChange={onChangeName}
                                          value={state.이름}
                                          />
                                          <p className={`error-msg ${state.isName ? 'on':''}`}>이름을 입력해 주세요.</p>
                                       </div>
                                    </div>
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>이메일<i>*</i></h3>
                                       </div>
                                       <div className="right">
                                          <input 
                                          type="text" 
                                          id="email" 
                                          name="email" 
                                          placeholder="예: marketkurly@kurly.com" 
                                          onChange={onChangeEmail}
                                          />
                                          <button 
                                          className="emailok-btn" 
                                          type='button'
                                          onClick={onClickEmail}
                                          >
                                             중복확인
                                          </button>
                                          <p className={`error-msg error-msg1 ${state.isEmail1 ? 'on' : ''}`}>이메일을 입력해 주세요.</p>
                                          <p className={`error-msg error-msg2 ${state.isEmail2 ? 'on' : ''}`}>이메일 형식으로 입력해 주세요.</p>
                                       </div>
                                    </div>
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>휴대폰<i>*</i></h3>
                                       </div>
                                       <div className="right">
                                          <input 
                                          type="text" 
                                          id="hp" 
                                          name="hp" 
                                          placeholder="숫자만 입력해주세요" 
                                          onChange={onChangeHp}
                                          value={state.휴대폰}
                                          className={`${state.isHpInput ? 'on' : ''}`}
                                          disabled={state.isHpInput}
                                          />
                                          <button                                                                                     
                                          // disabled=false 이면 사용가능
                                          // disabled=true 이면 사용불가능
                                          disabled={!state.isHpButton}
                                          type='button' 
                                          className={`hp-btn ${state.isHpButton ? (`on${state.isHpButtonOn ? ' hide':''}`) : ''}`}
                                          onClick={onClickHpNumber}
                                          >
                                             인증번호 받기
                                          </button>
                                          <button 
                                          type='button' 
                                          className={`hp3-btn ${state.isHp3Btn ? 'on' : ''}`}
                                          onClick={onClickHp3Button}
                                          >
                                             다른번호 인증
                                          </button>
                                          <p className={`error-msg ${state.isHp ? 'on':''}`}>휴대폰 번호를 입력해 주세요.</p>
                                       </div>
                                    </div>
                              </li>
                              <li className={`hp2-box ${state.isHp2Box ? 'on':''}`}>
                                    <div className="wrap">
                                       <div className="left">
                                          {/* 휴대폰 인증번호 입력상자 */}
                                       </div>
                                       <div className="right">
                                          <input 
                                          type="text" 
                                          id="hp2" 
                                          className={state.isHp2 ? 'on':''} 
                                          name="hp2" 
                                          placeholder="숫자만 입력해주세요" 
                                          onChange={onChangeHp2}
                                          value={state.휴대폰인증번호입력}
                                          />
                                          <button 
                                          disabled={!state.isHp2Btn} 
                                          type='button' 
                                          className={`hp2-btn ${state.isHp2Btn ? 'on':''}`}
                                          onClick={onClickHp2Btn}
                                          >
                                             인증번호 확인
                                          </button>
                                       </div>
                                    </div>
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>주소<i>*</i></h3>
                                       </div>
                                       <div className="right">
                                          <input 
                                          type="text" 
                                          id="addr1" 
                                          name="addr1" 
                                          className={`${state.isAddress ? 'on' : ''}`} 
                                          placeholder="주소검색" 
                                          onChange={onChangeAddress1}  
                                          value={state.주소1}                                                                                  
                                          />
                                          <button type='button' className={`addr-btn${state.isAddress ? ' on' : ''}`}><img src="./img/ico_search.svg" alt="" />재검색</button>
                                          <button 
                                          type='button' 
                                          className={`addr-bar-btn${state.isAddress ? ' on' : ''}`}
                                          onClick={onClickAddressBtn}
                                          >
                                             <img src="./img/ico_search.svg" alt="" />주소 검색
                                          </button>
                                       </div>
                                    </div>
                              </li>
                              <li className={`addr2-box${state.isAddress ? ' on' : ''}`}>
                                    <div className="wrap">
                                       <div className="left">
                                          
                                       </div>
                                       <div className="right">
                                          <input 
                                          type="text" 
                                          id="addr2" 
                                          name="addr2" 
                                          placeholder="나머지 주소를 입력해주세요"
                                          onChange={onChangeAddress2} 
                                          value={state.주소2}                                         
                                          />
                                       </div>
                                    </div>
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
         
                                       </div>
                                       <div className="right">
                                          <p className="addr-info1">샛별배송</p>
                                          <p className="addr-info2">배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                                       </div>
                                    </div>
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>성별</h3>
                                       </div>
                                       <div className="right gender">
                                          <label htmlFor="male"><input onChange={onChangeGender} type="radio" id="male" className='gender-btn' name="gender" value="남자" />남자</label>
                                          <label htmlFor="female"><input onChange={onChangeGender} type="radio" id="female" className='gender-btn' name="gender" value="여자" />여자</label>
                                          <label htmlFor="none"><input onChange={onChangeGender} defaultChecked={true} type="radio" id="none" className='gender-btn' name="gender" value="선택안함" />선택안함</label>
                                       </div>
                                    </div>
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>생년월일</h3>
                                       </div>
                                       <div className="right birth">
                                          <div className="birth-box">
                                                <ul>
                                                   <li><div><input type="text" onChange={onChangeYear} maxLength="4" id="birthYear" name="birth_year"  placeholder="YYYY" /></div></li>
                                                   <li><i>/</i></li>
                                                   <li><div><input type="text" onChange={onChangeMonth} maxLength="2" id="birthMonth" name="birth_month"  placeholder="MM" /></div></li>
                                                   <li><i>/</i></li>
                                                   <li><div><input type="text" onChange={onChangeDate} maxLength="2" id="birthDate" name="birth_date"  placeholder="DD" /></div></li>
                                                </ul>
                                          </div>
                                          <p className={`error-msg${state.isBirth ? ' on' : ''}`}>{state.생년월일에러메시지}</p>
                                       </div>
                                    </div>
                              </li>
                              <li className="add-input1">
                                    <div className="wrap">
                                       <div className="left">
                                          <h3>추가입력사항</h3>
                                       </div>
                                       <div className="right add-input">
                                          <div className="radio-box">
                                                <label htmlFor="chooChunId">
                                                   <input onChange={onChangeAddInput}  type="radio" id="chooChunId" name="add_input" className='add-input-btn' value="추천인 아이디" />추천인 아이디
                                                </label>
                                                <label htmlFor="chamEvent">
                                                   <input onChange={onChangeAddInput}  type="radio" id="chamEvent"  name="add_input"  className='add-input-btn' value="참여 이벤트명" />참여 이벤트명
                                                </label>
                                          </div>
                                       </div>
                                    </div>                                
                              </li>
                              <li className={`add-input2${state.isAddInput ? ' on':''}`}>
                                    <div className="wrap">
                                       <div className="left">
                                          
                                       </div>
                                       <div className="right add-input">
                                          <input onChange={onChangeAddInputBox} type="text" id="addInputText" name="add_input_text"  placeholder="추천인 아이디를 입력해주세요" />
                                       </div>
                                    </div>    
                              </li>
                              <li className="add-input3">
                                    <div className="wrap">
                                       <div className="left">
                                          
                                       </div>
                                       <div className="right add-input">
                                          <p>
                                          추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                          가입 이후는 수정이 불가능 합니다.<br/>
                                          대소문자 및 띄어쓰기에 유의해주세요.
                                          </p>
                                       </div>
                                    </div>                                    
                              </li>
                              <li className="line-hr">
                                    <hr/>
                              </li>
                              <li>

                                    <div className="wrap">
                                       <div className="left">
                                          <h3>이용약관동의<i>*</i></h3>
                                       </div>
                                       <div className="right service">
                                          <div className="check-box all-check">
                                             <label htmlFor="allCheck">
                                                   <input onChange={onChangeServiceAllCheck} checked={state.이용약관동의.length>=7}  type="checkbox" id="allCheck" name="all_check" value="전체 동의합니다."/>전체 동의합니다.
                                             </label>
                                          </div>
                                          <div className="guid-text">
                                                <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                          </div>
                                       </div>
                                    </div> 

                              </li>

                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          
                                       </div>
                                       <div className="right service">
                                          <div className="check-box">
                                             <label htmlFor="check1">
                                                   <input type="checkbox" id="check1" name="check_1" className='chk-service'  onChange={onChangeServiceChecked}  checked={state.이용약관동의.includes("이용약관 동의(필수)")}   value="이용약관 동의(필수)" />이용약관 동의<i>(필수)</i>
                                             </label> 
                                          </div>
                                          <div className="check-box-right">
                                                <a href="!#">약관보기<i><img src="./img/arrow_r.svg" alt="" /></i></a>
                                          </div>
                                       </div>
                                    </div> 
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          
                                       </div>
                                       <div className="right service">
                                          <div className="check-box">
                                             <label htmlFor="check2">
                                                   <input  type="checkbox" id="check2" name="check_2" className='chk-service'   onChange={onChangeServiceChecked}  checked={state.이용약관동의.includes("개인정보 수집∙이용 동의(필수)")}    value="개인정보 수집∙이용 동의(필수)" />개인정보 수집∙이용 동의<i>(필수)</i>
                                             </label> 
                                          </div>
                                          <div className="check-box-right">
                                                <a href="!#">약관보기<i><img src="./img/arrow_r.svg" alt="" /></i></a>
                                          </div>
                                       </div>
                                    </div> 
                              </li>
                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          
                                       </div>
                                       <div className="right service">
                                          <div className="check-box">
                                             <label htmlFor="check3">
                                                   <input type="checkbox" id="check3" name="check_3" className='chk-service'  onChange={onChangeServiceChecked}  checked={state.이용약관동의.includes("개인정보 수집∙이용 동의(선택)")}    value="개인정보 수집∙이용 동의(선택)" />개인정보 수집∙이용 동의<i>(선택)</i>
                                             </label> 
                                          </div>
                                          <div className="check-box-right">
                                                <a href="!#">약관보기<i><img src="./img/arrow_r.svg" alt="" /></i></a>
                                          </div>
                                       </div>
                                    </div> 
                              </li>

                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          
                                       </div>
                                       <div className="right service">
                                          <div className="check-box">
                                             <label htmlFor="check4">
                                                   <input type="checkbox" id="check4" name="check_4" className='chk-service'  onChange={onChangeServiceChecked}  checked={state.이용약관동의.includes("무료배송, 할인쿠폰 등 혜택 /정보 수신 동의(선택)")}    value="무료배송, 할인쿠폰 등 혜택 /정보 수신 동의(선택)" />무료배송, 할인쿠폰 등 혜택/정보 수신 동의<i>(선택)</i>
                                             </label> 
                                          </div>
                                       </div>
                                    </div> 
                              </li>

                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          
                                       </div>
                                       <div className="right service">
                                          <div className="check-box chk56">
                                             <label htmlFor="check5">
                                                   <input type="checkbox" id="check5" name="check_5" className='chk-service'   onChange={onChangeServiceChecked}  checked={state.이용약관동의.includes("SMS")}    value="SMS" />SMS
                                             </label> 
                                             <label htmlFor="check6">
                                                   <input type="checkbox" id="check6" name="check_6" className='chk-service'  onChange={onChangeServiceChecked}   checked={state.이용약관동의.includes("이메일")}   value="이메일" />이메일
                                             </label> 
                                          </div>
                                       </div>
                                    </div> 
                              </li>


                              <li>
                                    <div className="wrap">
                                       <div className="left">
                                          
                                       </div>
                                       <div className="right service">
                                          <div className="check-box">
                                             <label htmlFor="check7">
                                                   <input type="checkbox" id="check7" name="check_7" className='chk-service'  onChange={onChangeServiceChecked}  checked={state.이용약관동의.includes("본인은 만 14세 이상입니다.(필수)")}   value="본인은 만 14세 이상입니다.(필수)" />본인은 만 14세 이상입니다.<i>(필수)</i>
                                             </label> 
                                          </div>
                                       </div>
                                    </div> 
                              </li>
                           </ul>

                           <div className="button-box">
                              <button 
                              type="submit" 
                              className='submit-btn'
                              onClick={onClickSumbmit}
                              >
                                 가입하기                              
                              </button>
                           </div>

                        </form>
                     </div>
                  
               </div>                

               {/* 회원가입 컨펌 모달창 */}
               { state.isConfirmModal &&  <ConfirmModal   isConfirmModalCloseFn={isConfirmModalCloseFn}  isConfirmModalText={state.isConfirmModalText} />}
            </div>
         </main>
   );
};


//////////////////////////////////////////////////////////////////////////////////////
// 프롭 타입스 PropTypes
//////////////////////////////////////////////////////////////////////////////////////
SingupComponent.propType = {

   회원: PropTypes.shape({
      아이디: PropTypes.string.isRequired,     // 문자열
      isId: PropTypes.bool.isRequired,         // 논리 boolean => bool
      아이디중복확인: PropTypes.bool.isRequired,       // 논리 boolean => bool


      비밀번호: PropTypes.string.isRequired,     // 문자열
      isPw1: PropTypes.bool.isRequired,
      isPw2: PropTypes.bool.isRequired,
      isPw3: PropTypes.bool.isRequired,


      비밀번호확인: PropTypes.string.isRequired,
      isPwOk1: PropTypes.bool.isRequired,
      isPwOk2: PropTypes.bool.isRequired,


      이름: PropTypes.string.isRequired,
      isName: PropTypes.bool.isRequired,


      이메일: PropTypes.string.isRequired,
      isEmail1: PropTypes.bool.isRequired,
      isEmail2: PropTypes.bool.isRequired,
      이메일중복확인: PropTypes.bool.isRequired,


      휴대폰: PropTypes.string.isRequired,
      휴대폰인증번호발급: PropTypes.number.isRequired,  // 숫자형
      휴대폰인증번호입력: PropTypes.string.isRequired,
      isHp: PropTypes.bool.isRequired,
      isHpButton: PropTypes.bool.isRequired,
      isHpButtonOn : PropTypes.bool.isRequired,
      isHp2Box: PropTypes.bool.isRequired,
      isHp2: PropTypes.bool.isRequired,
      isHp2Btn: PropTypes.bool.isRequired,
      isHp3Btn : PropTypes.bool.isRequired,
      isHpInput: PropTypes.bool.isRequired,
      휴대폰인증확인: PropTypes.bool.isRequired,
      

      주소1: PropTypes.string.isRequired,
      주소2: PropTypes.string.isRequired,
      isAddress: PropTypes.bool.isRequired,

   
      성별: PropTypes.string,     // 선택


      생년: PropTypes.string,             // 선택
      생월: PropTypes.string,             // 선택
      생일: PropTypes.string,             // 선택
      isBirth: PropTypes.bool,            // boolean
      생년월일에러메시지: PropTypes.string, //string


      추가입력사항: PropTypes.string,           // 선택 string
      isAddInput: PropTypes.bool,               // 선택 boolean
      추가입력사항입력상자: PropTypes.string,   // 선택 string

   
      이용약관: PropTypes.array.isRequired,
      이용약관동의: PropTypes.array.isRequired,

      
      // 컨펌모달창
      isConfirmModal: PropTypes.bool,
      isConfirmModalText: PropTypes.string
   })

}




SingupComponent.defaultProps = {

   회원 : {
      아이디:'',
      isId: false,

      아이디중복확인:false,


      비밀번호:'',
      isPw1: false,
      isPw2: false,
      isPw3: false,

      비밀번호확인:'',
      isPwOk1: false,
      isPwOk2: false,


      이름: '',
      isName: false,


      이메일:'',
      isEmail1: false,
      isEmail2: false,


      이메일중복확인:false,


      휴대폰:'',
      휴대폰인증번호발급:'',
      휴대폰인증번호입력:'',
      isHp: false,
      isHpButton: false,
      isHpButtonOn : false,
      isHp2Box: false,
      isHp2: false,
      isHp2Btn: false,
      isHp3Btn : false,
      isHpInput: false,
      휴대폰인증확인:false,
      
      주소1:'',
      주소2:'',
      isAddress: false,
   
      성별:'선택안함',     // 선택
      생년:'',            // 선택
      생월:'',            // 선택
      생일:'',            // 선택
      isBirth: false,     // boolean
      생년월일에러메시지: '', //string

      추가입력사항: '',    // 선택 string
      isAddInput: false,   // 선택 boolean
      추가입력사항입력상자: '',// 선택 string

   
      이용약관:[
         '이용약관 동의(필수)',
         '개인정보 수집∙이용 동의(필수)',
         '개인정보 수집∙이용 동의(선택)',
         '무료배송, 할인쿠폰 등 혜택 /정보 수신 동의(선택)',
         'SMS',
         '이메일',
         '본인은 만 14세 이상입니다.(필수)'
      ],
      이용약관동의:[],
      
      // 컨펌모달창
      isConfirmModal: true,
      isConfirmModalText: ''
   }
   
}

export default SingupComponent;