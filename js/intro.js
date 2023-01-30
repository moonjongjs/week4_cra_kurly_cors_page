(function($){
  
    const Kurly = {
        init: function(){
            this.mainSlide();

            for(let i=2; i<=15; i++){                                
                if( i!==3 ){  //i의 값이 2 ~ 15 까지 3을 제외하고 값을 전달
                    this.publicSection( i ); //아규먼트(전달인자) i=2 ~ 15
                }
            }
        },
        // 메인 슬라이드 메서드(함수)
        mainSlide: function(){
            let cnt = 0;  //전역변수 : 증가 변수는 맨위에 설정한다.  초기값은 0
            let setId = 0; //전역변수 : 타이머 할당 번호를 기억하는 변수

            //1. 메인슬라이드 함수 (애니메이션 오른쪽에서 왼쪽으로이동)
            function mainSlide(){
                $('#section1 .slide-wrap').stop().animate({left: -100*cnt + '%'}, 600, function(){
                    if(cnt>=16){ //first를 만나면
                    cnt=0;  //첫번째 슬라이드 번호 0 으로 설정
                    $('#section1 .slide-wrap').stop().animate({left: -100*cnt + '%'}, 0); //첫번재로 리턴  forwords
                    }
                    if(cnt<=-1){ //last를 만나면
                    cnt=15;  //마지막 슬라이드 번호(16개스라이드 인덱스 번호는 0 1 .... 14 15 )
                    $('#section1 .slide-wrap').stop().animate({left: -100*cnt + '%'}, 0);  //마지막 슬라이드로 리턴 backwords
                    }
                });
            
                $('#section1 .cnt-num').text( cnt===16 ? 1 : (cnt+1===0?16:cnt+1) );  //괄호를 해주고 그안에서 한번더 3항연산자사용 해결(디버깅)
            }
                
            //2-1. 다음카운트 함수 (1씩 증가 카운트)
            function nextCount(){
                cnt++; 
                mainSlide();   //메인슬라이드함수 호출 왜?  cnt 변수 값을 전달 하기 위해서
            }  

            //2-2. 이전(Preview 프리뷰)카운트 함수 (1씩 감소 카운트)
            function prevCount(){
                cnt--; 
                mainSlide();   //메인슬라이드함수 호출 왜?  cnt 변수 값을 전달 하기 위해서
            }  


            //3-1. 다음화살버튼 클릭(click) 이벤트(event) 
            $('#section1 .next-btn').click(function(event){
                event.preventDefault();
                if( $('#section1 .slide-wrap').is(':animated')===true  ){ //애니메이션 진행 할 때는 리턴문 실행 
                    return;  //호출안하고 아무것도 없이 리턴한다.(취소) 여기서 끝난다. 아래 함수는 실행 못하고 끝난다.
                }
                nextCount(); //애니메이션 진행 안할 때 만 호출
                
            });

            // 3-2 이전화살버튼 클릭(click) 이벤트(event)
            $('#section1 .prev-btn').click(function(event){
                event.preventDefault();
                if( $('#section1 .slide-wrap').is(':animated')===false ){
                    prevCount();
                }
            });

            // 자동타이머 함수 
            function autoTimer(){
                // 메모리에 할당 인덱스 번호가 있다. 그래서 변수에 그 할당 인덱스 번호를 저장해 두고
                // 그번호를 이용해서 정지할 수 있다.
                clearInterval(setId);
                setId = setInterval(nextCount, 1000*3);
            }

            autoTimer();  //홈페이지가 열리면 함수 1회 호출


            // slide-container 위에 마우스가 올라가면(마우스오버)
            $('#section1 .slide-container').mouseover(function(){
                    $('#section1 .arrow').stop().fadeIn(300);  //페이드인 효과
            });

            // slide-container 위에 마우스가 떠나면(마우스아웃)
            $('#section1 .slide-container').mouseout(function(){
                    $('#section1 .arrow').stop().fadeOut(300);  //페이드아웃 효과
            });


            // 자동타이머는 선택자 .slide-container 에 마우스 올리면 자동타이머(셋인터발) 일시정지
            $('#section1  .slide-container').mouseover(function(){
                clearInterval( setId ); //타이머 일시중지
            })

            // 선택자 .slide-container 를 마우스가 떠나면 자동 플레이지(자동타이머실행)
            $('#section1  .slide-container').mouseout(function(){
                autoTimer(); //자동 타이머 함수 호출                 
            })
        },

        // 콘텐츠 PUBLIC SLIDE 2 ~ 15
        publicSection: function(z){  //매개변수 
            let cnt=0;
       
            mainSlide(); //좌우화살 때문에 로딩시 실행해서 조건문 수행
            //1. 메인슬라이드 함수
            
            // #section${z} #section2, #section4, ... #section15
            function mainSlide(){
               $(`#section${z} .slide-wrap`).stop().animate({ left: -1064*cnt }, 300);
                //끝이면 다음화살 숨기기
                if(cnt>=4){
                    $(`#section${z} .next-btn-box`).stop().fadeOut(300);
                }
                else{
                    $(`#section${z} .next-btn-box`).stop().fadeIn(300);
                }
                //처음이면 이전화살 숨기기
                if(cnt<=0){
                    $(`#section${z} .prev-btn-box`).stop().fadeOut(300);
                }
                else{
                    $(`#section${z} .prev-btn-box`).stop().fadeIn(300);
                }

            }
            
            //2. 다음카운트 함수
            function nextCount(){
                cnt++;
                if(cnt>4){
                    cnt=4;                   
                }
                mainSlide();
            }
            //2. 이전카운트 함수
            function prevCount(){
                cnt--;
                if(cnt<0){
                    cnt=0;
                }
                mainSlide();
            }

            //3. 다음화살버튼 클릭 이벤트
            $(`#section${z} .next-btn`).click(function(e){
                e.preventDefault();
                if( !$(`#section${z} .slide-wrap`).is(':animated') ){
                    nextCount();
                }
            });
            //3. 이전화살버튼 클릭 이벤트
            $(`#section${z} .prev-btn`).click(function(e){
                e.preventDefault();

                if( !$(`#section${z} .slide-wrap`).is(':animated') ){
                // if( $('.#section2 .slide-wrap').is(':animated')===false  ){
                    prevCount();
                }                

            });
        }
    }

    Kurly.init();


})(jQuery);