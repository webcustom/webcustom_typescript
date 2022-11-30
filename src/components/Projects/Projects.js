import Project from "./Project/Project";
import React, {useEffect, useState} from "react";
import styles from './Projects.module.sass';
import Paginator from "../common/Paginator/Paginator";
import Delayed from "../../utils/Delayed";

//Если ваш компонент всегда рендерит одно и то же при неменяющихся пропсах, вы можете обернуть его в вызов React.memo для повышения производительности
// в некоторых случаях, мемоизируя тем самым результат. Это значит, что React будет использовать результат последнего рендера, избегая повторного рендеринга.
//React.memo затрагивает только изменения пропсов. Если функциональный компонент обёрнут в React.memo и использует useState, useReducer или useContext, он будет
// повторно рендериться при изменении состояния или контекста.


const Projects = React.memo(props => {
// const Projects = (props) => {

   // console.log(props);
   let time = 200


   let projectElements = props.projects.map(
      project => {
         time += 100
         return <Project project={project} key={project.id} name={project.title.rendered} src={project.acf.project_img} time={time}/>
      }
   );
   // debugger;

   return <>
      {/*<Delayed>*/}
         <div className={styles.projectsWrap}>
            {projectElements}
         </div>
         <br/>

      {/*</Delayed>*/}
   </>
})

export default Projects;