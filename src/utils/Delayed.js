import React, { useState, useEffect } from 'react';

// type Props = {
//    children: React.ReactElement;
//    waitBeforeShow?: number;
// };


const Delayed = ({ children, waitBeforeShow = 1000 }) => {
   // Задержка перед рендером компонента

   const [isShown, setIsShown] = useState(false);

   useEffect(() => {
      // console.log(waitBeforeShow);
      setTimeout(() => {
         setIsShown(true);
      }, waitBeforeShow);
   }, [waitBeforeShow]);


   // эффект плавного появления
   // useEffect(() => {
   //    setTimeout(() => {
   //       document.querySelector('.delayBlock').classList.add('_show')
   //    }, 200);
   //    return () => {
   //       document.querySelector('.delayBlock').classList.remove('_show')
   //    }
   // },[])

   return isShown ? children : null;
   // return children
};

export default Delayed;