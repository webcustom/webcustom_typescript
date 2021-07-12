import {projectsAPI} from "../api/api";

const SET_PROJECTS = 'SET_PROJECTS';
const SELECT_PAGE = 'SELECT_PAGE';
const TOTAL_COUNT = 'TOTAL_COUNT';
const SET_PROJECT_DETAIL = 'SET_PROJECT_DETAIL';

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
   pageSize: 6, //количество элементов на странице
   totalProjectCount: 0, //количество элементов всего
   currentPage: 1,
   // projectDetail: {},
   // projectDetail: false,
   // isFetching: false, //прелоадер
   // isProgress: [], //параметр отвечает за disabled кнопки (в этот параметр помещаем id пользователей у котороых кликнули кнопку follow или unfollow)
   // newPostText: 'test text',
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
      case SET_PROJECTS: {
         // debugger;
         return {
            //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
            ...state, projects: action.projects //перезаписываем массив users
         }
      }
      case TOTAL_COUNT: {
         return {
            ...state,totalProjectCount: action.totalCount
         }
      }
      case SET_PROJECT_DETAIL: {
         // debugger;
         return {
            //...state, users: [...state.users, ...action.users] //тут создаем копию объекта state в нем создаем копию объекта state.users и добавляем к нему наш action.users
            ...state, projectDetail: action.projectDetail //перезаписываем массив users
         }
      }
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
export const setTotalCount = (totalCount) => {
   // debugger;
   return{
      type: TOTAL_COUNT,
      totalCount: totalCount
   }
}
export const setProjectDetail = (projectDetail) => {
   // debugger;
   return{
      type: SET_PROJECT_DETAIL,
      projectDetail: projectDetail
   }
}



export const getProjectDetailThunkCreator = (projectId) => async (dispatch) => {
   // alert('get project detail ' + projectId);

   let data = await projectsAPI.getProjectDetail(projectId);
   dispatch(setProjectDetail(data));
   // debugger
}

//санки thunkCreator возвращает функцию которую можно задиспатчить
export const getProjectsThunkCreator = (currentPage, pageSize) => async (dispatch) => {
   // dispatch(selectFetch(true)); //показываем прелоадер
   // debugger;
   dispatch(selectPage(currentPage)); //меняем в state активную страницу
   //тут мы вызываем функцию которая отвечает за получение данных с сервера
   let data = await projectsAPI.getProjects(currentPage, pageSize);
   // // debugger;
   console.log(data);
   // debugger;

   // dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер
   dispatch(setProjects(data));
   dispatch(setTotalCount(data.totalCount));
   // alert('900999');

   // return '111';
}

// console.log(projectsAPI.getProjects());
// export const www = (currentPage, pageSize) => async (dispatch) => {
//    alert('5555');
//
//    let data = await projectsAPI.getUsers(currentPage, pageSize);
//    console.log(data);
//    return setTotalCount(5);
//
//
//    // let data = await projectsAPI.getProjects(1,5);
//    // console.log(data);
//    // let data = {};
//    // let data = await projectsAPI.getProjects(currentPage, pageSize);
//    // dispatch(setProjects(data.items));
//    // dispatch(setTotalCount(data.totalCount));
//
//
//    // return {type:TOTAL_COUNT};
//       // setTotalCount()
//     // console.log(data);
//       // dispatch(selectFetch(false)); //когда приходит ответ с сервера убираем прелоадер
//    // );
//    // return {type:TOTAL_COUNT};
// }


export default projectsReducer;