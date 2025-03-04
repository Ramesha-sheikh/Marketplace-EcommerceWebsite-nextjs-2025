import React from 'react';
import Image from 'next/image';
import { IoIosArrowForward } from "react-icons/io";
// Remove `poppins` if not being used
// import { Poppins } from 'next/font/google';

// Define the structure of the `prop` parameter
interface UCardProps {
  title: string;
  heading: string;
}

const UCard: React.FC<UCardProps> = ({ title, heading }) => {
  return (
    <div className="relative bg-[url('/Spic1.png')] bg-cover bg-center h-64 w-full ">
      <div className="absolute inset-0 bg-white bg-opacity-20"></div>

      <div className="relative z-10 flex justify-center items-center h-full flex-col gap-11">
        <div className="w-[106px] h-[133px] flex flex-col">
          <div className="w-[77px] h-[77px]">
            <Image
              src="/Spic2.png"
              alt="image"
              width={106}
              height={106}
            />
          </div>
          <div className="w-[106px] h-[72px] absolute top-28">
            <h1 className="text-[48px] lowercase">{title}</h1>
          </div>
        </div>

        <div className="absolute top-44 flex-nowrap w-56 text-nowrap flex flex-row">
          <ul className="flex flex-col flex-nowrap sm:flex-row mr-11 items-center justify-center w-[100px] px-0 sm:w-auto sm:space-y-0 sm:ml-[50px] md:ml-[99px]">
            <li className="w-[48px] sm:w-[82px] h-[24px] mx-[5px] sm:mx-[10px] text-center flex items-center gap-3">
              Home
              <li className="px-1">
                <IoIosArrowForward className="w-[20px] h-[20px] flex justify-center" />
              </li>
            </li>
            <li className="w-[48px] sm:w-[82px] h-[24px] sm:mx-[10px] text-center flex items-center">
              {heading}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UCard;
