import Project from "./Project/Project";
import styles from './Projects.module.sass';
import React from 'react';
import {ProjectType} from "../../types/types";
//Если ваш компонент всегда рендерит одно и то же при неменяющихся пропсах, вы можете обернуть его в вызов React.memo для повышения производительности
// в некоторых случаях, мемоизируя тем самым результат. Это значит, что React будет использовать результат последнего рендера, избегая повторного рендеринга.
//React.memo затрагивает только изменения пропсов. Если функциональный компонент обёрнут в React.memo и использует useState, useReducer или useContext, он будет
// повторно рендериться при изменении состояния или контекста.


interface PropsType{
    projects: Array<ProjectType>
}




const Projects: React.FC<PropsType> = React.memo(props => {

   let time = 200
   let projectElements = props.projects.map(
      project => {
         time += 100
         return <Project project={project} key={project.id} name={project.title} src={project.anons_img} time={time}/>
      }
   );
   return <>
         <div className={styles.projectsWrap}>
            {projectElements}
         </div>
         <br/>
   </>
})

export default Projects;