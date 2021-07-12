import React from 'react';
import styles from './Project.module.sass';
import {NavLink} from "react-router-dom";


const Project = ({project, text, name, src}) => {
   // console.log(project);
   // console.log(text);

   // let src = props.src;
   return(
      <NavLink className={styles.projectItem} to={"/projects/" + project.id} props={project.id}>
         <div className={styles.img} style={{backgroundImage: `url(${src})` }}></div>
         <p className={styles.name}>{name}</p>
         <p className={styles.text}>{text}</p>
      </NavLink>
   )
};

export default Project;