import React from 'react';
// import Projects from "./Projects";
// import {compose} from "redux";
import {connect, useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
// import {
//    getProjectsThunkCreator,
//    setProjects,
//    getProjectDetailThunkCreator,
//    clearProjectDetailThunkCreator
// } from "../../../redux/projects-reducer";
// import {
//    getProjects,
// } from "../../redux/projects-selectors";
// import ProjectDetail from "./Project/ProjectDetail/ProjectDetail";
// import Preloader from "../common/Preloader/Preloader";
import {
   clearProjectDetail,
   clearProjectDetailThunkCreator,
   getProjectDetailThunkCreator, resultSearchProjectsAction,
   selectFetch
} from "../../../../redux/projects-reducer";
import ProjectDetail from "./ProjectDetail";
import Preloader from "../../../common/Preloader/Preloader";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import AnimatedPage from "../../../../utils/AnimatedPage";
import {abortRequestProjects, abortRequestProjectsDetail} from "../../../../api/api";
import NotFoundPage from "../../../common/NotFoundPage/NotFoundPage";



const ProjectDetailContainer = (props) => {
   let projectDetailText = useSelector(state => state.projectsPage.projectDetail.acf.detail_text);
   let projectDetailImg = useSelector(state => state.projectsPage.projectDetail.acf.project_img);
   let projectDetailTitle = useSelector(state => state.projectsPage.projectDetail.title.rendered);
   let projectDetailLink = useSelector(state => state.projectsPage.projectDetail.acf.link);
   let projectDetailGallery = useSelector(state => state.projectsPage.projectDetail.acf.gallery_imgs);
   let isFetching = useSelector(state => state.projectsPage.isFetching);
   let notFoundPage = useSelector(state => state.projectsPage.notFoundPage);
   const dispatch = useDispatch();

   let {projectId} = useParams();


   const loadProjectDetail = () => {
      dispatch(getProjectDetailThunkCreator(projectId));
   }

   // const navigate = useNavigate()

   // function qqq(){
   //    let not_found = window.localStorage.getItem('not_found');
   //    debugger
   //    if(not_found == 'true'){
   //       window.localStorage.setItem('not_found', 'false');
   //       navigate("/404")
   //    }
   // }

   useEffect(() => {
      document.body.classList.remove('_noScroll');

      loadProjectDetail();

      // qqq()

      // то вторая функция будет вызвана прямо перед размонтированием компонента. В точности как componentWillUnmount().
      return () => {
         // dispatch(clearProjectDetail());
         if(abortRequestProjectsDetail) { //если запрос api axios не успел завершиться тогда мы его отменяем
            abortRequestProjectsDetail.abort()
         }

      }
   },[/*projectDetailTitle, projectDetailText, projectDetailImg, dispatch*/]);


   return <>
      {/*{notFoundPage && <AnimatedPage><NotFoundPage/></AnimatedPage>}*/}
      {/*<AnimatedPage>*/}
      {/*   <NotFoundPage/>*/}
      {/*</AnimatedPage>*/}

      {isFetching ? <Preloader/> :
         <AnimatedPage>
            {/*{notFoundPage ? <NotFoundPage/> :*/}
            <ProjectDetail projectDetailTitle={projectDetailTitle} projectDetailText={projectDetailText}
                           projectDetailImg={projectDetailImg} projectDetailLink={projectDetailLink}
                           projectDetailGallery={projectDetailGallery}/>
         </AnimatedPage>}
      </>
}

export default ProjectDetailContainer