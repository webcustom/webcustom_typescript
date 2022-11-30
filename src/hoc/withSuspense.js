import React, {Suspense, useEffect} from 'react';
import Preloader from "../components/common/Preloader/Preloader";
import {lazyloadImg} from "../utils/lazyloadImg";
import {Route} from "react-router-dom";
import PageMain from "../components/PageMain/PageMain";
import Delayed from "../utils/Delayed";




// High Order Component просто контейнерная компонента ее можно вызывать с разных мест добавляющая свою логику, в нее можно закинуть любую компоненту
// просто прячем логику во внутрь компоненты
export const withSuspense = (Component) => {
   // alert(111)
   // return (props) => {
   //    return <React.Suspense fallback={<Preloader />}>
   //
   //       <Component {...props} />
   //
   //    </React.Suspense>
   // };
   return (props) => {
      return <Suspense fallback={<Preloader />}>
         1111
         <Component {...props} />

      </Suspense>
   };
}


//React.Suspense - позволяет ожидать загрузки компонента, а пока это не произошло показывается fallback