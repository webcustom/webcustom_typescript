import React, {Suspense, useEffect, useRef, useState} from "react";
import SwiperCore, { Lazy } from 'swiper';



SwiperCore.use([ Lazy ]); //для работы lazyload swiper




const Popup = (props) => {
   console.log(props)

   const [isShow, setShow] = useState(false);
   const [isShow_2, setShow_2] = useState(false);

   // const swiperRef = useRef(null); //ссылка для взаймодействия со слайдером


   useEffect(() => {
      document.body.classList.add('_noScroll');
      setTimeout(function(){
         setShow(!isShow);
      },100)
      setTimeout(function(){
         setShow_2(!isShow_2);
      },300)

      // swiperRef.current?.swiper.slideTo(props.numberSlide); //показываем нужный слайд
   },[])

   let stopClick = e => {
      e.stopPropagation()
   }

   let closePopup = (e) =>{
      setShow_2(false)
      setTimeout(function() {
         setShow(false)
      },300)
      setTimeout(function(){
         document.body.classList.remove('_noScroll');
      },600)
      setTimeout(function(){
         props.setShowPopup(false)
      },1000)
   }



   // let projectGalleryElementsSlider = props.projectDetailGallery.map(
   //    elem => <SwiperSlide key={elem.gallery_img.id}><img key={elem.id} className={'item' + ' swiper-lazy'}  data-src={elem.gallery_img.url}/></SwiperSlide>
   // );


   return <>
         <div className={`${'popupBlock'} ${isShow ? '_show' : ''}`} onClick={closePopup}>
            {/*<svg className="closeIcon" onClick={closePopup}>*/}
            {/*   <use href={svgSprite+"#close"}/>*/}
            {/*</svg>*/}
            <svg className={'closeIcon'} viewBox="0 0 12 12" fill="none"><path d="M10.1134 1.96826L1.56909 10.5125"/><path d="M1.56909 1.96826L10.1134 10.5125"/></svg>


            <div className={`${'popupItem _t1'} ${isShow_2 ? '_show' : ''}`} onClick={stopClick}>
               {/*получаем то что внутри <Popup></Popup> т.е <SwiperGallery_1/>*/}
               {props.children}
               {/*<div className="galleryWrap">*/}
               {/*   /!*{isShowPrev ? <div className="navButton _prev" onClick={() => swiperRef.current.swiper.slidePrev()}><svg><use href="/img/#arrow_1" /></svg></div> : ''}*!/*/}
               {/*   /!*{isShowNext ? <div className="navButton _next" onClick={() => swiperRef.current.swiper.slideNext()}><svg><use href="/img/#arrow_1" /></svg></div> : ''}*!/*/}
               {/*   <Swiper*/}
               {/*      modules={[Navigation, Pagination, Scrollbar, A11y]}*/}
               {/*      ref={swiperRef}*/}
               {/*      spaceBetween={0}*/}
               {/*      slidesPerView={1}*/}
               {/*      navigation={false}*/}
               {/*      pagination={{*/}
               {/*         el: '.swiperDots_1',*/}
               {/*         clickable: true,*/}
               {/*         // renderBullet: function (index, className) {*/}
               {/*         //    return `<span class="qqq dot swiper-pagination-bullet">${index}</span>`; // задаем свой html для pagination*/}
               {/*         // },*/}
               {/*      }}*/}
               {/*      lazy={true}*/}
               {/*      autoHeight={true}*/}
               {/*      // onSlideChange={(swiper) => showHideNavButton(swiper)}*/}
               {/*      // onSwiper={*/}
               {/*      //    (swiper) => showHideNavButton(swiper)*/}
               {/*      // }*/}
               {/*   >*/}
               {/*      {projectGalleryElementsSlider}*/}

               {/*   </Swiper>*/}
               {/*</div>*/}
            </div>
            {props.children.props.projectDetailGallery &&
               props.children.props.children //выводим то что внутри <Popup><SwiperGallery_1>{children}</SwiperGallery_1></Popup>
               // <div className="dots_1 swiperDots_1" onClick={stopClick}></div>
            }

         </div>
      </>
}



export default Popup


