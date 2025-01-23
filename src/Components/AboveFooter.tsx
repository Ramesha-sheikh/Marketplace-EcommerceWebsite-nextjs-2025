import React from "react";

const Sectionthree = () => {
  return (
    <div className="max-w-[1440px] h-auto bg-[#FAF4F4] flex items-center justify-center">
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 max-w-[1240px] px-4 py-8">
        {/* Card 1 */}
        <div className="w-full md:w-[376px] text-center md:text-left group relative border-4 border-transparent animate-border-gradient">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 rounded-lg blur-md opacity-75"></div>
          <div className="relative bg-[#FAF4F4] p-4 rounded-lg">
            <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold group-hover:text-[#FF8C8C] transition-colors duration-300">
              Free Delivery
            </h1>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] group-hover:text-[#FF8C8C] transition-colors duration-300">
              For all orders over $50, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full md:w-[376px] text-center md:text-left group relative border-4 border-transparent animate-border-gradient">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 rounded-lg blur-md opacity-75"></div>
          <div className="relative bg-[#FAF4F4] p-4 rounded-lg">
            <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold group-hover:text-[#FF8C8C] transition-colors duration-300">
              90 Days Return
            </h1>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] group-hover:text-[#FF8C8C] transition-colors duration-300">
              If goods have problems, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full md:w-[376px] text-center md:text-left group relative border-4 border-transparent animate-border-gradient">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 rounded-lg blur-md opacity-75"></div>
          <div className="relative bg-[#FAF4F4] p-4 rounded-lg">
            <h1 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold group-hover:text-[#FF8C8C] transition-colors duration-300">
              Secure Payment
            </h1>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] group-hover:text-[#FF8C8C] transition-colors duration-300">
              100% secure payment, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sectionthree;
