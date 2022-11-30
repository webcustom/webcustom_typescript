import React from 'react';


export function lazyloadImg(){

   const options = {
      // родитель целевого элемента - область просмотра
      root: null,
      // без отступов
      rootMargin: '0px 0px 0px 0px',
      // процент пересечения - половина изображения
      threshold: 0
   }

   // создаем наблюдатель
   const observer = new IntersectionObserver((entries, observer) => {
      // для каждой записи-целевого элемента
      entries.forEach(entry => {
         // если элемент является наблюдаемым
         if (entry.isIntersecting) {
            const lazyImg = entry.target

            let dataSrc = lazyImg.getAttribute(['data-src'])
            if(lazyImg.tagName == "IMG"){
               lazyImg.setAttribute('src', dataSrc)
            }else{
               lazyImg.style.backgroundImage = 'url("'+ dataSrc +'")'
            }

            lazyImg.style.opacity = 1

            // прекращаем наблюдение
            observer.unobserve(lazyImg)
         }
      })
   }, options)

   const arr = document.querySelectorAll('.lazyImg[data-src]') // будет работать с данными элементами
   arr.forEach(i => {
      observer.observe(i)
   })

}
