'use client';
import { motion as m } from 'framer-motion';
import { staggerContainer } from '../../utils/motion';
import { TypingText, DescText } from '../../components/CustomTexts';
import { testingList } from '@/constants';
import Form from '@/components/Form';

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
      <Form />
      <ul className='py-3 px-3 w-full flex flex-col sm:flex-row gap-5 m-10'>
        {testingList.map((card, index) => (
          <li 
          key={index}
          className='rounded shadow-lg py-3 px-3 w-full flex flex-col gap-3 bg-gradient-to-b from-white to-slate-50'>
          <h3 className='font-semibold sm:text-[20px]'>{card.title}</h3>
          <p className='font-normal text-gray-700 tracking-tight leading-5'>{card.description}</p>
        </li>
        ))}
        
      </ul>
    </m.section>
  );
};

export default Testing;
