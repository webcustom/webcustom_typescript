import React, {useEffect, useState} from "react";
import SwiperCore, { Lazy } from 'swiper';



SwiperCore.use([ Lazy ]); //для работы lazyload swiper

interface PropsType {
   children: React.ReactElement //JSX.Element | JSX.Element[]
   flag: boolean
   setShowPopup: (value: boolean) => void
}


const Popup: React.FC<PropsType> = (props) => {


   // console.log(props)

   const [isShow, setShow] = useState<boolean>(false);
   const [isShow_2, setShow_2] = useState<boolean>(false);

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

   let stopClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation()
   }

   let closePopup = () =>{
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


   return <>
         <div className={`${'popupBlock'} ${isShow ? '_show' : ''}`} onClick={closePopup}>
            <svg className={'closeIcon'} viewBox="0 0 12 12" fill="none"><path d="M10.1134 1.96826L1.56909 10.5125"/><path d="M1.56909 1.96826L10.1134 10.5125"/></svg>
            <div className={`${'popupItem _t1'} ${isShow_2 ? '_show' : ''}`} onClick={stopClick}>
               {/*получаем то что внутри <Popup></Popup> т.е <SwiperGallery_1/>*/}
               {props.children}
            </div>
            {props.children.props.projectDetailGallery &&
               props.children.props.children //выводим то что внутри <Popup><SwiperGallery_1>{children}</SwiperGallery_1></Popup>
            }
         </div>
      </>
}



export default Popup


