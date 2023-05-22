'use client';
import { motion as m } from 'framer-motion';
import { staggerContainer } from '../../utils/motion';
import { TypingText, DescText } from '../../components/CustomTexts';

const Education = () => {

  const pageTitle = 'Learn how to type';
  const pageDesc =
    'Do not peek at the keyboard while typing. Just slide your fingers over the keys until you find the main line.';

  return (
    <m.section
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className='2xl:max-w-[1280px] w-full mx-auto flex flex-col items-center'
    >
      <TypingText title={pageTitle} />
      <DescText title={pageDesc} />
    </m.section>
  );
};

export default Education;
