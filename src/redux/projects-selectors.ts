import {createSelector} from "reselect"
import {RootState} from "./redux-store";



export const getAllProjectsSelector = (state: RootState) => state.projectsPage.allSearchProjects
const getSearchString = (state: RootState) => state.projectsPage.searchString

// export const getAllProjects = createSelector(getAllProjectsSelector,(projects) => { //getUsersSelector, isFetching тут перечисляем примитивные селекторы от которых зависит наша функция в скобках указываем то что возвращают наши примитивные селекторы (users, isFetching)
//    // debugger;
//
//    return projects.filter(projects => true);
// })



export const getProjectsFilter = createSelector([getAllProjectsSelector, getSearchString],(projects, searchString) => { //getUsersSelector, isFetching тут перечисляем примитивные селекторы от которых зависит наша функция в скобках указываем то что возвращают наши примитивные селекторы (users, isFetching)
   // debugger;
   if(projects.length && searchString != '') {
      return projects.filter(
          project => project.title.toLowerCase().includes(searchString)
      );
   }
})

const getProjectsSelector = (state: RootState) => {
   // debugger;
   return state.projectsPage.projects;
}

export const getProjects = createSelector(getProjectsSelector,(projects) => { //getUsersSelector, isFetching тут перечисляем примитивные селекторы от которых зависит наша функция в скобках указываем то что возвращают наши примитивные селекторы (users, isFetching)
   return projects.filter(projects => true);
})

export const getPageSize = (state: RootState) => {
   return state.projectsPage.pageSize;
}

export const getTotalProjectCount = (state: RootState) => {
   return state.projectsPage.totalProjectCount;
}

export const getCurrentPage = (state: RootState) => {
   return state.projectsPage.currentPage;
}