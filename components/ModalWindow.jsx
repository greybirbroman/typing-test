
import { AnimatePresence, motion as m } from 'framer-motion';

const Modal = ({ children }) => {
  return (
    <AnimatePresence>
      <div className={`z-50 inset-0 flex justify-center items-center fixed`}>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='bg-black bg-opacity-50 absolute inset-0 backdrop-blur-[3px]'
        ></m.div>
        <m.div
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -150 }}
          transition={{ duration: 0.3 }}
          className='relative bg-slate-100 w-[500px] p-10 m-3 sm:m-0 rounded-2xl shadow-xl'
        >
          {children}
        </m.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
