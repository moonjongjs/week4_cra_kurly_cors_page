import React from 'react';

// 프롭스는 상위 컴포넌트에서 하위컴포넌트에 내려주는 변수나 함수등이 있다.
// function HeaderComponent({siginInFn, singUpFn}) {      {함수1,함수2} 비구조화   => 프롭스 값이 몇개 안될 때 사용이 좋다
// console.log( siginInFn );
// console.log( singUpFn );

function HeaderComponent(props) {             // 프롭스 많울 때는 props로  props.함수1,  props.함수2  props 로 직접 받는다 모두

   // console.log( props.siginInFn );
   // console.log( props.singUpFn );

   // 비구조화 === 구조 분할 할당 => 프롭스 사용 편리하게 이용
   const {setIntroFn, siginInFn, singUpFn}  = props;
   // console.log( siginInFn );
   // console.log( singUpFn );


   // 버튼 클릭 이벤트 ////////////////////////
   // 인트로 버튼 클릭 이벤트
   const onClickIntroFn=(e)=>{
      e.preventDefault();
      setIntroFn();
   }



   // 회원가입 버튼 클릭 이벤트 : 반드시 화살표함수 사용한다.
   const onClickSignUp=(e, a,b)=>{
      e.preventDefault();
      //alert('회원가입함수 실행');
      singUpFn(); // 회원가입 함수 호출 실행
      //singUpFn(a,b); // 회원가입 함수 호출 실행 매개변수 아규먼트로 전달
   }

   // 로그인 버튼 클릭 이벤트
   const onClickSignIn=(e,a,b,c)=>{
      e.preventDefault();
      // alert('로그인함수');
      siginInFn(); // 로그인 함수 호출 실행
      // siginInFn(a,b,c); // 로그인 함수 호출 실행  매개변수 아규먼트로 전달
   }



   return (
      <header id="header">
            <div className="container">
               <div className="row1">
                  <div className="content">
                        <aside id="aside">
                           <span>
                                 <a 
                                 /* 아규먼트 값 이벤트, 메시지 보내는 경우 :  반드시 화살표함수 사용 */
                                 onClick={onClickSignUp} 
                                 // onClick={(e)=>onClickSignUp(e,'회원가입')} 
                                 // onClick={(e)=>onClickSignUp(e, e.target.title, e.target.href )} 
                                 href="<?=$sub_path?>member_gaib/" 
                                 title="회원가입" 
                                 className="login-info1 on"
                                 >회원가입</a>
                           </span>
                           <span><i>|</i></span>
                           <span>
                                 <a 
                                 onClick={onClickSignIn}
                                 // onClick={(e)=>onClickSignIn(e, e.target.href, e.target.title, e.target.className)}
                                 href="<?=$sub_path?>login/" 
                                 title="로그인" 
                                 className='login-info2' 
                                 >로그인</a>
                           </span>
                           <span><i>|</i></span>
                           <span>
                              <a href="<?=$sub_path?>call_center/" title="고객센터" className='call-center-btn'>
                                    고객센터<img src="<?=$path?>img/ico_down_16x10.png" alt="" />
                              </a>
                           </span>
      
                           <div className="member-popup">
                              <ul>
                                    <li><a href="<?=$tooltip_menu_path1?>">공지사항</a></li>
                                    <li><a href="<?=$tooltip_menu_path2?>sub_sub_2/">자주하는 질문</a></li>
                                    <li><a href="<?=$tooltip_menu_path2?>sub_sub_3/">1:1문의</a></li>
                                    <li><a href="<?=$tooltip_menu_path2?>sub_sub_4/">대량주문문의</a></li>
                              </ul>

                           </div>

                        </aside>
                  </div>
               </div>
               <div className="row2">
                  <div className="content">
                        <div className="left">                       
                           <span>
                                 <a 
                                 onClick={onClickIntroFn}
                                 href="<?=$path?>" 
                                 title="마켓컬리"
                                 >
                                 <i>
                                    <img src="<?=$path?>img/bi_85x42.svg" alt="" />
                                 </i>
                                 마켓컬리
                                 </a>
                              </span>
                           <span><i>|</i></span>
                           <span><a href="!#" title="뷰티컬리">뷰티컬리 <img src="<?=$path?>img/n_7x7xfa622f.svg" alt="" /></a></span>
                        </div>
                        <div className="center">
                           <div>
                              <input type="text" id="search" name="search" placeholder="검색어를 입력해주세요." />
                              <span className="search-box">
                                    <a href="!#" className="search-btn"><img src="<?=$path?>img/ico_search.svg" alt="" /></a>
                              </span>
                           </div>
                        </div>
                        <div className="right">
                           <div>
                              <span><a href="!#" title="배송지"><img src="<?=$path?>img/icon1.svg" alt="" /></a></span>
                              <span><i></i></span>
                              <span><a href="!#" title="찜하기"><img src="<?=$path?>img/icon2.svg" alt="" /></a></span>
                              <span><i></i></span>
                              <span><a href="!#" title="장바구니"><img src="<?=$path?>img/icon3.svg" alt="" /></a></span>
                           </div>
                        </div>
                  </div>
               </div>
               <div className="row3">
                  <div className="content">
                        <div className="left">
                           <a href="!#" title="카테고리">
                              <i><img src="<?=$path?>img/bars.svg" alt="" /></i>
                              <i>카테고리</i>
                           </a>
                        </div>
                        <div className="center">
                           <ul>
                              <li><a href="<?=$sub_path?>main1/" className="main-btn" title="신상품">신상품</a></li>
                              <li><a href="<?=$sub_path?>main2/" className="main-btn" title="베스트">베스트</a></li>
                              <li><a href="<?=$sub_path?>main3/" className="main-btn" title="알뜰쇼핑">알뜰쇼핑</a></li>
                              <li><a href="<?=$sub_path?>main4/" className="main-btn" title="특가/혜택">특가/혜택</a></li>
                           </ul>
                        </div>
                        <div className="right">
                           <a href="!#" title="샛별・낮 배송안내">
                              <i>샛별・낮</i><i>배송안내</i>
                           </a>
                        </div>
                  </div>                
               </div>
            </div>
      </header>
   );
};

export default HeaderComponent;