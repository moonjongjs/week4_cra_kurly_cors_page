(function($){

  const GoTop = {
      init: function(){
         this.mainFn();
      },
      mainFn: function(){
         let s3Top = 0;
         $('#goTop').stop().fadeOut(0);  //숨겨라

         if( pos === 'intro'){
            s3Top = $('#section3').offset().top; 
         }
         else {
            s3Top = 250;
         }

         
         


         scrollEvent();
         
         function scrollEvent(){
            if( $(window).scrollTop() >= s3Top  ){
               $('#goTop').stop().fadeIn(300);
            }
            else{
               $('#goTop').stop().fadeOut(300);
            }
   
         }
                  
         $(window).scroll(function(){

            scrollEvent();

         });


         // 고탑 버튼 클릭 이벤트
         $('.go-top-btn').on({
            click: function(){
               //맨위로 부드럽게 이동(스무스 스크롤링)
               $('html, body').stop().animate({ scrollTop: 0  }, 600);
            }
         })

      }
  }
  GoTop.init();


})(jQuery);