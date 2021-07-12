import React from 'react';
import Projects from "./Projects";
import {compose} from "redux";
import {connect, useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {getProjectsThunkCreator, setProjects, getProjectDetailThunkCreator} from "../../redux/projects-reducer";
import {projectsAPI} from "../../api/api";
import {
   getProjects,
   getPageSize,
   getTotalProjectCount,
   getCurrentPage,
} from "../../redux/projects-selectors";
import ProjectDetail from "./Project/ProjectDetail/ProjectDetail";
import Preloader from "../common/Preloader/Preloader";

// class ProjectsContainer extends React.Component {
//    constructor(props){
//       super(props); // передаем пропсы родительской компоненте, super обозначает компоненту родителя без этого мы не можем получить this.props
//    }
//    componentDidMount() {
//       // debugger;
//       const {currentPage, pageSize} = this.props; //деструктуризируем
//       console.log(this.props);
//
//       this.props.getProjectsThunkCreator(currentPage, pageSize);
//       alert('9999999999999999');
//    }
//
//    render(){
//       return <Projects props={this.props}/>
//    }
// }

const ProjectsContainer = (props) => {
   // debugger;
   // console.log(props);

   //переключаем страницу выполняем функцию переключения и делаем аякс запрос
   console.log(props);
   let notProjectDetail = !props.match.params.projectId


   const loadProjectDetail = () => {
      let projectId = props.match.params.projectId; // тут благодаря методу withRouter кот. мы используем ниже получаем параметр userId кот. передаем в App.js
      props.getProjectDetailThunkCreator(projectId);
   }

   useEffect(() => {
      if(notProjectDetail) {
         const {currentPage, pageSize} = props; //деструктуризируем
         props.getProjectsThunkCreator(currentPage, pageSize);
      }else{
         loadProjectDetail();
         // console.log(props)
         // debugger;
      }

   },[props.currentPage, props.pageSize]);



   console.log(props);
   // debugger;
   if(notProjectDetail){
      return <>
         <div>
            {props.projects.length != 0 ?
               <Projects projects={props.projects}
                         pageSize={props.pageSize}
                         currentPage={props.currentPage}
                         totalProjectCount={props.totalProjectCount}
                         notProjectDetail={!props.match.params.projectId}
                         getProjectDetailThunkCreator={props.getProjectDetailThunkCreator}
               />
            : <Preloader/>}
         </div>
      </>
   }else{
      return <>
         <div>
            {props.projectDetail != undefined ?
               <ProjectDetail projectDetail={props.projectDetail}/>
            : <Preloader/>}
         </div>
      </>
   }


};

const mapStateToProps = (state) => {
   // console.log(state);
   // debugger;
   return{
      projects: getProjects(state),
      pageSize: state.projectsPage.pageSize, //количество элементов на странице
      totalProjectCount: state.projectsPage.totalProjectCount, //количество элементов всего
      currentPage: state.projectsPage.currentPage,
      projectDetail: state.projectsPage.projectDetail,
   }
};

// export default ProjectsContainer;

export default compose(
   connect(mapStateToProps, {getProjectsThunkCreator, getProjectDetailThunkCreator}),
)(ProjectsContainer);