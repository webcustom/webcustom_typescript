import React, {useEffect, useRef, useState} from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Preloader from "../../../common/Preloader/Preloader";
import styles from './ProjectDetail.module.sass';
import {NavLink, useNavigate} from "react-router-dom";
import Project from "../Project";
import Gallery_1 from "../../../common/Gallery_1/Gallery_1";
import NotFoundPage from "../../../common/NotFoundPage/NotFoundPage";



const ProjectDetail = (props) => {

   const navigate = useNavigate();

   useEffect(() => {
         window.scrollTo(0, 0) //прокручиваем страницу вверх
   },[])

   return <div className={'sectionAfter'}>

      <div className={'contain'}>
         <div className={styles.detailProject}>
            <p className={"title_1"}>{props.projectDetailTitle}</p>
            <div className={styles.text}>{ReactHtmlParser(props.projectDetailText)}</div>
            <div className={styles.linkBlock}>
               <p>Пример по ссылке:</p>
               <a href={props.projectDetailLink} target="_black">{props.projectDetailLink}</a>
            </div>
            <div className={styles.img} style={{backgroundImage: `url(${props.projectDetailImg})`}}></div>

            <div className={'_mt30'}>
               <Gallery_1 projectDetailGallery={props.projectDetailGallery}/>
            </div>
         </div>

         {/*<NavLink to='/projects'>к списку проектов</NavLink>*/}
         <div className={'_centerFlex'}>
            <button className={'button_1 _arrow _mt30'} onClick={() => {
               navigate(-1)
            }}>
               <svg id="arrow_1" viewBox="0 0 491.996 491.996"><g><g><g><path d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848    L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128    c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084    c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224    C491.996,136.902,489.204,130.046,484.132,124.986z"/></g></g></g></svg>

               {/*<svg>*/}
               {/*   <use href={svgSprite+"#arrow_1"}/>*/}
               {/*</svg>*/}
               <span>Вернуться назад</span>
            </button>
         </div>


      </div>

   </div>

};

export default ProjectDetail;


