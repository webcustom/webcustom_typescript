import React, {useEffect, useState} from 'react';
import styles from './Project.module.sass';
import {NavLink} from "react-router-dom";
import {yesChangeAnimTopPanel} from "../../../utils/ChangeAnimTopPanel";
import {ProjectType} from "../../../types/types";



interface PropsType{
   project: ProjectType
   name: string
   src: string
   time: number
}



const Project: React.FC<PropsType> = ({project, name, src, time}) => {

   const [showElem, setShowElem] = useState<boolean>( false);

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

   return <>
      <NavLink onClick={yesChangeAnimTopPanel} className={`${styles.projectItem} ${showElem ? styles._show : ''}`} to={"/projects/" + project.slug} /*props={project.slug}*/ >
         <div className={styles.img} style={{backgroundImage: `url(${src})` }}></div>
         <p className={styles.name}>{name}</p>
      </NavLink>
   </>
};

export default Project;