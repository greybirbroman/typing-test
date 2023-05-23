import { motion as m } from 'framer-motion';

const MotionPointer = () => {
  return (
    <m.img
      animate={{
        y: [-10, 10, -10],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
      }}
      src='/assets/images/pointer.png'
      alt='cursor-pointer'
      className='h-10 w-10 object-contain mt-5'
    />
  );
};

export default MotionPointer;
