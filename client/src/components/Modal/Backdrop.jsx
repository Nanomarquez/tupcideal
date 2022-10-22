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
    className='fixed top-1/2 left-1/2 mt-[-300px] ml-[-300px] h-[600px] w-[600px] bg-white z-[1000000] overflow-scroll overflow-x-hidden shadow-lg rounded-md'
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