import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { client } from '../sanity/lib/client';

interface HeroData {
  title: string;
  button: string;
  image: string;
}

const Hero = async () => {
  const hero: HeroData[] = await client.fetch(
    `*[_type == "hero"]{title,button,"image": image.asset->url}`
  );

  const { title, button, image } = hero[0]; // TypeScript checks applied here

  return (
    <div className="bg-[#FBEBB5]">
      {/* Container */}
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center sm:justify-between py-8 px-4 sm:px-16 lg:px-32">
        {/* Text Section */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:w-1/2">
          <p className="text-[24px] sm:text-[36px] lg:text-[64px] font-medium leading-[1.2]">
            {title}
          </p>
          <Link
            href="/shopnow"
            className="mt-4 text-[16px] sm:text-[20px] lg:text-[24px] font-medium text-black bg-yellow-500 px-6 py-2 rounded-md transition-transform hover:scale-105"
          >
            {button}
          </Link>
        </div>

        {/* Image Section */}
        <div className="mt-8 sm:mt-0 sm:w-1/2 flex justify-center">
          <Image
            src={image}
            alt="Hero Image"
            width={803}
            height={1000}
            className="w-[80%] sm:w-[70%] lg:w-[100%] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
