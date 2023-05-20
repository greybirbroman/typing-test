'use client'
import { motion as m } from 'framer-motion';
import { staggerContainer } from '@/utils/motion';
import { TypingText } from '@/components/CustomTexts';


const Home = () => {
  return (
    <section className='flex flex-col items-center'>
      <m.h1
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
      className='head_text text-center'>
        <TypingText title=' Type Faster with' />
        {/* <br className='max-md:hidden' /> */}
        <span className='orange_gradient text-center'>Typing Test</span>
        
      </m.h1>
      <p className='desc text-center'>
        Learn to type fast with the our Keyboard Trainer. And touch typing
        lessons will help you use all 10 fingers.
      </p>
    </section>
  );
};

export default Home;
