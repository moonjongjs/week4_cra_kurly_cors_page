(function($){

   const QuickMenu = {
      init: function(){
         this.quickEvent();
      },
      quickEvent: function(){         
         let quickMenuTop = 0;
         let winCenter = ( $(window).height()-486.312 )/2;


         if( pos === 'intro' ){
            quickMenuTop = $('#section2 .slide-container').offset().top; 
            // quickMenuTop = 706;
         }
         else {
            quickMenuTop = 250;
         }
         
    
         // 위의 조건문이 수행된뒤 퀵메뉴 탑값이 정해지면 top : 706 또는 250 
         $('#quickMenu').stop().animate({ top: quickMenuTop }, 300);


         // 스코롤이 발생되면 동작한다.
         $(window).scroll(function(){

            scrollEvent();

         });

         function scrollEvent(){
            if( $(window).scrollTop() >= quickMenuTop ){
               $('#quickMenu').stop().animate({ top: winCenter + $(window).scrollTop() }, 300);
            }
            else {
               $('#quickMenu').stop().animate({ top: quickMenuTop }, 300);
            }
         }
         scrollEvent();

      }
   }

   QuickMenu.init();


})(jQuery);