import {contactsAPI} from "../api/api";
import {FormType} from "../types/types";
// import {selectFetch, setProjectDetail} from "./projects-reducer";

// const ADD_CONTACTS_FORM = 'ADD_CONTACTS_FORM';
//
// let initialState = {}
//
// const contactsReducer = (state = initialState, action) => {
//
//    switch(action.type){
//       case ADD_CONTACTS_FORM: {
//          debugger;
//          return {
//             ...state, formData: action.formData
//          }
//       }
//       default:
//          return state;
//    }
// }





export const postMailThunkCreator = (obj: FormType) => async () => {
   let data = await contactsAPI.postMail(obj);
}





