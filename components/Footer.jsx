'use client';
import { socials } from '../constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='sm:p-16 xs:p-8 px-6 py-12 w-full bg-black bg-opacity-20'>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between flex-wrap gap-4'>
          <h4 className='font-extrabold text-[24px] text-gray-700'>
            Typing Test
          </h4>
          <p className='font-normal text-[14px] text-gray-700 opacity-50'>
            Copyright © {year} Typing Test. All rights reserved.
          </p>
          <ul className='flex gap-4'>
            {socials.map((social) => (
              <li key={social.name}>
                <img
                  src={social.url}
                  alt={social.name}
                  className='w-[24px] h-[24px] object-contain cursor-pointer'
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
