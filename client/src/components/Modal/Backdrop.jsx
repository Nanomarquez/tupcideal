import {motion} from 'framer-motion'

const dropIn = {
  hidden:{
    y: "-100vh"
  },
  visible:{
    y:"0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping:100,
      stiffness: 500,
    }
  },
  exit:{
    y: "100vh"
  }
}


function Backdrop({children,onClick}) {
  return (
    <motion.div
    className='fixed sm:top-1/2 top-1/3 left-1/2 sm:mt-[-300px] sm:ml-[-300px] sm:h-[600px] sm:w-[600px] h-[500px] w-[300px] mt-[-150px] ml-[-150px] bg-white z-[1000000] overflow-scroll overflow-x-hidden shadow-lg rounded-md'
    onClick={onClick}
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit"
    >
    {children}
    </motion.div>
  )
}

export default Backdrop