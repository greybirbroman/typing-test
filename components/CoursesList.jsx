import { coursesList } from '../constants/index';
import { motion as m } from 'framer-motion';
import { fadeIn } from '@/utils/motion';

const CoursesList = () => {
  return (
    <section className='flex-center flex-col'>
      <ul className='grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3 items-stretch justify-center sm:my-20 my-10 w-full'>
        {coursesList.map((course, index) => (
          <m.li
            variants={fadeIn('up', 'spring', index * 0.5, 1)}
            key={index}
            className='flex flex-col gap-3 bg-white py-2 px-3 rounded shadow-lg relative z-0'
          >
            <img
              src={course.image}
              alt='keyboard'
              className='h-[150px] object-cover'
            />
            <h3 className='font-semibold sm:text-[20px]'>{course.title}</h3>
            <p className='font-normal text-gray-700 tracking-tight'>
              {course.description}
            </p>
            <button className='black_btn bg-white w-fit self-center absolute z-10 top-[20px] right-[20px]'>
              Начать
            </button>
          </m.li>
        ))}
      </ul>
    </section>
  );
};

export default CoursesList;
