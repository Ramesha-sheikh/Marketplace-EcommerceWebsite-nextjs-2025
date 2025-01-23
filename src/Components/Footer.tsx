import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="max-w-[1440px] bg-white py-12 px-4 ">
        <div className="max-w-[1240px]  mx-auto flex flex-wrap justify-between items-start gap-8">
          {/* Address Section */}
          <div className="w-full sm:w-[285px]">
            <p className="font-[400] text-[16px] leading-[24px] text-[#9F9F9F] sm:mt-20">
              400 University Drive Suite 200 Coral <br /> Gables, <br /> FL
              33134 USA
            </p>
          </div>
          {/* Links Section */}
          <div className="w-full sm:w-[352px] flex justify-between gap-8">
            <div className="space-y-7 flex flex-col">
              <p className="font-[500] text-[16px] leading-[24px] text-[#9F9F9F] cursor-pointer">
                Link
              </p>
              <Link href={"/"} className="font-[500] text-[16px] leading-[24px] text-black cursor-pointer">
                Home
              </Link>
              <Link href={"/Shop"} className="font-[500] text-[16px] leading-[24px] text-black cursor-pointer">
                Shop
              </Link>
              <Link href="/About"  className="font-[500] text-[16px] leading-[24px] text-black cursor-pointer">
                About
              </Link>
              <Link  href="/Contact" className="font-[500] text-[16px] leading-[24px] text-black cursor-pointer">
                Contact
              </Link>
            </div>
            <div className="space-y-7 ">
              <p className="font-[500] text-[16px] leading-[24px] text-[#9F9F9F] cursor-pointer">
                Help
              </p>
              <p className="font-[500] text-[16px] leading-[24px] text-black cursor-pointer">
                Payment Options
              </p>
              <p className="font-[500] text-[16px] leading-[24px] text-black cursor-pointer">
                Returns
              </p>
              <p className="font-[500] text-[16px] leading-[24px] text-black cursor-pointer">
                Privacy Policies
              </p>
            </div>
          </div>
          {/* email Section */}
          <div className="w-full sm:w-[286px]">
            <p className="font-[500] text-[16px] leading-[24px] text-[#9F9F9F]">
              Newsletter
            </p>
            <div className="mt-5 flex items-center justify-center space-x-3">
              <input
                type="text"
                placeholder="Enter Your Email Address"
                className="w-[230px] font-[400] text-[14px] leading-[21px] border-b border-black focus:outline-none"
              />
              <button className="font-[500] text-[14px] leading-[21px] text-black border-b border-black px-4">
                SUBSCRIBE
              </button>
            </div>
          </div>
          <div className="w-full h-auto">
            <div className="border border-[#D9D9D9] mt-6"></div>
            <div className="w-[306px] h-[24px]">
              <p className="font-[400] text-[16px] leading-[24px] text-black mt-8">
                2022 Meubel House. All rights reverved
              </p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Footer;
