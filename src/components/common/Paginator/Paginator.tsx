import styles from "./Paginator.module.sass";
import React, {useState} from 'react';
import cn from "classnames";
import {useNavigate} from "react-router";
import {getProjectsThunkCreator} from "../../../redux/projects-reducer";
import {useDispatch} from "react-redux";
// import { useNavigate } from "react-router-dom";






let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10, catId = undefined}) => {
   // debugger;
   //вычисляем кличество страниц путем разделения всех всех элементов на количество выводимых элементов на странице
   let pagesCount = Math.ceil(totalItemsCount / pageSize); //Math.cell округляет до целого в большую сторону

   let pages = []; //создаем массив индексов страниц [1,2,3...]
   for(let i=1; i <= pagesCount; i++){
      pages.push(i);
   }

   let portionCount = Math.ceil(pagesCount / portionSize); //тут получаем порцию выводимых ссылок страниц
   let [portionNumber, setPortionNumber] = useState(1); //специальный хук кот. позволяет использовать состояние [значение, функция которая меняет это значение]
   let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; //тут получаем номер первого элемента в порции
   let rightPortionPageNumber = portionNumber * portionSize; //тут получаем номер последнего элемента в порции
   // debugger
   // console.log(totalItemsCount);
   // console.log(pageSize);
   // console.log(currentPage);
   // console.log(pages);


   let navigate = useNavigate();
   const dispatch = useDispatch();

   // const onPageChanged2 = (pageNumber) => {
   //    if(pageNumber != currentPage) {
   //       let target;
   //       if (pageNumber > 1) {
   //          target = `/projects/page/${pageNumber}`;
   //       } else {
   //          target = `/projects/`;
   //       }
   //       navigate(target);
   //    }
   // }
   // debugger;

   // const handlePageChanged = (page) => {
   //    if(page != currentPage) {
   //       let target;
   //       if (page > 1) {
   //          target = `/projects/page/${page}`;
   //       } else {
   //          target = `/projects/`;
   //       }
   //       navigate(target);
   //    }
   // }
   //
   // const qqq = (currentPage, pageSize) => {
   //    dispatch(getProjectsThunkCreator(currentPage, pageSize))
   // }



   // const dispatch = useDispatch();
   return <>
      {pages.length > 1 ?
      <div className={styles.pagination}>
         {portionNumber > 1 &&
         <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
         {pages
            .filter( page => page >= leftPortionPageNumber && page <= rightPortionPageNumber )
            .map((page) => {
               return <p className={ cn({   //cn - позволяет прописывать несколько классов и сразу же делать это с условиями
                  [styles.selectedPage]: currentPage === page //читается таким образом что если currentPage === page тогда добавляем класс styles.selectedPage
               }, 'additionalClass')}// additionalClass - класс который добавится полюбому //currentPage === page ? styles.selectedPage : null} //эта строка отличается от той что в учебном курсе
               key={page}
               onClick={(e) => {
                  // dispatch(getProjectsThunkCreator(page, pageSize));
                  // navigate('/projects/page/'+page)
                  // handlePageChanged(page);
                  onPageChanged(page, catId);
               }}> <span>{page}</span></p>
            })}
         {portionCount > portionNumber && <button onClick={()=>{setPortionNumber(portionNumber + 1) }}>NEXT</button>}

      </div> : ''}
   </>
}


export default Paginator;
