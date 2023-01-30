import React from 'react';
import SinginComponent from "./main_component/SinginComponent";
import SingupComponent from "./main_component/SingupComponent";
import IntroComponent from "./main_component/IntroComponent";

function MainComponent({intro, singIn, singUp}){ //최상위 컴포넌트에서 프롭스(변수속성)로 내려준다.

 
   return (
      <div id='main'>        
         { intro  && <IntroComponent />  }
         
         {/* 
         { main1  && <Min1Component />  }
         { main2  && <Min2Component />  }
         { main3  && <Min3Component />  }
         { main4  && <Min4Component />  } 
         */}

         { singIn && <SinginComponent /> }
         { singUp && <SingupComponent /> }
      </div>
   );
};

export default MainComponent;