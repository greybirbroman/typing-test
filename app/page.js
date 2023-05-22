'use client';
import { motion as m } from 'framer-motion';
import { staggerContainer } from '@/utils/motion';
import { TypingText, DescText } from '@/components/CustomTexts';

const Home = () => {
  const pageTitle = 'Typing Test'
  const pageDesc = 'Learn to type fast with the our Keyboard Trainer. And touch typing lessons will help you use all 10 fingers.'
  return (
    <>
    <div className='gradient'></div>
    <m.section
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className='flex flex-col items-center justify-center'
    >
      <span className='text-center head_text'>Type faster with</span>
      <TypingText title={pageTitle} />
      <DescText title={pageDesc}/>
    </m.section>
    </>
  );
};

export default Home;
