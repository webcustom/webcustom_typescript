import React from 'react';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getProjectDetailThunkCreator} from "../../../../redux/projects-reducer";
import ProjectDetail from "./ProjectDetail";
import Preloader from "../../../common/Preloader/Preloader";
import {useParams} from "react-router-dom";
import AnimatedPage from "../../../../utils/AnimatedPage";
import {abortRequestProjectsDetail} from "../../../../api/api";
import NotFoundPage from "../../../common/NotFoundPage/NotFoundPage";
import {useTypedSelector} from "../../../../hooks/useTypedSelector";




const ProjectDetailContainer: React.FC = () => {

   // let projectDetailText = useSelector(state => state.projectsPage.projectDetail.acf.detail_text);
   // let projects = useTypedSelector(state => state.projectsPage.projects)

   let projectDetailTitle = useTypedSelector(state => state.projectsPage.projectDetail.title);
   let projectDetailImg = useTypedSelector(state => state.projectsPage.projectDetail.detail_img);
   let projectDetailLink = useTypedSelector(state => state.projectsPage.projectDetail.link);
   let projectDetailGallery = useTypedSelector(state => state.projectsPage.projectDetail.gallery_imgs);
   let isFetching = useTypedSelector(state => state.projectsPage.isFetching);

   const dispatch = useDispatch();
   let {projectSlug} = useParams<string>();


   const loadProjectDetail = () => {
      dispatch(getProjectDetailThunkCreator(projectSlug));
   }

   useEffect(() => {

      document.body.classList.remove('_noScroll');
      loadProjectDetail();

      // то вторая функция будет вызвана прямо перед размонтированием компонента. В точности как componentWillUnmount().
      return () => {
         if(abortRequestProjectsDetail) { //если запрос api axios не успел завершиться тогда мы его отменяем
            abortRequestProjectsDetail.abort()
         }

      }
   },[/*projectDetailTitle, projectDetailText, projectDetailImg, dispatch*/]);

   return <>

      {isFetching ? <Preloader/> :
         <AnimatedPage>
            {projectDetailTitle ?
            <ProjectDetail projectDetailTitle={projectDetailTitle}
                           projectDetailImg={projectDetailImg} projectDetailLink={projectDetailLink}
                           projectDetailGallery={projectDetailGallery}/> : <NotFoundPage/>}
         </AnimatedPage>}
      </>
}

export default ProjectDetailContainer