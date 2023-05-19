'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const page = usePathname();

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='typing-test-logo'
          width={30}
          height={30}
          className='object-contain'
        />
      </Link>
      <div className='md:flex hidden items-center gap-4 font-semibold text-gray-700'>
        <Link
          href='/keyboard-trainer'
          className={`link_btn ${
            page === '/keyboard-trainer' ? 'active_btn' : ''
          }`}
        >
          Training
        </Link>
        <Link
          href='/testing'
          className={`link_btn ${page === '/testing' ? 'active_btn' : ''}`}
        >
          Testing
        </Link>
        <Link
          href='/education'
          className={`link_btn ${page === '/education' ? 'active_btn' : ''}`}
        >
          Education
        </Link>
        <Link
          href='courses'
          className={`link_btn ${page === '/courses' ? 'active_btn' : ''}`}
        >
          Courses
        </Link>
        <div className='sm:flex hidden w-[2px] h-[30px] bg-black' />
        <button type='button' className='w-fit black_btn'>
          Sign In
        </button>
        <button type='button' className='w-fit outline_btn'>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
