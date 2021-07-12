import React, {useEffect} from 'react';
import Preloader from "../../../common/Preloader/Preloader";

// let qqq = store.getState();
// let iii = null;

const ProjectDetail = (props) => {
   // let projectId = props.match.params.projectId - 1;
   // alert(projectId);
   // let qqq = null;

   if(!props.projectDetail){
      return <Preloader/>
   }

   // useEffect(()=>{
   //    if(props.projectDetail != undefined /*&& props.projectDetail != iii*/){
   //       // qqq = props.projectDetail;
   //       alert('111');
   //    }else{
   //       // qqq = <Preloader/>
   //       // alert('222');
   //    }
   //    // debugger;
   //
   //    //    console.log(props);
   // //
   // //
   // },[props.projectDetail]);
   // let src = props.src;
   // console.log(qqq);
   // let qqq = props.getProjectDetailThunkCreator();
   // debugger;

   // for(let i = 0; i <= props.projects.length; i++){
   //    items.push(
   //       <div>
   //          <p>{props.projects[i].acf.project_img.link}</p>
   //          <p>{props.projects[i].title.rendered}</p>
   //          <p>{props.projects[i].acf.detail_text}</p>
   //       </div>
   //    )
   // }
   // debugger;
   // console.log(props.projectDetai);
   // if(props.projectDetail != undefined /*&& props.projectDetail != iii*/){
   //    // iii = props.projectDetail;
   //    return(
   //       <div>
   //          {props.projectDetail.title.rendered}
   //       </div>
   //    )
   //
   // }else{
   //    return(
   //       <Preloader/>
   //    )
   // }
   // debugger;
   return <div>{props.projectDetail.title.rendered}</div>;


};

export default ProjectDetail;


