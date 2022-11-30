// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';//'SvgSpriteImg/react';

//Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';
import 'swiper/modules/scrollbar/scrollbar.scss';
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
      projectGalleryElements = props.projectDetailGallery.map(
         (elem, index) => <div key={elem.gallery_img.id} className={styles.item} style={{backgroundImage: `url(${elem.gallery_img.sizes.thumbnail})` }} data-num={index} onClick={showPopupGallery} data-detail={elem.gallery_img.url}></div>
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