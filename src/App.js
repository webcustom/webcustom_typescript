import React from 'react';
import './App.sass';
// import connect from "react-redux/lib/connect/connect";
// import Provider from "react-redux/lib/components/Provider";
import {connect, Provider} from "react-redux";
// import {compose} from "redux";
// import {initializedApp} from "./redux/app-reducer";
// import BrowserRouter from "react-router-dom/modules/BrowserRouter";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import store from "./redux/redux-store";
// import withRouter from "react-router-dom";
// import Route from "react-router-dom/es/Route";
// import ProjectsContainer from "./components/Projects/ProjectsContainer";
import {compose} from "redux";
import {withSuspense} from "./hoc/withSuspense.js";
import Preloader from "./components/common/Preloader/Preloader";
import {getProjectsThunkCreator} from "./redux/projects-reducer";
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit11 <code>src/App.js</code> and save to reload.
//         </p>
//         <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const ProjectsContainer = React.lazy(() => import('./components/Projects/ProjectsContainer'));
// const ProjectDetail = React.lazy(() => import('./components/Projects/Project/ProjectDetail/ProjectDetail'));
// function App(){
const App = (props) => {
   console.log(props);
   // console.log(userId?);
   return(
      <div>
         <Route exact path="/" /*render={() => <ProjectsContainer/>}*/ render={withSuspense(ProjectsContainer)}/>
         <Route path="/projects/:projectId" render={withSuspense(ProjectsContainer)}/>
         {/*<Route path="/projects/:projectId" render={(props) => {*/}
         {/*   return <React.Suspense fallback={<Preloader/>}>*/}
         {/*      <ProjectDetail props={props}/>*/}
         {/*   </React.Suspense>*/}
         {/*}}/>*/}
      </div>
   )

}



// return (props) => {
//    return <React.Suspense fallback={<Preloader />}>
//       <Component {...props} />
//    </React.Suspense>
// };


//
const mapStateToProps = (state) => {
   return{
      projects: state.projectsPage.projects,
   }
};





let AppContainer = compose(
   connect(mapStateToProps, {}),
   withRouter
)(App);


let MainApp = () => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}
export default MainApp;

