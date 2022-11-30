import 'react-lazy-load-image-component/src/effects/blur.css'
import {lazyloadImg} from "../../../utils/lazyloadImg";
import React, {useCallback, useEffect, useState, useRef} from "react";
import AnimatedPage from "../../../utils/AnimatedPage";

const imageData = [
   {
      id: 1,
      src: 'http://newlook.vokayly7.beget.tech/wp-content/uploads/2021/07/wallhaven-j5qem5-scaled.jpg'
   },
   {
      id: 2,
      src: 'http://newlook.vokayly7.beget.tech/wp-content/uploads/2021/06/wallhaven-wq11e7-scaled.jpg'
   },
   {
      id: 3,
      src: 'http://newlook.vokayly7.beget.tech/wp-content/uploads/2021/06/wallhaven-l3zmwy.jpg'
   },
   {
      id: 4,
      src: 'http://newlook.vokayly7.beget.tech/wp-content/uploads/2021/06/wallhaven-j3w3qq.jpg'
   },
   {
      id: 5,
      src: 'http://newlook.vokayly7.beget.tech/wp-content/uploads/2021/06/wallhaven-e78ldl-scaled.jpg'
   },
]



const ImageListElem = () => {

   let imageDataList = imageData.map((image) => {
      return(
         <img /*ref={containerRef}*/ className="lazyImg" style={{height: '1500px', width: 'auto'}} data-src={image.src} key={image.id} alt="img"/>
         // <LazyLoadImage src={image.src} key={image.key} afterLoad={function(){console.log('2222')}}  effect="blur"/>
      )
   })

   useEffect(() => {
      lazyloadImg();

      // document.querySelector('.sectionAfter').classList.add("_show");
      // return () => {
      //    document.querySelector('.sectionAfter').classList.remove("_show");
      // }
   },[/*containerRef, imgOptionsList*/])


   return (
      <AnimatedPage>
         <div className={'contain'}>
            <h1>Lazy Load Images</h1>
            <section>
               {imageDataList}
               <div className="testImg lazyImg" data-src={imageData[3].src} style={{height: '1500px', border: '1px solid red', width: '100%'}}></div>

            </section>
         </div>
      </AnimatedPage>
   );
}



export default ImageListElem
