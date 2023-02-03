import React, {Suspense, useEffect} from 'react';
import Preloader from "../components/common/Preloader/Preloader";


export interface HOCProps {
   test: number;
}
// type WithoutPrefilled<T extends HOCProps> = Pick<T, Exclude<keyof T, 'foo'>>;

// High Order Component просто контейнерная компонента ее можно вызывать с разных мест добавляющая свою логику, в нее можно закинуть любую компоненту
// просто прячем логику во внутрь компоненты
// export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
//    return (props: WCP) => {
//       return <React.Suspense fallback={<Preloader />}>
//          <WrappedComponent {...props} />
//       </React.Suspense>
//    };
// }

export function withSuspense <WCP extends HOCProps>(WrappedComponent: React.ComponentType<WCP>) {
   return (props: WCP) => {
      return <React.Suspense fallback={<Preloader />}>
         <WrappedComponent {...props} />
      </React.Suspense>
   };
}


//React.Suspense - позволяет ожидать загрузки компонента, а пока это не произошло показывается fallback