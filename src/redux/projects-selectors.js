import {createSelector} from "reselect"



export const getAllProjectsSelector = state => state.projectsPage.allSearchProjects
const getSearchString = state => state.projectsPage.searchString

// export const getAllProjects = createSelector(getAllProjectsSelector,(projects) => { //getUsersSelector, isFetching тут перечисляем примитивные селекторы от которых зависит наша функция в скобках указываем то что возвращают наши примитивные селекторы (users, isFetching)
//    // debugger;
//
//    return projects.filter(projects => true);
// })

export const getProjectsFilter = createSelector([getAllProjectsSelector, getSearchString],(projects, searchString) => { //getUsersSelector, isFetching тут перечисляем примитивные селекторы от которых зависит наша функция в скобках указываем то что возвращают наши примитивные селекторы (users, isFetching)
   // debugger;
   if(projects != '' && searchString != '') {
      return projects.filter(
         project => project.title.rendered.toLowerCase().includes(searchString)
      );
   }
})

const getProjectsSelector = (state) => {
   // debugger;
   return state.projectsPage.projects;
}

export const getProjects = createSelector(getProjectsSelector,(projects) => { //getUsersSelector, isFetching тут перечисляем примитивные селекторы от которых зависит наша функция в скобках указываем то что возвращают наши примитивные селекторы (users, isFetching)
   return projects.filter(projects => true);
})

export const getPageSize = (state) => {
   return state.projectsPage.pageSize;
}

export const getTotalProjectCount = (state) => {
   return state.projectsPage.totalProjectCount;
}

export const getCurrentPage = (state) => {
   return state.projectsPage.currentPage;
}