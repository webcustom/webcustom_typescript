import AnimatedPage from "../../../utils/AnimatedPage";
import React, {useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {getProjectsThunkCreator} from "../../../redux/projects-reducer";
// import handleSubmit from "redux-form/lib/handleSubmit";

const SearchComponent = () => {
   const [posts, setPosts] = useState([]);
   const [searchParams, setSearchParams] = useSearchParams();
   // debugger
   const elemQuery = searchParams.get('post') || '';
   console.log(elemQuery)


   // const [posts2, setPosts2] = useState(0);

   const handleSubmit = (e) => {
      e.preventDefault()
      // debugger
      const form = e.target;

      const query = form.search.value.toLowerCase();
      setSearchParams({post: query});

      console.log(query);


      fetch('http://newlook.vokayly7.beget.tech/wp-json/wp/v2/posts')
         .then(res => res.json()
         .then(data => setPosts(data))
         .then(json => ({
            totalPosts: console.log(res.headers.get("x-wp-total")),
            // json

         })))
         // .then(data => setPosts2(data.headers.get("x-wp-total")))

      // console.log(totalPosts);
      // debugger
   }


   // useEffect(() => {

      // dispatch(getProjectsThunkCreator(page, pageSize))

      // fetch('http://newlook.vokayly7.beget.tech/wp-json/wp/v2/posts/?per_page=100')
      //    .then(res => res.json())
      //    .then(data => setPosts(data))
      // console.log(posts)
         // debugger

      // fetch('https://swapi.dev/api/films/1/')
      //    .then(ress => ress.json())
      //    .then(data => console.log(data))
      // debugger
         // .then(data => setPosts(data))

   // },[])

   // debugger

   return <>
      <AnimatedPage>
         <div className='contain' >
            <form autoComplete="off" onSubmit={handleSubmit}>
               <input type="search" name="search" />
               <button type="submit">Отправить</button>
            </form>
            <div className='_mt20'>
               {posts.filter(
                  post => post.title.rendered.toLowerCase().includes(elemQuery)
               ).map(post => (
                  <Link to={`/projects/${post.id}`}>
                     <li className='_mt10' >{post.title.rendered}</li>
                  </Link>
               ))}
            </div>
         </div>
      </AnimatedPage>
   </>
}


export default SearchComponent