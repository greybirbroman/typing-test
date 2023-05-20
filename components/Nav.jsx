'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, } from 'react';

const Nav = () => {
  const [toggleDropdown, setToggleDroppdown] = useState(false);
  
  const toggleMenu = () => {
    setToggleDroppdown((prev) => !prev);
  };

  return (
    <nav className='flex-between w-full sm:p-10 xs:p-8 px-6 py-12 z-50'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='promptopia-logo'
          width={30}
          height={30}
          className='object-contain'
        />
      </Link>

      <div className='md:flex hidden'>
        <div className='flex gap-3 md:gap-5'>
          <Link href='/testing' className='black_btn'>
            Typing Test
          </Link>
          <Link href='/courses' className='black_btn'>
            Courses
          </Link>
          <Link href='/education' className='black_btn'>
            Education
          </Link>
          <button type='button' className='outline_btn'>
            Sign Out
          </button>

          <button onClick={() => {}} className='outline_btn' type='button'>
            Sign In
          </button>
        </div>
      </div>
      {/* For Mobile Navigation*/}
      <div className='md:hidden flex relative'>
        <div className='flex'>
          <Image
            onClick={toggleMenu}
            src='/assets/images/menu_icon.svg'
            width={30}
            height={30}
            className='cursor-pointer'
            alt='profile-image'
          />
          {toggleDropdown && (
            <div className='dropdown'>
              <Link
                href='/testing'
                className='dropdown_link'
                onClick={toggleMenu}
              >
                Typing Test
              </Link>
              <Link
                href='/courses'
                className='dropdown_link'
                onClick={toggleMenu}
              >
                Courses
              </Link>
              <Link
                href='/education'
                className='dropdown_link'
                onClick={toggleMenu}
              >
                Education
              </Link>
              <button
                type='button'
                onClick={() => {
                  toggleMenu();
                }}
                className='black_btn'
              >
                Sign In
              </button>
              <button
                onClick={() => toggleMenu()}
                className='outline_btn'
                type='button'
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
