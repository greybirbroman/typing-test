'use client';
import CoursesList from '@/components/CoursesList';
import { motion as m } from 'framer-motion';
import { staggerContainer } from '@/utils/motion';
import { TypingText, DescText } from '@/components/CustomTexts';

const Courses = () => {

  const pageTitle = 'Our typing courses';
  const pageDesc =
    'Study statistic showed that typing speed can be improved by up to 20% by using a typing trainer!';
    
  return (
    <m.section
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className='w-full flex flex-col items-center'
    >
      <TypingText title={pageTitle}/>
      <DescText title={pageDesc} />
      <CoursesList />
    </m.section>
  );
};

export default Courses;
