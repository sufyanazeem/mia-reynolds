'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import NavMobile from './NavMobile';
import Nav from './Nav';
import MenuBtn from './MenuBtn';
import Social from './Social';

const Header = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detect scroll
      setActive(window.scrollY > 100);
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed z-50 w-full transition-all ${
    active ? 'bg-[#030315] py-6 transition-all' 
    : 'bg-transparent py-8 transition-all'}`}>
      
      
      <div className='container mx-auto flex flex-col xl:flex-row items-center justify-between'>
        {/* Logo */}
        <Link href={'#'} className='relative flex w-[226px] h-[37.64px] transition-all mb-4 xl:mb-0'>
          <Image 
          src={'/assets/header/logo.svg'}
           fill
           className='object-contain' />
          </Link>
           {/* nav */}
          <Nav containerStyles='hidden xl:flex items-center gap-x-8'/>

           {/* nav mobile*/}
          <NavMobile/>

           {/* menu btn*/}
           <div className='absolute right-7 top-9 z-10 xl:hidden'>

        <MenuBtn/>
           </div>
           {/* socials*/}
       <Social containerStyles='flex text-[24px] gap-x-4'
       iconStyles='hover:text-accent transition-all'/>
       
      </div>
    </header>
  );
};

export default Header;
