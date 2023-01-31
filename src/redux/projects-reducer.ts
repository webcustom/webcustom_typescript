import {projectsAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";
import {Dispatch} from "redux";
// import ProjectDetail from "../components/Projects/Project/ProjectDetail/ProjectDetail";
import {ProjectDetailType, ProjectType} from "../types/types";


const SET_PROJECTS = 'SET_PROJECTS';
const SELECT_PAGE = 'SELECT_PAGE';
const TOTAL_COUNT = 'TOTAL_COUNT';
const SET_PROJECT_DETAIL = 'SET_PROJECT_DETAIL';
const CLEAR_PROJECT_DETAIL = 'CLEAR_PROJECT_DETAIL';
const SELECT_FETCH = 'SELECT_FETCH';
const ALL_SEARCH_PROJECTS = 'ALL_SEARCH_PROJECTS';
const RESULT_SEARCH_PROJECTS = 'RESULT_SEARCH_PROJECTS';
const SEARCH_STRING = 'SEARCH_STRING';
const CATEGORY_PROJECTS = 'CATEGORY_PROJECTS';
const INPUT_SEARCH_AUTOFOCUS = 'INPUT_SEARCH_AUTOFOCUS';
const COLLAPSED_CATEGORY_LIST_MOBILE = 'OPENED_CATEGORY_LIST_MOBILE';




interface InitialProjectsStateTypes{
   projects: Array<ProjectType> //| null;
   // projectsLazy: any[];
   pageSize: number;
   totalProjectCount: number;
   currentPage: number;
   lazyCurrentPage: number;
   isFetching: boolean;
   projectDetail: ProjectDetailType;
   allSearchProjects: Array<ProjectType>;
   resultSearchProjects: Array<ProjectType> | null;
   searchString: string;
   inputSearchAutofocus: boolean;
   collapsedCategoryListMobile: boolean;
   categoryProjects: Array<ProjectType> | undefined;
}



interface SelectPageActionType{
   type: typeof SELECT_PAGE;
   payload: number
}
interface SetProjectsActionType{
   type: typeof SET_PROJECTS;
   payload: Array<ProjectType>
}


interface TotalCountActionType{
   type: typeof TOTAL_COUNT;
   payload: number
}


interface SelectFetchActionType{
   type: typeof SELECT_FETCH;
   payload: boolean
}
interface AllSearchProjectsActionType{
   type: typeof ALL_SEARCH_PROJECTS;
   payload: Array<ProjectType>
}
interface ResultSearchProjectsActionType{
   type: typeof RESULT_SEARCH_PROJECTS;
   payload: Array<ProjectType> | null
}
interface SearchStringActionType{
   type: typeof SEARCH_STRING;
   payload: string
}
interface CategoryProjectsActionType{
   type: typeof CATEGORY_PROJECTS;
   payload: Array<ProjectType> | undefined
}
interface InputSearchAutofocusActionType{
   type: typeof INPUT_SEARCH_AUTOFOCUS;
   payload: boolean
}
interface CollapsedCateoryListMobileActionType{
   type: typeof COLLAPSED_CATEGORY_LIST_MOBILE;
   payload: boolean
}




interface ClearProjectDetailActionType{
   type: typeof CLEAR_PROJECT_DETAIL,
   payload: ProjectDetailType
}

interface SetProjectDetailActionType{
   type: typeof SET_PROJECT_DETAIL,
   payload: ProjectDetailType
}


type ProjectsActions = SelectPageActionType | SetProjectsActionType | TotalCountActionType | SetProjectDetailActionType | SelectFetchActionType
    | ClearProjectDetailActionType | AllSearchProjectsActionType | ResultSearchProjectsActionType | SearchStringActionType | CategoryProjectsActionType
    | InputSearchAutofocusActionType | CollapsedCateoryListMobileActionType




let initialState: InitialProjectsStateTypes = {
   projects: [] as Array<ProjectType>, //as Array<ProjectsTypee>,
   // projects: [{title: 'qwe', anons_img: 'asdasd', id: 1111, link: 'asdasd', slug: 'asdasd'}],
   // projectsLazy: [],
   pageSize: 16, //количество элементов на странице
   totalProjectCount: 0, //количество элементов всего
   currentPage: 1,
   lazyCurrentPage: 1,
   isFetching: true, //прелоадер
   projectDetail: {
      detail_img: '',
      gallery_imgs: {
         bigsize: [] as Array<string>,
         fullsize: [] as Array<string>,
         miniature: [] as Array<string>
      },
      link: '',
      title: ''
   },
   allSearchProjects: [] as Array<ProjectType>, //сюда загружаются все элементы среди которых будет осуществлен поиск
   resultSearchProjects: [] as Array<ProjectType>, //сюда загружаем результат поиска
   searchString: '',
   inputSearchAutofocus: false,
   collapsedCategoryListMobile: true,
   categoryProjects: [] as Array<ProjectType>,
}




const projectsReducer = (state = initialState, action: ProjectsActions): InitialProjectsStateTypes => {
   // console.log(action);
   // debugger;

   switch(action.type){
      case SELECT_PAGE: {
         return {
            ...state,currentPage: action.payload //перезаписываем currentPage
         }
      }
      case SET_PROJECTS: {
         return {
            ...state, projects: action.payload //перезаписываем массив projects
         }
      }
      case TOTAL_COUNT: {
         return {
            ...state,totalProjectCount: action.payload
         }
      }
      case SET_PROJECT_DETAIL: {
         return {
            ...state, projectDetail: action.payload
         }
      }
      case SELECT_FETCH: {
         return {
            ...state,isFetching: action.payload
         }
      }
      case CLEAR_PROJECT_DETAIL: {
         return {
            ...state, projectDetail: action.payload
         }
      }

      case ALL_SEARCH_PROJECTS: {
         // debugger;
         return {
            ...state, allSearchProjects: action.payload
         }
      }

      case RESULT_SEARCH_PROJECTS: {
         // debugger;
         return {
            ...state, resultSearchProjects: action.payload
         }
      }

      case SEARCH_STRING: {
         // debugger;
         return {
            ...state, searchString: action.payload
         }
      }

      case CATEGORY_PROJECTS: {
         return {
            ...state, categoryProjects: action.payload
         }
      }

      case INPUT_SEARCH_AUTOFOCUS: {
         return {
            ...state, inputSearchAutofocus: action.payload
         }
      }

      case COLLAPSED_CATEGORY_LIST_MOBILE: {
         return {
            ...state, collapsedCategoryListMobile: action.payload
         }
      }

      default:
         return state;
   }
}




export const setProjects = (projects: Array<ProjectType>): SetProjectsActionType => {
   // console.log(projects[0].anons_img)
   // debugger
   // projects[2]
   return{
      type: SET_PROJECTS,
      payload: projects
   }
}
export const selectPage = (currentPage: number): SelectPageActionType => {
   return{
      type: SELECT_PAGE,
      payload: currentPage
   }
}
export const setTotalCount = (totalCount: number): TotalCountActionType => {
   return{
      type: TOTAL_COUNT,
      payload: totalCount
   }
}
export const  setProjectDetail = (projectDetail: ProjectDetailType): SetProjectDetailActionType => {
   return{
      type: SET_PROJECT_DETAIL,
      payload: projectDetail
   }
}
export const clearProjectDetail = (): ClearProjectDetailActionType => {
   return{
      type: CLEAR_PROJECT_DETAIL,
      payload: {
         detail_img: '',
         gallery_imgs: {
            bigsize: [],
            fullsize: [],
            miniature: []
         },
         link: '',
         title: ''
      }

   }
}
export const selectFetch = (isFetching: boolean): SelectFetchActionType => {
   return{
      type: SELECT_FETCH,
      payload: isFetching,
   }
}
export const selectSearch = (allSearchProjects: Array<ProjectType>): AllSearchProjectsActionType => {
   return{
      type: ALL_SEARCH_PROJECTS,
      payload: allSearchProjects,
   }
}
export const resultSearchProjectsAction = (resultSearchProjects: Array<ProjectType> | null): ResultSearchProjectsActionType => {
   return{
      type: RESULT_SEARCH_PROJECTS,
      payload: resultSearchProjects,
   }
}
export const searchStringAction = (searchString: string): SearchStringActionType => {
   return{
      type: SEARCH_STRING,
      payload: searchString,
   }
}
export const categoryProjectsAction = (categoryProjects: Array<ProjectType> | undefined): CategoryProjectsActionType => {
   return{
      type: CATEGORY_PROJECTS,
      payload: categoryProjects,
   }
}
export const inputSearchAutofocusAction = (inputSearchAutofocus: boolean): InputSearchAutofocusActionType => {
   return{
      type: INPUT_SEARCH_AUTOFOCUS,
      payload: inputSearchAutofocus,
   }
}
export const collapsedCategoryListMobileAction = (collapsedCategoryListMobile: boolean): CollapsedCateoryListMobileActionType => {
   return{
      type: COLLAPSED_CATEGORY_LIST_MOBILE,
      payload: collapsedCategoryListMobile,
   }
}





export type DispatchType = Dispatch<ProjectsActions>;
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ProjectsActions>




export const getProjectDetailThunkCreator = (projectSlug: string | undefined): ThunkType => async (dispatch: DispatchType) => {
   dispatch(selectFetch(true)); //показываем прелоадер
   let data = await projectsAPI.getProjectDetail(projectSlug);
   // debugger
   if(data){
      dispatch(setProjectDetail(data));
   }
   dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер
}


//санки thunkCreator возвращает функцию которую можно задиспатчить
export const getProjectsThunkCreator = (currentPage: number, pageSize: number): ThunkType => async (dispatch: DispatchType) => {
   // console.log(getState())
   dispatch(selectFetch(true)); //показываем прелоадер
   dispatch(selectPage(currentPage)); //меняем в state активную страницу
   //тут мы вызываем функцию которая отвечает за получение данных с сервера
   let data = await projectsAPI.getProjects(currentPage, pageSize);

   if (data) {
      // console.log(data)
      dispatch(setProjects(data.data))
      dispatch(setTotalCount(Number(data.headers['x-wp-total']))) //общее количество всех записей получаем из заголовка запроса параметра x-wp-total
      dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер
   }
}



export const getAllProjectsThunkCreator = ():ThunkType => async (dispatch: DispatchType) => {
   dispatch(selectFetch(true)); //показываем прелоадер
   let data = await projectsAPI.getAllProjects();
   if(data){
      dispatch(selectSearch(data));
      dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер

   }
}


export const getCategoryProjectsThunkCreator = (catSlug: string, currentPage: number, pageSize:number): ThunkType => async (dispatch: DispatchType) => {
   dispatch(selectFetch(true)); //показываем прелоадер
   dispatch(selectPage(currentPage));
   let data = await projectsAPI.getCategoryProjects(catSlug, currentPage, pageSize)
   // debugger

   if(data){
      dispatch(setTotalCount(Number(data.headers['x-wp-total'])))
      dispatch(categoryProjectsAction(data.data));

   }
   dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер

}

//==========================================================
//==========================================================
//==========================================================

// export const getQqq = (): ThunkType => async (dispatch: DispatchType, getState) => {
//    // debugger
//    let data = await testReq.testRequest()
//    // console.log(data)
//
// }

//==========================================================
//==========================================================
//==========================================================


export default projectsReducer;