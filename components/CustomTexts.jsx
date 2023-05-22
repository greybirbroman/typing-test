'use client';

import { motion as m } from 'framer-motion';
import { textContainer, textVariant2 } from '../utils/motion';

export const TypingText = ({ title, textStyles }) => (
  <m.h2 variants={textContainer} className={`head_text ${textStyles}`}>
    {Array.from(title).map((letter, index) => (
      <m.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </m.span>
    ))}
  </m.h2>
);

export const DescText = ({ title, textStyles }) => (
  <m.p
    variants={textVariant2}
    initial='hidden'
    whileInView='show'
    className={`sm:text-[24px] text-[18px] text-center orange_gradient mt-5 max-w-lg ${textStyles}`}
  >
    {title}
  </m.p>
);
