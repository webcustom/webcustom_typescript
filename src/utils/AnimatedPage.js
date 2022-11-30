import {motion} from "framer-motion/dist/framer-motion"

const animations = {
   initial: {opacity: 0, x: 100},
   animate: {opacity: 1, x: 0},
   exit: {opacity: 0, x: -100},
}

//Анимация переходов между страницами

const AnimatedPage = ({children, initial="initial", exit="exit", classList}) => {
   return (
      <motion.div className={classList ? classList+' animationBlock' : 'animationBlock'} variants={animations} initial={initial} animate="animate" exit={exit} transition={{duration: .5}}>
         {children}
      </motion.div>
   )
}

export default AnimatedPage