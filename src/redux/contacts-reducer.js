import {contactsAPI, projectsAPI} from "../api/api";
import {selectFetch, setProjectDetail} from "./projects-reducer";

const ADD_MESSAGE = 'ADD_MESSAGE';
const ADD_CONTACTS_FORM = 'ADD_CONTACTS_FORM';

let initialState = {
   // formText: 'test text', //количество элементов на странице
}

const contactsReducer = (state = initialState, action) => {
   // console.log(action);
   // debugger;

   switch(action.type){
      //меняем текущую страницу на ту которая пришла в action
      case ADD_CONTACTS_FORM: {
         debugger;
         return {
            ...state, formData: action.formData //перезаписываем currentPage
         }
      }
      default:
         return state;
   }
}



export const addContactsForm = (formData) => {
   // debugger;
   return{
      type: ADD_CONTACTS_FORM,
      formData: formData
   }
}




export const postMailThunkCreator = (obj) => async (dispatch) => {
   let data = await contactsAPI.postMail(obj);

}





export default contactsReducer;