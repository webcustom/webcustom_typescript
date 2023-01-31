import {motion} from "framer-motion"
import React from "react"; // /dist/framer-motion"


interface PropsType{
   children: React.ReactNode  //| React.ReactElement //| JSX.Element | JSX.Element[]
   initial?: string | undefined
   exit?: string | undefined
   classList?: string
}


const animations = {
   initial: {opacity: 0, x: 100},
   animate: {opacity: 1, x: 0},
   exit: {opacity: 0, x: -100},
}

//Анимация переходов между страницами
const AnimatedPage: React.FC<PropsType> = ({children, initial="initial", exit="exit", classList}) => {
   return (
      <motion.div className={classList ? classList+' animationBlock' : 'animationBlock'} variants={animations} initial={initial} animate="animate" exit={exit} transition={{duration: .5}}>
         {children}
      </motion.div>
   )
}

export default AnimatedPage