import { testingList } from '@/constants';
import { motion as m } from 'framer-motion';
import { fadeIn } from '@/utils/motion';

const TestingList = () => {
  return (
    <ul className='w-full flex flex-col sm:flex-row gap-5 my-10 list-inside'>
      {testingList.map((card, index) => (
        <m.li
          variants={fadeIn('up', 'spring', index * 0.5, 1)}
          key={index}
          className='rounded shadow-md py-3 px-3 w-full flex flex-col items-center gap-3 text-gray-700 even:bg-orange-400 even:text-white leading-5'
        >
          <img
            src={`/assets/images/keyboard-${index + 3}.jpg`}
            className='rounded-full h-20 w-20 object-cover'
          />
          <h3 className='font-semibold text-[20px]'>{card.title}</h3>
          <p className='font-normal tracking-tight'>{card.description}</p>
        </m.li>
      ))}
    </ul>
  );
};

export default TestingList;
