import {projectsAPI} from "../api/api";

const SET_PROJECTS = 'SET_PROJECTS';
const SELECT_PAGE = 'SELECT_PAGE';
const TOTAL_COUNT = 'TOTAL_COUNT';
const SET_PROJECT_DETAIL = 'SET_PROJECT_DETAIL';
const CLEAR_PROJECT_DETAIL = 'CLEAR_PROJECT_DETAIL';
const SELECT_FETCH = 'SELECT_FETCH';
const SET_PROJECTS_LAZY = 'SET_PROJECTS_LAZY';
const CLEAR_PROJECTS_LAZY = 'CLEAR_PROJECTS_LAZY';
const SELECT_LAZY_PAGE = 'SELECT_LAZY_PAGE';
const ALL_SEARCH_PROJECTS = 'ALL_SEARCH_PROJECTS';
const RESULT_SEARCH_PROJECTS = 'RESULT_SEARCH_PROJECTS';
const SEARCH_STRING = 'SEARCH_STRING';
const CATEGORY_PROJECTS = 'CATEGORY_PROJECTS';
const INPUT_SEARCH_AUTOFOCUS = 'INPUT_SEARCH_AUTOFOCUS';
// const NOT_FOUND_PAGE = 'NOT_FOUND_PAGE';
const COLLAPSED_CATEGORY_LIST_MOBILE = 'OPENED_CATEGORY_LIST_MOBILE';


let initialState = {
   projects: [
      // {id: 1, src: '/img/avatar.jpg', name: 'Project 1', text: 'I am looking for a job right now...',},
      // {id: 2, src: '/img/avatar.jpg', name: 'Project 2', text: 'I am looking for a job right now...',},
      // {id: 3, src: '/img/avatar.jpg', name: 'Project 3', text: 'I am looking for a job right now...',},
      // {id: 4, src: '/img/avatar.jpg', name: 'Project 4', text: 'I am looking for a job right now...',},
      // {id: 5, src: '/img/avatar.jpg', name: 'Project 5', text: 'I am looking for a job right now...',},
      // {id: 6, src: '/img/avatar.jpg', name: 'Project 6', text: 'I am looking for a job right now...',},
      // {id: 7, src: '/img/avatar.jpg', name: 'Project 7', text: 'I am looking for a job right now...',},
   ],
   projectsLazy: [],
   pageSize: 16, //количество элементов на странице
   totalProjectCount: null, //количество элементов всего
   currentPage: 1,
   lazyCurrentPage: 1,
   isFetching: true, //прелоадер
   projectDetail: {
      acf: {
         detail_text: '',
         project_img: {
            url: ''
         }
      },
      title: '',
   },
   allSearchProjects: '', //сюда загружаются все элементы среди которых будет осуществлен поиск
   resultSearchProjects: '', //сюда загружаем результат поиска
   searchString: '',
   inputSearchAutofocus: false,
   collapsedCategoryListMobile: true,
   // notFoundPage: false
   // animTopPanel: true
}

const projectsReducer = (state = initialState, action) => {
   // console.log(action);
   // debugger;

   switch(action.type){
      //меняем текущую страницу на ту которая пришла в action
      case SELECT_PAGE: {
         // debugger;
         return {
            ...state,currentPage: action.currentPage //перезаписываем currentPage
         }
      }
      case SELECT_LAZY_PAGE: {
         // debugger;
         return {
            ...state,lazyCurrentPage: action.lazyCurrentPage //перезаписываем currentPage
         }
      }
      case SET_PROJECTS: {
         // debugger;
         return {
            //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
            ...state, projects: action.projects //перезаписываем массив projects
         }
      }
      case SET_PROJECTS_LAZY: {
         // debugger
         return {
            ...state, //projectsLazy: state.projectsLazy.push(action.projects) //перезаписываем массив projects
            // projectsLazy: [...state.projectsLazy, action.projectsLazy]
            projectsLazy: [...state.projectsLazy].concat(action.projectsLazy)
         }
      }
      case TOTAL_COUNT: {
         // debugger
         return {
            ...state,totalProjectCount: action.totalCount
         }
      }
      case SET_PROJECT_DETAIL: {
         // debugger;
         return {
            //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
            ...state, projectDetail: action.projectDetail //перезаписываем массив projectDetail
         }
      }
      case SELECT_FETCH: {
         // debugger;
         return {
            ...state,isFetching: action.isFetching //меняем значение на то что пришло в action
         }
      }
      case CLEAR_PROJECT_DETAIL: {
         // debugger;
         return {
            //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
            ...state, projectDetail: action.projectDetail //перезаписываем массив users
         }
      }
      case CLEAR_PROJECTS_LAZY: {
         // debugger;
         return {
            //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
            ...state, projectsLazy: action.projectsLazy //перезаписываем массив users
         }
      }

      case ALL_SEARCH_PROJECTS: {
         // debugger;
         return {
            //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
            ...state, allSearchProjects: action.allSearchProjects //перезаписываем массив users
         }
      }

      case RESULT_SEARCH_PROJECTS: {
         // debugger;
         return {
            //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
            ...state, resultSearchProjects: action.resultSearchProjects //перезаписываем массив users
         }
      }

      case SEARCH_STRING: {
         // debugger;
         return {
            //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
            ...state, searchString: action.searchString //перезаписываем массив users
         }
      }

      case CATEGORY_PROJECTS: {
         return {
            ...state, categoryProjects: action.categoryProjects //перезаписываем массив users
         }
      }

      case INPUT_SEARCH_AUTOFOCUS: {
         // console.log(action.inputSearchAutofocus)
         return {
            ...state, inputSearchAutofocus: action.inputSearchAutofocus //перезаписываем массив users
         }
      }

      case COLLAPSED_CATEGORY_LIST_MOBILE: {
         // debugger
         // console.log(action.inputSearchAutofocus)
         return {
            ...state, collapsedCategoryListMobile: action.collapsedCategoryListMobile //перезаписываем массив users
         }
      }

      // case NOT_FOUND_PAGE: {
      //    // console.log(action.inputSearchAutofocus)
      //    return {
      //       ...state, notFoundPage: action.notFoundPage //перезаписываем массив users
      //    }
      // }


      // case ANIM_TOP_PANEL: {
      //    // debugger
      //    return {
      //       ...state, animTopPanel: action.animTopPanel //перезаписываем массив users
      //    }
      // }
      // case PROJECT_LOAD_CHANGE: {
      //    // debugger;
      //    return {
      //       //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
      //       ...state, projectLoadChange: action.projectLoadChange //перезаписываем массив users
      //    }
      // }



      default:
         return state;
   }
}


export const setProjects = (projects) => {
   // alert('222');
   // debugger;
   return{
      type: SET_PROJECTS,
      projects: projects
   }
}
export const selectPage = (currentPage) => {
   // debugger;
   return{
      type: SELECT_PAGE,
      currentPage: currentPage
   }
}
export const selectLazyPage = (currentPage) => {
   // debugger;
   return{
      type: SELECT_LAZY_PAGE,
      lazyCurrentPage: currentPage
   }
}
export const setTotalCount = (totalCount) => {
   // debugger;
   return{
      type: TOTAL_COUNT,
      totalCount: totalCount
   }
}

export const setProjectsLazy = (projects) => {
   // alert('222');
   // debugger;
   return{
      type: SET_PROJECTS_LAZY,
      projectsLazy: projects
   }
}

export const setProjectDetail = (projectDetail) => {
   // debugger;
   return{
      type: SET_PROJECT_DETAIL,
      projectDetail: projectDetail
   }
}
export const clearProjectDetail = () => {
   // debugger;
   return{
      type: CLEAR_PROJECT_DETAIL,
      // projectDetail: null
      // received: false,
      projectDetail: {
         acf: {
            detail_text: null,
            project_img: {
               url: null
            }
         },
         title: {
            rendered: null
         }
      },
   }
}
export const selectFetch = (isFetching) => {
   // debugger
   return{
      type: SELECT_FETCH,
      isFetching: isFetching,
   }
}


export const selectSearch = (allSearchProjects) => {
   return{
      type: ALL_SEARCH_PROJECTS,
      allSearchProjects: allSearchProjects,
   }
}


export const resultSearchProjectsAction = (resultSearchProjects) => {
   // debugger
   return{
      type: RESULT_SEARCH_PROJECTS,
      resultSearchProjects: resultSearchProjects,
   }
}


export const searchStringAction = (searchString) => {
   // debugger
   return{
      type: SEARCH_STRING,
      searchString: searchString,
   }
}

export const categoryProjectsAction = (categoryProjects) => {
   // debugger
   return{
      type: CATEGORY_PROJECTS,
      categoryProjects: categoryProjects,
   }
}


export const inputSearchAutofocusAction = (inputSearchAutofocus) => {
   // debugger
   return{
      type: INPUT_SEARCH_AUTOFOCUS,
      inputSearchAutofocus: inputSearchAutofocus,
   }
}


export const collapsedCategoryListMobileAction = (collapsedCategoryListMobile) => {
   // debugger
   return{
      type: COLLAPSED_CATEGORY_LIST_MOBILE,
      collapsedCategoryListMobile: collapsedCategoryListMobile,
   }
}




export const getProjectDetailThunkCreator = (projectId) => async (dispatch) => {
   dispatch(selectFetch(true)); //показываем прелоадер
   let data = await projectsAPI.getProjectDetail(projectId);
   // debugger
   if(data){
      // dispatch(notFoundPageAction(false))
      dispatch(setProjectDetail(data));
   }
   // else{
   //    dispatch(notFoundPageAction(true))
   // }
   dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер
   // debugger
}




//санки thunkCreator возвращает функцию которую можно задиспатчить
export const getProjectsThunkCreator = (currentPage, pageSize, lazy = false) => async (dispatch) => {
      dispatch(selectFetch(true)); //показываем прелоадер
      dispatch(selectPage(currentPage)); //меняем в state активную страницу
      //тут мы вызываем функцию которая отвечает за получение данных с сервера

      let data = await projectsAPI.getProjects(currentPage, pageSize);

      if (lazy == false && data) {
         dispatch(setProjects(data.data));
      } else if (data) {
         dispatch(setProjectsLazy(data.data));
      }
      if (data) {
         dispatch(setTotalCount(data.headers['x-wp-total'])) //общее количество всех записей получаем из заголовка запроса параметра x-wp-total
         dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер
      }
}




export const getAllProjectsThunkCreator = () => async (dispatch) => {
   // debugger
   dispatch(selectFetch(true)); //показываем прелоадер
   let data = await projectsAPI.getAllProjects();
   // debugger
   if(data){
      dispatch(selectSearch(data));
      dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер

   }

   // dispatch(setProjectDetail(data));
}


export const getCategoryProjectsThunkCreator = (catNum, currentPage, pageSize) => async (dispatch) => {
   dispatch(selectFetch(true)); //показываем прелоадер
   // debugger
   dispatch(selectPage(currentPage));
   let data = await projectsAPI.getCategoryProjects(catNum, currentPage, pageSize)
   // debugger
   if(data){
      // dispatch(notFoundPageAction(false))
      dispatch(setTotalCount(data.headers['x-wp-total']))
      dispatch(categoryProjectsAction(data.data));
      // console.log(data.data)
      // if(data.data.length == 0){
      //    dispatch(notFoundPageAction(true))
      // }
   }
   dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер

}


export default projectsReducer;