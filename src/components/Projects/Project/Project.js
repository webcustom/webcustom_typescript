import React, {useEffect, useState} from 'react';
import styles from './Project.module.sass';
import {NavLink} from "react-router-dom";
import {yesChangeAnimTopPanel} from "../../../utils/ChangeAnimTopPanel";


const Project = ({project, name, src, time}) => {
   // debugger;
   const [showElem, setShowElem] = useState(false);


   useEffect(() => {
      let isMounted = true //для избежания ошибки утечки памети в useEffect

      setTimeout(function(){
         if(isMounted) {
            setShowElem(true)
         }
      },time)


      return () => {
         isMounted = false
      }
   },[])

   return(
      <NavLink onClick={yesChangeAnimTopPanel} className={`${styles.projectItem} ${showElem ? styles._show : ''}`} to={"/projects/" + project.id} props={project.id} >
         <div className={styles.img} style={{backgroundImage: `url(${src})` }}></div>
         <p className={styles.name}>{name}</p>
      </NavLink>
   )
};

export default Project;