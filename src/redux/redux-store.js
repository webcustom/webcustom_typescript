import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import projectsReducer from "./projects-reducer";
import thunkMiddleware from "redux-thunk";


let reducers = combineReducers({
   projectsPage: projectsReducer,
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