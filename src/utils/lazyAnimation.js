import React from 'react';


export function lazyAnimaton() {

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
            const lazyElem = entry.target
            // если элемент является наблюдаемым
            if (entry.isIntersecting) {

                let delay = lazyElem.getAttribute(['data-delay'])
                delay = Number((delay == null) ? delay = 0 : delay)
                // console.log(delay)

                setTimeout(function(){
                    lazyElem.classList.add('_animGo')
                },delay)
                // прекращаем наблюдение
                observer.unobserve(lazyElem)
            }
            if(!entry.isIntersecting && entry.target.classList.contains('_notDelay')){
                lazyElem.setAttribute(['data-delay'], 200)
            }
        })
    }, options)

    const arr = document.querySelectorAll('._lazyAnimation') // будет работать с данными элементами
    arr.forEach(i => {
        observer.observe(i)
    })
}