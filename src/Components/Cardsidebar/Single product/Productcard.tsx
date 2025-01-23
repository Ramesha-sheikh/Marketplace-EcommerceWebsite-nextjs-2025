import React from 'react';
import Image from 'next/image'; // Import the Image component

const Productcard = () => {
  return (
    <div className="max-w-[1440px] h-auto bg-white flex flex-col items-center p-6">
      {/* Title Section */}
      <h1 className="text-[36px] font-bold text-gray-800 mb-6">Related Products</h1>

      {/* Products Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[1200px]">
        {/* Card 1 */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <a href="#">
            <Image 
              className="rounded-t-lg w-full h-[200px] object-cover" 
              src="/w4.png" 
              alt="Product 1" 
              width={500} 
              height={200} 
            />
          </a>
          <div className="p-4 mt-5">
            <p className="mb-3 text-[16px] font-normal text-gray-600">
              Trenton modular sofa_3
            </p>
            <h1 className='text-[24px]'>Rs. 25,000.00</h1>
          </div>
        </div>

        {/* Card 2 */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <a href="#">
            <Image 
              className="rounded-t-lg w-full h-[200px] object-cover" 
              src="/w2.png" 
              alt="Product 2" 
              width={500} 
              height={200} 
            />
          </a>
          <div className="p-4 mt-5">
            <p className="mb-3 text-[16px] font-normal text-gray-600">
              Granite dining table with dining chair
            </p>
            <h1 className='text-[24px]'>Rs. 25,000.00</h1>
          </div>
        </div>

        {/* Card 3 */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <a href="#">
            <Image 
              className="rounded-t-lg w-full h-[200px] object-cover" 
              src="/w1.png" 
              alt="Product 3" 
              width={500} 
              height={200} 
            />
          </a>
          <div className="p-4 mt-5">
            <p className="mb-3 text-[16px] font-normal text-gray-600">
              Outdoor bar table and stool
            </p>
            <h1 className='text-[24px]'>Rs. 25,000.00</h1>
          </div>
        </div>

        {/* Card 4 */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <a href="#">
            <Image 
              className="rounded-t-lg w-full h-[200px] object-cover" 
              src="/w5.png" 
              alt="Product 4" 
              width={500} 
              height={200} 
            />
          </a>
          <div className="p-4 mt-5">
            <p className="mb-3 text-[16px] font-normal text-gray-600">
              Plain console with teak mirror
            </p>
            <h1 className='text-[24px]'>Rs. 25,000.00</h1>
          </div>
        </div>
      </div>

      <div className='mt-28'>
        <button className="w-[104px] h-[30px] font-bold text-black py-11 border-b-2 border-black">
          View More
        </button>
      </div>
    </div>
  );
};

export default Productcard;
