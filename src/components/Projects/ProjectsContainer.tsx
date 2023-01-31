import React from 'react';
import Projects from "./Projects";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {
   getProjectsThunkCreator,
   getAllProjectsThunkCreator,
   resultSearchProjectsAction,
   searchStringAction,
   getCategoryProjectsThunkCreator,
   categoryProjectsAction,
   selectFetch, inputSearchAutofocusAction, collapsedCategoryListMobileAction,
} from "../../redux/projects-reducer";
import {getProjectsFilter} from "../../redux/projects-selectors";
import Preloader from "../common/Preloader/Preloader";
import AnimatedPage from "../../utils/AnimatedPage";
import {NavLink, useNavigate, useParams, useSearchParams} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import {abortRequestProjects, abortRequestProjectsCat} from "../../api/api";

import {noChangeAnimTopPanel} from "../../utils/ChangeAnimTopPanel";

import {useTypedSelector} from "../../hooks/useTypedSelector";

// import { SlideToggle } from '@todys/react-slide-toggle'
// @ts-ignore (typescript игнорирует следующую строку)
import SlideToggle from "react-slide-toggle";







const ProjectsContainer: React.FC = () => {

   let projects = useTypedSelector(state => state.projectsPage.projects);
   let pageSize = useTypedSelector(state => state.projectsPage.pageSize);
   let totalProjectCount = useTypedSelector(state => state.projectsPage.totalProjectCount);
   let currentPage = useTypedSelector(state => state.projectsPage.currentPage);
   let isFetching = useTypedSelector(state => state.projectsPage.isFetching);
   let allSearchProjects = useTypedSelector(state => state.projectsPage.allSearchProjects); //useSelector(getAllProjectsSelector);
   let searchProjects = useTypedSelector(getProjectsFilter);
   let resultSearchProjects = useTypedSelector(state => state.projectsPage.resultSearchProjects);
   let searchString = useTypedSelector(state => state.projectsPage.searchString);
   let categoryProjects = useTypedSelector(state => state.projectsPage.categoryProjects);
   let inputSearchAutofocus = useTypedSelector(state => state.projectsPage.inputSearchAutofocus);
   let collapsedCategoryListMobile = useTypedSelector(state => state.projectsPage.collapsedCategoryListMobile); //useSelector(getAllProjectsSelector);
   //эти хуки позволяют обойтись без mapStateToProps и mapDispatchToProps
   // let projects = useSelector(state => state.projectsPage.projects);
   // let pageSize = useSelector(state => state.projectsPage.pageSize);
   // let totalProjectCount = useSelector(state => state.projectsPage.totalProjectCount);
   // let currentPage = useSelector(state => state.projectsPage.currentPage);
   // let isFetching = useSelector(state => state.projectsPage.isFetching);
   // let allSearchProjects = useSelector(state => state.projectsPage.allSearchProjects); //useSelector(getAllProjectsSelector);
   //
   // let searchProjects = useSelector(getProjectsFilter);
   // let resultSearchProjects = useSelector(state => state.projectsPage.resultSearchProjects);
   // let searchString = useSelector(state => state.projectsPage.searchString);
   //
   // let categoryProjects = useSelector(state => state.projectsPage.categoryProjects);



   // console.log(searchProjects)
   // debugger

   const dispatch = useDispatch();

   let {pageNumber} = useParams(); // номер страницы основного раздела
   let {pageNumberCat} = useParams(); // номер страницы для категории
   let {catSlug} = useParams(); // id категории
   const [searchParams, setSearchParams] = useSearchParams('') //useSearchParams используется для чтения и изменения строки запроса в URL-адресе

   let elemQuery = searchParams.get('searchElems')
   const navigate = useNavigate()


   // const [activeMenuCat, setActiveMenuCat] = useState(false);




   useEffect(() => {

      document.body.classList.remove('_noScroll');
      dispatch(selectFetch(false))
      if(catSlug == undefined) {
         if (pageNumber == undefined) {
            currentPage = 1
         } else {
            currentPage = Number(pageNumber)
         }
         if(categoryProjects != undefined) {
            dispatch(categoryProjectsAction(undefined))
         }
         if(!elemQuery){
            dispatch(getProjectsThunkCreator(currentPage, pageSize))
         }
      }else {
         if (pageNumberCat == undefined) {
            currentPage = 1
         } else {
            currentPage = Number(pageNumberCat)
         }
         dispatch(getCategoryProjectsThunkCreator(catSlug, currentPage, pageSize))
      }


      return () => {
         if(abortRequestProjects[currentPage]) { //если запрос api axios не успел завершиться тогда мы его отменяем
            abortRequestProjects[currentPage].abort()
         }
         if(abortRequestProjectsCat[catSlug+'-'+currentPage]) {
            abortRequestProjectsCat[catSlug+'-'+currentPage].abort()
         }
         dispatch(inputSearchAutofocusAction(false)) //убираем автофокус на input search
      };
   },[/*catSlug/*pageNumber , pageSize, dispatch, currentPage*/]);





   // input поиска
   const changeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value.toLowerCase();
      if(query){
         setSearchParams({searchElems: query})
      }else{
         setSearchParams({searchElems: ''})
      }
      if (allSearchProjects.length == 0) {
         dispatch(getAllProjectsThunkCreator(/*query*/));
      }
      dispatch(inputSearchAutofocusAction(true)) //ставим автофокус на input search
   }

   // input поиска
   useEffect(() => {
      let isMounted = true

      if (allSearchProjects.length == 0 && elemQuery != null) {
         dispatch(getAllProjectsThunkCreator());
      }
      if (elemQuery != null) {
         dispatch(searchStringAction(elemQuery))
         if(window.location.pathname != '/projects/search') {
            navigate('/projects/search?searchElems='+elemQuery)
            noChangeAnimTopPanel()
         }
         // setActiveMenuCat(true)
      }
      if (searchProjects != undefined) {
         dispatch(resultSearchProjectsAction(searchProjects))
      }
      if (elemQuery == ''){
         dispatch(resultSearchProjectsAction(null))
         navigate('/projects')
      }
      if (elemQuery == null && isMounted){
         setTimeout(() => {
            dispatch(resultSearchProjectsAction(null))
            dispatch(searchStringAction(''))
         }, 500);
      }




      return () => {
         isMounted = false

      }
   },[searchProjects, allSearchProjects, elemQuery])





   //функции переключения страниц
   const onPageChanged = (pageNum: number) => {
      // debugger
      if(pageNum != currentPage) {
         let target;
         if (pageNum > 1) {
            target = `/projects/page/${pageNum}`;
         } else {
            target = `/projects/`;
         }
         navigate(target);
         // dispatch(getProjectsThunkCreator(pageNum, pageSize))
      }
   }

   const onPageChangedCat = (pageNum: number, catSlug: string | undefined) => {
      if(pageNum != currentPage) {
         let target;
         if (pageNum > 1) {
            target = `/projects/cat-${catSlug}/page/${pageNum}`;
         } else {
            target = `/projects/cat-${catSlug}`;
         }
         navigate(target);
         // dispatch(getCategoryProjectsThunkCreator(catSlug, pageNum, pageSize))
      }
   }



   //для отображения анимации
   let initialBox: string | undefined
   let exitBox: string | undefined
   if(window.localStorage.getItem('animTopPanel') == 'yes'){
      initialBox = 'initial'
      exitBox = 'exit'
   }else{
      initialBox = ''
      exitBox = ''
   }
   // console.log(catSlug)
   // console.log(initialBox)
   // console.log(collapsedCategoryListMobile)

   // debugger



   interface SlideToggleRenderType {
      toggle: () => void
      setCollapsibleElement: () => void
   }

   const setActive = ({isActive}: any) => isActive ? '_active' : '';
   return <>
      <div className={'sectionAfter'}>
         <div className="contain">
            {/*<form autoComplete="off" onSubmit={handleSubmit}>*/}

            <AnimatedPage initial={initialBox} exit={exitBox} >

               <p className={'title_1'}>Портфолио</p>
               <div className="projectsControlPanel">



                  <SlideToggle
                     state = {false}
                     duration={400}
                     collapsed={collapsedCategoryListMobile}
                     onExpanded={() => {
                        dispatch(collapsedCategoryListMobileAction(false))
                     }}
                     onCollapsed={() => {
                        dispatch(collapsedCategoryListMobileAction(true))
                     }}
                     render={({toggle, setCollapsibleElement}: SlideToggleRenderType) => (
                        <div className={'categoryWrap'}>
                           <p className="categoryListName">
                              <span onClick={toggle}>Категории</span>
                              <svg onClick={toggle} className={!collapsedCategoryListMobile ? '_open' : ''} viewBox="0 0 54 54"><g><path fill="#B68DEF" d="M27,0C12.112,0,0,12.112,0,27s12.112,27,27,27s27-12.112,27-27S41.888,0,27,0zM27,52C13.215,52,2,40.785,2,27S13.215,2,27,2s25,11.215,25,25S40.785,52,27,52z"/><path d="M28.209,19.501c-0.666-0.666-1.752-0.666-2.418,0L14.293,30.999c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0L27,21.12l11.293,11.293c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L28.209,19.501z"/></g></svg>
                           </p>

                           <div className={'categoryListWrap'} ref={setCollapsibleElement}>
                              <div className="categoryList">
                                 {/*<p><NavLink to='/projects' onClick={()=>{noChangeAnimTopPanel();  /*dispatch(getProjectsThunkCreator(currentPage, pageSize))*!/} className={({isActive}) => isActive && catSlug == undefined && !elemQuery ? '_active' : ''}>Front-end разработка</NavLink></p>*/}
                                 <p><NavLink end to='/projects' onClick={()=>{noChangeAnimTopPanel();}}  className={ ({isActive}) => isActive || catSlug == undefined && currentPage >= 1 && !elemQuery ? '_active' : ''}>Front-end разработка</NavLink></p>
                                 <p><NavLink to='/projects/cat-back-dev' onClick={()=>{noChangeAnimTopPanel();}} className={setActive}>Back-end разработка</NavLink></p>
                                 <p><NavLink to='/projects/cat-design' onClick={()=>{noChangeAnimTopPanel();}} className={setActive}>Дизайн</NavLink></p>
                              </div>
                           </div>

                        </div>
                     )}
                  />


                  <div className={'inputWrap_1'}>
                     <p>Поиск</p>
                     <input className="input_1" type="text" name="search" autoFocus={inputSearchAutofocus && true} onChange={changeInputSearch} value={elemQuery == null ? '' : elemQuery}/>
                  </div>
               </div>

            </AnimatedPage>


            {/*<button type="submit">Отправить</button>*/}
            {/*</form>*/}

            {isFetching ? <Preloader/> : <AnimatedPage>

               {/*проекты категорий*/}
               {categoryProjects != undefined && resultSearchProjects == null
                  ? <div>
                     <div className='_mt30'><Projects projects={categoryProjects}/></div>
                     <Paginator currentPage={currentPage} totalProjectCount={totalProjectCount} pageSize={pageSize} onPageChanged={onPageChangedCat} catSlug={catSlug}/>
                  </div> : ''}

               {/*вывод проектов по поиску*/}
               {resultSearchProjects != null
                  ? <div className='_mt30'><Projects projects={resultSearchProjects}/></div> : ''}

               {/*все категорий*/}
               {resultSearchProjects == null && searchString.length == 0 && categoryProjects == undefined
                  ? <div className='_mt30'>
                     <Projects projects={projects}/>
                     <Paginator currentPage={currentPage} totalProjectCount={totalProjectCount} pageSize={pageSize} onPageChanged={onPageChanged} catSlug={catSlug} />
                  </div> : ''}

               {resultSearchProjects == null && searchString.length != 0

                  ? <div className='_mt30'><p className='alertText'>Ничего не найдено</p></div> : ''}
            </AnimatedPage>}


         </div>
      </div>

   </>
};


export default ProjectsContainer