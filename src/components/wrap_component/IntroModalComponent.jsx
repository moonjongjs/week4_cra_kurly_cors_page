import React, { Component } from 'react';
import modalImage from '../../img/85ccaa0c-b2d9-48f4-8710-1fbc4d17fddb.jpg';
import '../../scss/intro_modal.scss';

class IntroModalComponent extends Component {
   render() {

      const {setIntModalFn} = this.props;

      const onClickIntroModalClose=()=>{
         setIntModalFn();  // 상위 컴포넌트에서 받은 프롭스
      }

      const onClickIntroModalCookieClose=()=>{
         let newDate = new Date();
         // newDate.setDate( newDate.getDate() + 3 ); //오늘날짜에 3일 더하기
         // document.cookie = `MJKURLYINTROMODAL=MARKETKURLYINTROMODAL; path=/; expires=${newDate.toUTCString()};`;
         // localstorage
         // 다시는 안보기(이브라우저에서는 안보겠다)
         // key Name : mainNotice
         // key Value : [{"id":100160,"noShowTime":1707321372852}]
         
         let obj = {
            id: Math.floor(900000*Math.random())+100000,
            noShowTime: 1707321372899
         }

         localStorage.setItem('MJKURLYINTROMODAL', JSON.stringify(obj) );

         this.props.setIntModalFn();
      }

      return (
         <div id='introModal' className='on'>
            <div className='container'>
               <div className="img-box">
                  <img src={modalImage} alt="" />
               </div>   
               <div className="button-box">
                  <button  onClick={onClickIntroModalCookieClose}>다시안보기</button>
                  <button  onClick={onClickIntroModalClose}>닫기</button>
               </div>
            </div>         
         </div>
      );
   }
}

export default IntroModalComponent;