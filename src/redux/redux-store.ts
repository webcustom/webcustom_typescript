import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import projectsReducer from "./projects-reducer";
import thunkMiddleware from "redux-thunk";




// export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;


export const reducers = combineReducers({
   projectsPage: projectsReducer,
   // form: formReducer, // когда подключаем form-reducer обязательно пишем form: ...
});

export type RootState = ReturnType<typeof reducers>
// export type AppStateType = ReturnType<RootState>



//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
   applyMiddleware(thunkMiddleware)
));






//@ts-ignore
window.store = store;


export default store;