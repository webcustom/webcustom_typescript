//Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

import styles from "./Gallery_1.module.sass";
import React, {useEffect, useRef, useState} from "react";
import Popup from "../Popup/Popup";
import SwiperGallery_1 from "../SwiperGallery_1/SwiperGallery_1";




const Gallery_1 = (props) => {
   // console.log(props)

   const [showPopup, setShowPopup] = useState(false);
   const [numberSlide, setNumberSlide] = useState(0);

   let showPopupGallery = (e) =>{
      setNumberSlide(e.target.dataset.num)
      setShowPopup(true)
         // console.log(e.target.dataset.num)
   }
   let stopClick = e => {
      e.stopPropagation()
   }

   let projectGalleryElements = undefined;
   if(props.projectDetailGallery) {
      projectGalleryElements = props.projectDetailGallery.miniature.map(
         (elem, index) => <div key={index} className={styles.item} style={{backgroundImage: `url(${elem})` }} data-num={index} onClick={showPopupGallery}></div>
      );
   }

   return <>
      {projectGalleryElements ?
         <div className={styles.galleryImgs_1}>
            {projectGalleryElements}
         </div> : ''}

      {showPopup ? <Popup setShowPopup={setShowPopup} flag={showPopup}>
         <SwiperGallery_1 projectDetailGallery={props.projectDetailGallery} numberSlide={numberSlide}>
            <div className="dots_1 swiperDots_1" onClick={stopClick}></div>
         </SwiperGallery_1>
      </Popup> : ''}

      {/*{showPopup ? <Popup numberSlide={numberSlide} setShowPopup={setShowPopup} flag={showPopup} projectDetailGallery={props.projectDetailGallery}/> : ''}*/}
      </>
};




export default Gallery_1;