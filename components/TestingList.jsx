import { testingList } from '@/constants';
import { motion as m } from 'framer-motion';
import { fadeIn } from '@/utils/motion';

const TestingList = () => {
  return (
    <ul className='w-full flex flex-col sm:flex-row gap-5 my-10'>
        {testingList.map((card, index) => (
          <m.li 
          variants={fadeIn('up', 'spring', index * 0.5, 1)}
          key={index}
          className='rounded shadow py-3 px-3 w-full flex flex-col gap-3 text-gray-700 even:bg-slate-50'>
          <h3 className='font-semibold text-[20px] leading-5'>{card.title}</h3>
          <p className='font-normal tracking-tight leading-5'>{card.description}</p>
        </m.li>
        ))}  
      </ul>
  )
}

export default TestingList
