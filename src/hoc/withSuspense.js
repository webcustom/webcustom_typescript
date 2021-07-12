import React from 'react';
import Preloader from "../components/common/Preloader/Preloader";




// High Order Component просто контейнерная компонента ее можно вызывать с разных мест добавляющая свою логику, в нее можно закинуть любую компоненту
// просто прячем логику во внутрь компоненты
export const withSuspense = (Component) => {
   return (props) => {
      return <React.Suspense fallback={<Preloader />}>
         <Component {...props} />
      </React.Suspense>
   };
}
