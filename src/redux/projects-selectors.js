import {createSelector} from "reselect"

const getProjectsSelector = (state) => {
   // debugger;
   return state.projectsPage.projects;
}

export const getProjects = createSelector(getProjectsSelector,(projects) => { //getUsersSelector, isFetching тут перечисляем примитивные селекторы от которых зависит наша функция в скобках указываем то что возвращают наши примитивные селекторы (users, isFetching)
   // var qqq = users.filter(users => true);
   // debugger;
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