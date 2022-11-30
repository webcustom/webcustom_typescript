import React, {Component, useEffect, useState} from 'react';
import './styles/main.sass';

import {connect, Provider, useDispatch, useSelector} from "react-redux";

import {BrowserRouter, Route, Routes, useParams, useLocation, Outlet} from "react-router-dom";
import store from "./redux/redux-store";

import {withSuspense} from "./hoc/withSuspense.js";
// import ContactsContainer from "./components/Contacts/ContactsContainer";
import Header from "./components/Header/Header"
import ImageListElem from "./components/common/Lazyload/ImageListElem";
import PageMain from "./components/PageMain/PageMain";
import {AnimatePresence} from "framer-motion/dist/framer-motion";
import ProjectsContainer from "./components/Projects/ProjectsContainer";
import ProjectDetailContainer from "./components/Projects/Project/ProjectDetail/ProjectDetailContainer";
import NotFoundPage from "./components/common/NotFoundPage/NotFoundPage";
import SearchComponent from "./components/common/SearchComponent/SearchComponent";
import HeaderContainer from "./components/Header/HeaderContainer";
import Footer from "./components/common/Footer/Footer";
import {inputSearchAutofocusAction} from "./redux/projects-reducer";



// import hexagons from '../assets/img/hexagons.svg';
// const ProjectsContainer = React.lazy(() => import('./components/Projects/ProjectsContainer'));
// const ProjectDetailContainer = React.lazy(() => import('./components/Projects/Project/ProjectDetail/ProjectDetailContainer'));


//qqq

const App = () => {
   const location = useLocation();

   return(
      <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => {
         // if (typeof window !== 'undefined') {
            // window.scrollTo({ top: 0 })
         // }
      }}>
         <Routes key={location.pathname} location={location} >
            <Route path="/" element={<Layout/>}>
               <Route index element={<PageMain/>}/>
               <Route path="projects/" element={<ProjectsContainer/>}>
                  <Route path="page/:pageNumber" element={<ProjectsContainer/>} />
                  <Route path="cat-:catId" element={<ProjectsContainer/>} />
                  <Route path="cat-:catId/page/:pageNumberCat" element={<ProjectsContainer/>} />
                  <Route path="search" element={<ProjectsContainer/>}/>
               </Route>
               <Route path="projects/:projectId" element={<ProjectDetailContainer/>} />

               {/*<Route path="projects/" element={<ProjectsContainer/>}/>*/}
               {/*<Route path="projects/page/:pageNumber" element={<ProjectsContainer/>} />*/}

               {/*<Route path="projects/page/:pageNumber" element={<ProjectsContainer/>} />*/}
               {/*<Route path="projects/cat-:catId" element={<ProjectsContainer/>} />*/}
               {/*<Route path="projects/cat-:catId/page/:pageNumberCat" element={<ProjectsContainer/>} />*/}


               {/*<Route path="test-lazyload" element={<ImageListElem/>}/>*/}
               {/*<Route path="/search" element={<SearchComponent/>}/>*/}
               {/*<Route path="/contacts" element={withSuspense(ContactsContainer)}/>*/}
               {/*<Route path="/contacts" element={<ContactsContainer/>}/>*/}
               <Route path="/404" element={<NotFoundPage/>}/>
               <Route path="*" element={<NotFoundPage/>}/>
            </Route>
         </Routes>
      </AnimatePresence>

   )
}


const Layout = () => {

   const [winMinHeight, setWinMinHeight] = useState(false);

   useEffect(() => {
      calcBrowserPanel()
      window.addEventListener('resize', calcBrowserPanel);
   },[winMinHeight])

   function calcBrowserPanel(){
      setWinMinHeight(window.innerHeight)
   }

   return <>
      <div className={'wrapper'} style={{minHeight: winMinHeight}}>
         <div className="backgroundPattern"></div>
         <div className={'body_content'}>
            <HeaderContainer />
            <Outlet />
         </div>
         <Footer/>
      </div>
   </>
}




let MainApp = () => {
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
}
export default MainApp;

