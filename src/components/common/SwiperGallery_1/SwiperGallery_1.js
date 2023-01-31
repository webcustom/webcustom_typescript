import React, {useEffect, useRef} from "react";
// import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import Preloader from "../Preloader/Preloader";
import { Swiper, SwiperSlide } from 'swiper/react';



const  SwiperGallery_1 = (props) => {

   // console.log(props)

   const swiperRef = useRef(null); //ссылка для взаймодействия со слайдером

   let projectGalleryElementsSlider = props.projectDetailGallery.bigsize.map(
      (elem, index) => <SwiperSlide key={index}><img className={'item' + ' swiper-lazy'}  data-src={elem}/></SwiperSlide>
   );

   // let stopClick = e => {
   //    e.stopPropagation()
   // }

   useEffect(() => {
      swiperRef.current?.swiper.slideTo(props.numberSlide); //показываем нужный слайд
   })

   // кастомная навигация стрелки
   // const [isShowPrev, setShowPrev] = useState(false);
   // const [isShowNext, setShowNext] = useState(false);
   // let showHideNavButton = (swiper) =>{
   //    if((swiper.activeIndex + 1) != 1){
   //       setShowPrev(true)
   //    }else{
   //       setShowPrev(false)
   //    }
   //    if((swiper.activeIndex + 1) < swiper.slides.length){
   //       setShowNext(true)
   //    }else{
   //       setShowNext(false)
   //    }
   // }

   return <>
      <div className="galleryWrap">
         {/*{isShowPrev ? <div className="navButton _prev" onClick={() => swiperRef.current.swiper.slidePrev()}><svg><use href="/img/#arrow_1" /></svg></div> : ''}*/}
         {/*{isShowNext ? <div className="navButton _next" onClick={() => swiperRef.current.swiper.slideNext()}><svg><use href="/img/#arrow_1" /></svg></div> : ''}*/}
         <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            ref={swiperRef}
            spaceBetween={0}
            slidesPerView={1}
            allowTouchMove={true}
            navigation={false}
            pagination={{
               el: '.swiperDots_1',
               clickable: true,
               // renderBullet: function (index, className) {
               //    return `<span class="qqq dot swiper-pagination-bullet">${index}</span>`; // задаем свой html для pagination
               // },
            }}
            lazy={true}
            autoHeight={true}
            // onSlideChange={(swiper) => showHideNavButton(swiper)}
            // onSwiper={
            //    (swiper) => showHideNavButton(swiper)
            // }
         >
            {projectGalleryElementsSlider}

         </Swiper>
         {/*<div className="dots_1 swiperDots_1" onClick={stopClick}></div>*/}

      </div>
   </>
}

export default SwiperGallery_1