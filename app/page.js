'use client';
import { motion as m } from 'framer-motion';
import { staggerContainer } from '@/utils/motion';
import { TypingText, DescText } from '@/components/CustomTexts';
import Link from 'next/link';
import MotionPointer from '@/components/MotionPointer';

const Home = () => {
  const pageTitle = 'Typing Test';
  const pageDesc =
    'Learn to type fast with the our Keyboard Trainer. And touch typing lessons will help you use all 10 fingers.';
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
        <h1 className='text-center head_text'>
          Type <span className='orange_gradient'>Faster</span> with
        </h1>
        <Link href='/testing'>
          <TypingText title={pageTitle} />
        </Link>
        <MotionPointer />
        <DescText title={pageDesc} />
      </m.section>
    </>
  );
};

export default Home;
