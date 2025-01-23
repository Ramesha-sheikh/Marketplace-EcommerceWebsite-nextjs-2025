import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

const Bartwo = () => {
  return (
    <>
      <header
        className={`max-w-[1440px] h-[100px]  mt-[4px] sm:mt-[30px] md:mt-[60px] flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 ${poppins.className}`}
      >
        <ul className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-2 sm:space-y-0 sm:ml-[50px] md:ml-[99px]">
          <li className="w-auto sm:w-[82px] h-[24px] mx-[5px] sm:mx-[10px] text-center flex items-center gap-3">
            Home <IoIosArrowForward className="w-[20px] h-[20px]" />
          </li>
          <li className="w-auto sm:w-[82px] h-[24px] mx-[5px] sm:mx-[10px] text-center flex items-center gap-3">
            Shop <IoIosArrowForward className="w-[20px] h-[20px]" />
          </li>
          <li
            className="w-auto sm:w-[142px] h-[37px] flex justify-end sm:justify-end items-center text-[14px] sm:text-[16px] font-normal border-l-2"
            style={{ borderColor: '#9F9F9F' }}
          >
            <button className="w-[108px] h-[24px]">Asgaard sofa</button>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Bartwo;
