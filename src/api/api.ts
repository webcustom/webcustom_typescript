import axios, {AxiosResponse} from 'axios';
import {FormType, ProjectDetailType, ProjectType} from "../types/types";


// const instance = axios.create({
//    withCredentials: true, //передаем дополнительный параметр (если мы авторизованны на перекрестном сайте то авторизация подтвердится)
//    baseURL: 'https://web-custom.store/wp-json/wp/v2/', //подставляется автоматически где был baseUrl
//    // headers: { //передаем дополнительным параметром ключь апи который должен быть выдан бекендером
//    //    "API-KEY": "MfpixyiDWLmcet2GX7bjqjiPY9mpbtmG" //все запросы кроме get требуют ключ
//    // }
// })


const instanceWebcustomForm = axios.create({
   withCredentials: true, //передаем дополнительный параметр (если мы авторизованны на перекрестном сайте то авторизация подтвердится)
   baseURL: 'https://web-custom.store/wp-json/contact-form-7/v1/', //подставляется автоматически где был baseUrl
   headers: { //передаем дополнительным параметром ключь апи который должен быть выдан бекендером
      // "API-KEY": "MfpixyiDWLmcet2GX7bjqjiPY9mpbtmG" //все запросы кроме get требуют ключ
      // 'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'//'application/json'
      // 'Content-Type': 'application/json'
   },
})



const instanceWebcustom = axios.create({
   withCredentials: true, //передаем дополнительный параметр (если мы авторизованны на перекрестном сайте то авторизация подтвердится)
   baseURL: 'https://web-custom.store/wp-json/webcustom/v1/', //подставляется автоматически где был baseUrl
   // headers: { //передаем дополнительным параметром ключь апи который должен быть выдан бекендером
   //    "API-KEY": "MfpixyiDWLmcet2GX7bjqjiPY9mpbtmG" //все запросы кроме get требуют ключ
   // }
})




export let abortRequestProjects: any = {} // переменная для отмены запроса проектов
export let abortRequestProjectsCat: any = {} // переменная для отмены запроса проектов определенной категории
export let abortRequestProjectsDetail: any = {}

//для того что бы вывести поля acf нужно добавить в конце запроса &acf_format=standart либо нужно настроить вывод отдельно каждого поля,
// о том как это сделать можно прочитать здесь https://support.advancedcustomfields.com/forums/topic/acf-rest-api-image-only-shows-attachment-id/








export const projectsAPI = {
   getProjects(currentPage: number = 1, pageSize: number = 5) {
      //запрос должен иметь индивидуальный сигнал для каждой страницы каждого раздела
      abortRequestProjects[currentPage] = new AbortController() //axios.CancelToken.source() //необходимо для прерывания асинхронного запроса

      return instanceWebcustom.get<ProjectType[]>(`posts?page=${currentPage}&per_page=${pageSize}`, { signal: abortRequestProjects[currentPage].signal /*cancelToken: source.token*/})
          .then(response => response).catch(()=>{
         if (abortRequestProjects[currentPage].signal.aborted) {
            console.log('отмена запроса на получение проектов');
         } else {
            console.error('ошибка при запросе проектов');
         }
      })

   },
   getProjectDetail(projectSlug: string | undefined) {
      abortRequestProjectsDetail = new AbortController()

      return instanceWebcustom.get<ProjectDetailType>(`posts/${projectSlug}`, {signal: abortRequestProjectsDetail.signal}).then(response => response.data).catch(()=>{
         if (abortRequestProjectsDetail.signal.aborted) {
            console.log('отмена завроса проекта детально');
         } else {
            console.error('ошибка при запросе проекта детально');
            window.localStorage.setItem('not_found', 'true');
         }
      });
   },

   getAllProjects(){
      return instanceWebcustom.get<ProjectType[]>(`posts/?per_page=100&acf_format=standard`).then(response => response.data);
   },


   getCategoryProjects(catSlug: string, currentPage: number = 1, pageSize: number = 5) {
      let cat = String(catSlug)
      let page = String(currentPage)

      abortRequestProjectsCat[cat+'-'+page] = new AbortController()

      return instanceWebcustom.get<Array<ProjectType>>(`posts?cat=${catSlug}&page=${currentPage}&per_page=${pageSize}&acf_format=standard`, {signal: abortRequestProjectsCat[cat+'-'+page].signal }).then(response => response).catch(()=>{
         if (abortRequestProjectsCat[cat+'-'+page].signal.aborted) {
            console.log('отмена запроса на получение проектов определенной категории');
         } else {
            console.error('ошибка при запросе проек тов определенной категории');
         }

      })
   },


}




export const contactsAPI = {
   postMail(obj: FormType){
      const formData = new FormData();

      formData.append('yourname', obj.yourname)
      formData.append('youremail', obj.youremail)
      formData.append('yourmessage', obj.yourmessage)

      return instanceWebcustomForm.post(`contact-forms/1051/feedback`, formData)//.then(function (response) {
         // console.log(JSON.stringify(response.data));
         // console.log(formData)
      //})//.then(response => response); //метод post вторым параметром можем передать данные
   },
}





