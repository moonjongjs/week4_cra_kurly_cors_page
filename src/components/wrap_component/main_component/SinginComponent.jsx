import React from 'react';

function SinginComponent() {
   return (
         <main id="main" className="login">
               <div className="container">
                              
                  <div id="login">
                     <form autoComplete="off">
                           <ul>
                              <li>
                                 <h1 id="titleId" title="로그인">로그인</h1>
                              </li>
                              <li>
                                 <input type="text" id="id" name="id" placeholder="아이디를 입력해주세요" />
                              </li>
                              <li>
                                 <input type="text" id="pw" name="pw" placeholder="비밀번호를 입력해주세요" />
                              </li>
                              <li>
                                 <a href="!#">아이디 찾기</a>
                                 <i>|</i>
                                 <a href="!#">비밀번호 찾기</a>
                              </li>
                              <li>
                                 <button className="login-btn">로그인</button>
                              </li>
                              <li>
                                 <button className="gaib-btn">회원가입</button>
                              </li>
                           </ul>
                     </form>
                  </div>

               </div>
         </main>
   );
};

export default SinginComponent;