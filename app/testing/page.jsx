'use client';
import { motion as m } from 'framer-motion';
import { staggerContainer } from '../../utils/motion';
import { TypingText, DescText } from '../../components/CustomTexts';
import TestForm from '@/components/TestForm';
import TestingList from '@/components/TestingList';

const Testing = () => {

  const pageTitle = 'Pass our typing test';
  const pageDesc =
    'Type in a little text. Check how many characters per minute you are typing and impress your friends or employers with a typing speed certificate.';

  return (
    <m.section
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className='w-full flex flex-col items-center'
    >
      <TypingText title={pageTitle} />
      <DescText title={pageDesc} />
      <TestForm />
      <TestingList />
    </m.section>
  );
};

export default Testing;
