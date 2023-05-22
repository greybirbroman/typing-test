'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation'

const Nav = () => {
  const pathname = usePathname()
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
          <Link href='/testing' className={`${pathname === '/testing' ? 'orange_btn_nohover' : 'black_btn'}`}>
            Typing Test
          </Link>
          <Link href='/courses' className={`${pathname === '/courses' ? 'orange_btn_nohover' : 'black_btn'}`}>
            Courses
          </Link>
          <Link href='/education' className={`${pathname === '/education' ? 'orange_btn_nohover' : 'black_btn'}`}>
            Education
          </Link>
          <Link href='/signout' className='outline_btn'>
            Sign Out
          </Link>
          <Link href='/signin' className='outline_btn'>
            Sign In
          </Link>
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
              <Link href='/signin' className='black_btn' onClick={toggleMenu}>
                Sign In
              </Link>
              <Link
                href='/signout'
                className='outline_btn'
                onClick={toggleMenu}
              >
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
