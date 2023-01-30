import React, { Component } from 'react';
import '../../../scss/confirm_modal.scss';

class ConfirmModal extends Component {
   render() {

      const onClickConfirmClose=(e)=>{
         e.preventDefault();

         this.props.isConfirmModalCloseFn(); // 상위 컴폰넌트 상태변수 모달닫기 함수 호출 실행
      }

      return (
            <div id="confirmModal" className='on'>
               <div className="confrim-container">
                  <div className="confirm-box">
                        <h2 className='confirm-text'>{this.props.isConfirmModalText}</h2>
                  </div>
                  <div className="button-box">
                        <button onClick={onClickConfirmClose} className='confirm-close-btn'>확인</button>
                  </div>
               </div>
            </div>
      );
   }
}

export default ConfirmModal;