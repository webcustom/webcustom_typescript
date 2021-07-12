import Project from "./Project/Project";
import React from "react";
import styles from './Projects.module.sass';
import Paginator from "../common/Paginator/Paginator";
import ProjectDetail from "./Project/ProjectDetail/ProjectDetail";


const Projects = React.memo(props => {
   console.log(props);

   // let [notProjectDetail,setNotProjectDetail] = useState(true);
   // debugger;

   let projectElements = props.projects.map(
      project => <Project project={project} key={project.id} text={project.acf.detail_text} name={project.title.rendered} src={project.acf.project_img.link}/>
   );

   console.log(props);

   return <>

      {/*<Paginator currentPage={props.props.currentPage} onPageChanged={props.onPageChanged} totalItemsCount={props.props.totalUserCount} pageSize={props.props.pageSize} />*/}
      <div className={styles.projectsWrap}>
         {projectElements}
         {/*{ props.notProjectDetail*/}
         {/*   ? projectElements : <ProjectDetail getProjectDetailThunkCreator={props.getProjectDetailThunkCreator}/>*/}
         {/*}*/}
      </div>
   </>
})

export default Projects;