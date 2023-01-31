import React, {useEffect, useRef, useState} from 'react';
import {NavLink} from "react-router-dom";
import { useLocation } from "react-router-dom";

import Logo_1 from "../common/Logo_1/Logo_1";


const Header = (props) => {

   let location = useLocation();
   // console.log(location)
   // let menuObj = [
   //    {
   //       name: 'Главная',
   //       href: '/',
   //    },
   //    {
   //       name: 'Портфолио',
   //       href: '/projects',
   //    },
   //    // {
   //    //    name: 'Тест Lazyload',
   //    //    href: '/test-lazyload',
   //    // },
   //    // {
   //    //    name: 'Поиск',
   //    //    href: '/search',
   //    // },
   //    {
   //       name: 'Контакты',
   //       href: '/contacts',
   //    }
   // ]




   let menuElements = props.menuObj.map(
      (li, index) => <li key={index}><span onClick={()=>{props.setShowHeader(false)}}><NavLink onClick={props.yesChangeAnimTopPanel} to={li.href} className={({isActive}) => isActive ? '_active' : ''}>{li.name}</NavLink></span></li>
   )


   return <>

      {props.showHeader ? document.body.classList.add('_noScroll') : document.body.classList.remove('_noScroll')}

      <div className={props.showHeader ? "burgerMenu _show" : "burgerMenu"}>
         <div className="backgroundPattern"></div>
         <ul className="burgerUl">
            {menuElements}
            <li><span className={props.showContacts ? "_active" : ''} onClick={()=>{props.setShowContacts(!props.showContacts)}}><a>Контакты</a></span></li>
         </ul>
      </div>


      <div className={props.showContacts ? "burgerBg _show" : "burgerBg"} onClick={()=>{props.setShowContacts(!props.showContacts)}}></div>

      <header id={'header'}>
         {/*<div className="backgroundPattern"></div>*/}
         <div className={'contain'}>

            {/*<img className={location.pathname != '/' ? 'logo_1' : 'logo_1 _hide'} src={logoSrc} alt="logo"/>*/}

            <Logo_1 addClass={location.pathname == '/' && !props.showHeader ? '_hide' : ''}/>





            <nav className={'menu_1'}>
               <ul>
                  {menuElements}
                  <li className={props.showContacts ? "_active" : ''} onClick={()=>{props.setShowContacts(!props.showContacts)}}><span><a>Контакты</a></span></li>
               </ul>
            </nav>
            <div className={props.showHeader ? "burgerButton _active" : "burgerButton"} onClick={()=>{props.setShowHeader(!props.showHeader)}}><span></span></div>
         </div>
      </header>
   </>
}





export default Header;