import React from 'react'
import Image from "next/image";
import Link from 'next/link'

const Sectiontwo = () => {
  return (
    <div>
          {/* view more section */}

      <div className="max-w-[1440px] min-h-[850px] bg-[#FAF4F4] py-10">
        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 max-w-7xl">
          {/* First Image Section */}
          <div className="flex flex-col items-center">
            <Image
              src="/pic2.png"
              alt="Side Table 1"
              width={605}
              height={562}
              className="mr-28 cursor-pointer transition-transform hover:scale-105"
            />
            <div className="sm:mr-32 sm:-mt-20">
              <p className="font-[500] text-[24px] md:text-[36px] leading-[36px] md:leading-[54px]">
                Side Table
              </p>
              <Link href='/shopnow'>
              <p className="underline underline-offset-8 mt-2 cursor-pointer font-[500] text-[16px] transition-transform hover:scale-105 hover:text-gray-700">
                View More
              </p>
              </Link>
            </div>
          </div>

          {/* Second Image Section */}
          <div className="flex flex-col items-center">
            <Image
              src="/pic3.png"
              alt="Side Table 2"
              width={605}
              height={562}
              className="mr-28 cursor-pointer transition-transform hover:scale-105"
            />
            <div className="sm:mr-32 sm:-mt-20">
              <p className="font-[500] text-[24px] md:text-[36px] leading-[36px] md:leading-[54px]">
                Sofa
              </p>
              <Link href='/shopnow'>
              <p className="underline underline-offset-8 mt-2 cursor-pointer font-[500] text-[16px] transition-transform hover:scale-105 hover:text-gray-700">
                View More
              </p>
              </Link>
           
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Sectiontwo
