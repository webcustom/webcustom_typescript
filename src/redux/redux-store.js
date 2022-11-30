import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import projectsReducer from "./projects-reducer";
import contactsReducer from "./contacts-reducer";
import thunkMiddleware from "redux-thunk";
// import { reducer as formReducer } from 'redux-form';


let reducers = combineReducers({
   projectsPage: projectsReducer,
   contactsPage: contactsReducer,
   // form: formReducer, // когда подключаем form-reducer обязательно пишем form: ...
});

// function todos(state = [], action) {
//    switch (action.type) {
//       case 'ADD_TODO':
//          return state.concat([action.text])
//       default:
//          return state
//    }
// }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
   applyMiddleware(thunkMiddleware)
));

// store.dispatch({
//    type: 'ADD_TODO',
//    text: 'Read the docs'
// })

// console.log(store.getState())

window.store = store;


export default store;