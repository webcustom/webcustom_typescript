// import React, {useEffect, useState} from 'react';

import AnimatedPage from "../../utils/AnimatedPage";
import {NavLink} from "react-router-dom";
import Logo_1 from "../common/Logo_1/Logo_1";
import {useEffect} from "react";



const PageMain = () => {

   // document.body.classList.add('_noScroll');
   return <>
      <AnimatedPage classList={'_main'}>
         <div className="contain">
            <div className={'mainItem'}>
               <Logo_1 animate={true}/>
               <p className={'text'}>Добро пожаловать на&nbsp;мой сайт-портфолио, что-бы ознакомиться с&nbsp;моими работами перейдите в&nbsp;раздел <NavLink to={'/projects'}>портфолио</NavLink></p>
            </div>
         </div>
      </AnimatedPage>

   </>
}




export default PageMain