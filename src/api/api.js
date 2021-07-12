import * as axios from 'axios';


const instance = axios.create({
   withCredentials: true, //передаем дополнительный параметр (если мы авторизованны на перекрестном сайте то авторизация подтвердится)
   baseURL: 'http://newlook.vokayly7.beget.tech/wp-json/wp/v2/', //подставляется автоматически где был baseUrl
   // headers: { //передаем дополнительным параметром ключь апи который должен быть выдан бекендером
   //    "API-KEY": "MfpixyiDWLmcet2GX7bjqjiPY9mpbtmG" //все запросы кроме get требуют ключ
   // }
})


export const projectsAPI = {
   getProjects(currentPage = 1, pageSize = 5) {
      // let qqq = instance.get(`posts`).then(response => response.data);
      return instance.get(`posts?page=${currentPage}&per_page=${pageSize}`).then(response => response.data);
   },
   getProjectDetail(projectId) {
      // let qqq = instance.get(`posts/354`).then(response => response.data);
      // debugger;
      return instance.get(`posts/`+projectId).then(response => response.data);
   }
}






// http://newlook.vokayly7.beget.tech/wp-json/wcra/v1/wcra_test/?secret_key=MfpixyiDWLmcet2GX7bjqjiPY9mpbtmG
// http://newlook.vokayly7.beget.tech/wp-json/acf/v3/