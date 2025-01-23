import React from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import AboveFooter from "../../Components/AboveFooter";

const AccountPage = () => {
  return (
    <>
      <div className="relative">
        <Image
          src={"/Spic1.png"}
          alt="pic1"
          width={1440}
          height={316}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image
            src={"/Spic2.png"}
            alt="pic2"
            width={77}
            height={77}
            className="w-[7%] md:w-[77px] md:h-[77px] "
          />
          <p className="font-[500] text-[24px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-[36px] sm:leading-[48px] md:leading-[72px] lg:leading-[80px] text-black">
            My Account
          </p>
          <div className="text-[12px] sm:text-[16px]  text-gray-600 flex items-center space-x-1">
            <p>Home</p>
            <FaChevronRight className="text-gray-800" />
            <p>My Account</p>
          </div>
        </div>
      </div>

      {/* Login & Register Section */}
      <section className="py-16 px-6 md:px-16 lg:px-32 bg-[#FBEBB5]">
        <div className="flex flex-wrap justify-center md:justify-evenly gap-12">
          {/* Log In Form */}
          <div className="bg-white p-8 rounded-md w-full max-w-md">
            <h2 className="text-[36px] font-[600] mb-8">Log In</h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-4 text-[16px] font-normal"
                >
                  Username or email address
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full border rounded-md p-5 text-[16px] font-normal"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-4 text-[16px] font-normal"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full border rounded-md p-5 text-[16px] font-normal"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="w-4 h-4" />
                <label htmlFor="remember" className="text-[16px]">
                  Remember me
                </label>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <button className="w-full md:w-[212px] h-[64px] bg-white text-black border  text-[20px] font-400 py-3 rounded-[15px]">
                  Log In
                </button>
                <p className="text-[16px] text-center mt-3 md:mt-0">
                  <a href="#" className="text-gray-500">
                    Lost Your Password?
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Register Form */}
          <div className="bg-white p-8 rounded-md w-full max-w-md">
            <h2 className="text-[36px] font-[600] mb-8">Register</h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-4 text-[16px] font-normal"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border rounded-md p-5 text-[16px] font-normal"
                />
              </div>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                A link to set a new password will be sent to your email address.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Personal data will be used to support your experience throughout
                this website and for other purposes described in our{" "}
                <a href="#" className="text-blue-500 underline">
                  privacy policy.
                </a>
              </p>
              <button className="w-full md:w-[212px] h-[64px] bg-white text-black border text-[20px] font-400 py-3 rounded-[15px]">
                Register
              </button>
            </form>
          </div>
        </div>
      </section>

      <AboveFooter />
    </>
  );
};

export default AccountPage;
