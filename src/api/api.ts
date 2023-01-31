import * as axios from 'axios';


const instance = axios.create({
   withCredentials: true, //передаем дополнительный параметр (если мы авторизованны на перекрестном сайте то авторизация подтвердится)
   baseURL: 'http://newlook.vokayly7.beget.tech/wp-json/wp/v2/', //подставляется автоматически где был baseUrl
   // headers: { //передаем дополнительным параметром ключь апи который должен быть выдан бекендером
   //    "API-KEY": "MfpixyiDWLmcet2GX7bjqjiPY9mpbtmG" //все запросы кроме get требуют ключ
   // }
})


const instance2 = axios.create({
   withCredentials: true, //передаем дополнительный параметр (если мы авторизованны на перекрестном сайте то авторизация подтвердится)
   baseURL: 'http://newlook.vokayly7.beget.tech/wp-json/contact-form-7/v1/', //подставляется автоматически где был baseUrl
   headers: { //передаем дополнительным параметром ключь апи который должен быть выдан бекендером
      // "API-KEY": "MfpixyiDWLmcet2GX7bjqjiPY9mpbtmG" //все запросы кроме get требуют ключ
      // 'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'//'application/json'
      // 'Content-Type': 'application/json'
   },
})


export let abortRequestProjects = {} // переменная для отмены запроса проектов
export let abortRequestProjectsCat = {} // переменная для отмены запроса проектов определенной категории
export let abortRequestProjectsDetail = {}


//для того что бы вывести поля acf нужно добавить в конце запроса &acf_format=standart либо нужно настроить вывод отдельно каждого поля , о том как это сделать можно прочитать здесь https://support.advancedcustomfields.com/forums/topic/acf-rest-api-image-only-shows-attachment-id/

export const projectsAPI = {
   getProjects(currentPage = 1, pageSize = 5) {
      //запрос должен иметь индивидуальный сигнал для каждой страницы каждого раздела
      abortRequestProjects[currentPage] = new AbortController() //axios.CancelToken.source() //необходимо для прерывания асинхронного запроса

      return instance.get(`posts?page=${currentPage}&per_page=${pageSize}&acf_format=standard`, { signal: abortRequestProjects[currentPage].signal /*cancelToken: source.token*/}).then(response => response).catch(()=>{

         if (abortRequestProjects[currentPage].signal.aborted) {
            console.log('отмена запроса на получение проектов');
         } else {
            console.error('ошибка при запросе проектов');
         }
      })

   },
   getProjectDetail(projectId) {
      abortRequestProjectsDetail = new AbortController()
      return instance.get(`posts/${projectId}?acf_format=standard`, {signal: abortRequestProjectsDetail.signal}).then(response => response.data).catch(()=>{


         if (abortRequestProjectsDetail.signal.aborted) {
            console.log('отмена завроса проекта детально');
         } else {
            console.error('ошибка при запросе проекта детально');
            window.localStorage.setItem('not_found', 'true');
         }
      });
   },

   getAllProjects(){
      return instance.get(`posts/?per_page=100&acf_format=standard`).then(response => response.data);
   },


   getCategoryProjects(catNum, currentPage = 1, pageSize = 5) {
      let cat = String(catNum)
      let page = String(currentPage)

      abortRequestProjectsCat[cat+'-'+page] = new AbortController()

      return instance.get(`posts?categories=${catNum}&page=${currentPage}&per_page=${pageSize}&acf_format=standard`, {signal: abortRequestProjectsCat[cat+'-'+page].signal }).then(response => response).catch(()=>{
         if (abortRequestProjectsCat[cat+'-'+page].signal.aborted) {
            console.log('отмена запроса на получение проектов определенной категории');
         } else {
            console.error('ошибка при запросе проектов определенной категории');
         }

      })
   },


}



export const contactsAPI = {
   postMail(obj){
      const formData = new FormData();
      // const formData = {yourname: name}
      formData.append('yourname', obj.yourname)
      formData.append('youremail', obj.youremail)
      formData.append('yourmessage', obj.yourmessage)

      // console.log(formData)
      // debugger;


      return instance2.post(`contact-forms/1051/feedback`, formData).then(function (response) {
         console.log(JSON.stringify(response.data));
      })//.then(response => response); //метод post вторым параметром можем передать данные
   },
}





// http://newlook.vokayly7.beget.tech/wp-json/wcra/v1/wcra_test/?secret_key=MfpixyiDWLmcet2GX7bjqjiPY9mpbtmG
// http://newlook.vokayly7.beget.tech/wp-json/acf/v3/