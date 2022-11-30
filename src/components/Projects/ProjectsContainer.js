import React, {useState} from 'react';
import Projects from "./Projects";
import {useDispatch, useSelector} from "react-redux";
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
import {
   getAllProjectsSelector, getProjectsFilter,
} from "../../redux/projects-selectors";
import Preloader from "../common/Preloader/Preloader";
import AnimatedPage from "../../utils/AnimatedPage";
import {NavLink, useNavigate, useParams, useSearchParams} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import {abortRequestProjects, abortRequestProjectsCat} from "../../api/api";

import {noChangeAnimTopPanel} from "../../utils/ChangeAnimTopPanel";




import SlideToggle from "react-slide-toggle";





const ProjectsContainer = ({ match }) => {


   //эти хуки позволяют обойтись без mapStateToProps и mapDispatchToProps
   let projects = useSelector(state => state.projectsPage.projects);
   let pageSize = useSelector(state => state.projectsPage.pageSize);
   let totalProjectCount = useSelector(state => state.projectsPage.totalProjectCount);
   let currentPage = useSelector(state => state.projectsPage.currentPage);
   let isFetching = useSelector(state => state.projectsPage.isFetching);
   let allSearchProjects = useSelector(state => state.projectsPage.allSearchProjects); //useSelector(getAllProjectsSelector);

   let searchProjects = useSelector(getProjectsFilter);
   let resultSearchProjects = useSelector(state => state.projectsPage.resultSearchProjects);
   let searchString = useSelector(state => state.projectsPage.searchString);

   let categoryProjects = useSelector(state => state.projectsPage.categoryProjects);
   // let notFoundPage = useSelector(state => state.projectsPage.notFoundPage);
   const dispatch = useDispatch();

   let {pageNumber} = useParams(); // номер страницы основного раздела
   let {pageNumberCat} = useParams(); // номер страницы для категории

   let {catId} = useParams(); // id категории


   const [searchParams, setSearchParams] = useSearchParams('') //useSearchParams используется для чтения и изменения строки запроса в URL-адресе
   let elemQuery = searchParams.get('searchElems')

   const navigate = useNavigate()

   let inputSearchAutofocus = useSelector(state => state.projectsPage.inputSearchAutofocus);
   // const [focusInputSearch, setFocusInputSearch] = useState(false);
   // let animTopPanel = useSelector(state => state.projectsPage.animTopPanel);


   const [activeMenuCat, setActiveMenuCat] = useState(false);

   let collapsedCategoryListMobile = useSelector(state => state.projectsPage.collapsedCategoryListMobile); //useSelector(getAllProjectsSelector);




   useEffect(() => {

      document.body.classList.remove('_noScroll');

      dispatch(selectFetch(false))
      if(catId == undefined) {

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
         dispatch(getCategoryProjectsThunkCreator(Number(catId), currentPage, pageSize))
      }

      return () => {
         if(abortRequestProjects[currentPage]) { //если запрос api axios не успел завершиться тогда мы его отменяем
            abortRequestProjects[currentPage].abort()
         }
         if(abortRequestProjectsCat[catId+'-'+currentPage]) {
            abortRequestProjectsCat[catId+'-'+currentPage].abort()
         }
         // console.log('размонтирован')
         // isMounted = false
         dispatch(inputSearchAutofocusAction(false)) //убираем автофокус на input search

      };
   },[/*catId/*pageNumber , pageSize, dispatch, currentPage*/]);





   // input поиска
   const changeInputSearch = (e) => {

      const query = e.target.value.toLowerCase();
      // debugger
      if(query){
         setSearchParams({searchElems: query})
         // navigate('/projects/search')
      }else{
         setSearchParams({searchElems: ''})
      }
      if (allSearchProjects == '') {
         dispatch(getAllProjectsThunkCreator(query));
      }

      dispatch(inputSearchAutofocusAction(true)) //ставим автофокус на input search
   }

   // input поиска
   useEffect(() => {
      let isMounted = true

      if (allSearchProjects == '' && elemQuery != null) {
         dispatch(getAllProjectsThunkCreator());
      }
      if (elemQuery != null) {
         dispatch(searchStringAction(elemQuery))
         if(window.location.pathname != '/projects/search') {
            navigate('/projects/search?searchElems='+elemQuery)
            noChangeAnimTopPanel()


         }
         setActiveMenuCat(true)

      }

      if (searchProjects != undefined) {
         dispatch(resultSearchProjectsAction(searchProjects))
      }

      if (elemQuery == ''){
         dispatch(resultSearchProjectsAction(''))
         navigate('/projects')
         // navigate('/projects')
      }
      if (elemQuery == null && isMounted){
         setTimeout(() => {
            dispatch(resultSearchProjectsAction(''))
            dispatch(searchStringAction(''))
         }, 500);
      }

      return () => {
         isMounted = false

      }

   },[searchProjects, allSearchProjects, elemQuery])





   //функции переключения страниц
   const onPageChanged = (pageNum) => {
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

   const onPageChangedCat = (pageNum, catId) => {
      if(pageNum != currentPage) {
         let target;
         if (pageNum > 1) {
            target = `/projects/cat-${catId}/page/${pageNum}`;
         } else {
            target = `/projects/cat-${catId}`;
         }
         navigate(target);
         // dispatch(getCategoryProjectsThunkCreator(catId, pageNum, pageSize))
      }
   }



   console.log(catId)
   console.log(currentPage)
   console.log(elemQuery)

   const setActive = ({isActive}) => isActive ? '_active' : '';
   // debugger
   return <>
      <div className={'sectionAfter'}>
         <div className="contain">
            {/*<form autoComplete="off" onSubmit={handleSubmit}>*/}

            <AnimatedPage initial={window.localStorage.getItem('animTopPanel') == 'yes' && 'initial'} exit={window.localStorage.getItem('animTopPanel') == 'yes' && 'exit'}>

               <p className={'title_1'}>Портфолио</p>
               <div className="projectsControlPanel">



                  <SlideToggle
                     duration={400}
                     collapsed={collapsedCategoryListMobile}
                     onExpanded={({ hasReversed  }) => {
                        dispatch(collapsedCategoryListMobileAction(false))
                     }}
                     onCollapsed={({ hasReversed }) => {
                        dispatch(collapsedCategoryListMobileAction(true))
                     }}
                     render={({ toggle, setCollapsibleElement, progress }) => (
                        <div className={'categoryWrap'}>
                           <p className="categoryListName">
                              <span onClick={toggle}>Категории</span>
                              <svg onClick={toggle} className={!collapsedCategoryListMobile ? '_open' : ''} viewBox="0 0 54 54"><g><path fill="#B68DEF" d="M27,0C12.112,0,0,12.112,0,27s12.112,27,27,27s27-12.112,27-27S41.888,0,27,0zM27,52C13.215,52,2,40.785,2,27S13.215,2,27,2s25,11.215,25,25S40.785,52,27,52z"/><path d="M28.209,19.501c-0.666-0.666-1.752-0.666-2.418,0L14.293,30.999c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0L27,21.12l11.293,11.293c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L28.209,19.501z"/></g></svg>
                           </p>

                           <div className={'categoryListWrap'} ref={setCollapsibleElement}>
                              <div className="categoryList">
                                 {/*<p><NavLink to='/projects' onClick={()=>{noChangeAnimTopPanel();  /*dispatch(getProjectsThunkCreator(currentPage, pageSize))*!/} className={({isActive}) => isActive && catId == undefined && !elemQuery ? '_active' : ''}>Front-end разработка</NavLink></p>*/}
                                 <p><NavLink end to='/projects' onClick={()=>{noChangeAnimTopPanel();}}  className={ ({isActive}) => isActive || catId == undefined && currentPage >= 1 && !elemQuery ? '_active' : ''}>Front-end разработка</NavLink></p>
                                 <p><NavLink to='/projects/cat-685' onClick={()=>{noChangeAnimTopPanel();}} className={setActive}>Back-end разработка</NavLink></p>
                                 <p><NavLink to='/projects/cat-688' onClick={()=>{noChangeAnimTopPanel();}} className={setActive}>Дизайн</NavLink></p>
                              </div>
                           </div>

                        </div>
                     )}
                  />


                  <div className={'inputWrap_1'}>
                     <p>Поиск</p>
                     <input className="input_1" type="text" name="search" autoFocus={inputSearchAutofocus && 'autoFocus'} onChange={changeInputSearch} value={elemQuery == null ? '' : elemQuery}/>
                  </div>
               </div>

            </AnimatedPage>


            {/*<button type="submit">Отправить</button>*/}
            {/*</form>*/}

            {isFetching ? <Preloader/> : <AnimatedPage>

               {categoryProjects != undefined && !resultSearchProjects.length
                  ? <div>
                     <div className='_mt30'><Projects projects={categoryProjects}/></div>
                     <Paginator currentPage={currentPage} totalItemsCount={totalProjectCount} pageSize={pageSize} onPageChanged={onPageChangedCat} catId={catId}/>
                  </div> : ''}

               {resultSearchProjects.length
                  ? <div className='_mt30'><Projects projects={resultSearchProjects}/></div> : ''}

               {resultSearchProjects.length == 0 && searchString.length == 0 && categoryProjects == undefined
                  ? <div className='_mt30'>
                     <Projects projects={projects}/>
                     <Paginator currentPage={currentPage} totalItemsCount={totalProjectCount} pageSize={pageSize} onPageChanged={onPageChanged} />
                  </div> : ''}

               {resultSearchProjects.length == 0 && searchString.length != 0
                  ? <div className='_mt30'><p className='alertText'>Ничего не найдено</p></div> : ''}
            </AnimatedPage>}


         </div>
      </div>

   </>
};


export default ProjectsContainer