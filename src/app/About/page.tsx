import React from 'react'
import AboveFooter from '../../Components/AboveFooter'
import Image from "next/image";



const page = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center py-10 md:py-20">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6">
          About Us
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          We are a passionate team dedicated to providing high-quality products
          to our customers. Our mission is to deliver excellence and innovation
          in every step of the process.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="/team.jpeg"
            alt="Our Team"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4">
            Started from humble beginnings, we have grown into a reputable
            organization. Our focus has always been on creating value and
            making a difference in the lives of our customers.
          </p>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            With years of experience and a dedicated team, we strive to offer
            the best services and products that reflect our commitment to
            quality and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-10 md:py-20 bg-gray-100 rounded-lg">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6">
            Our Mission
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            To innovate and deliver top-notch products while maintaining
            ethical standards and ensuring customer satisfaction. We aim to be
            leaders in the industry by consistently improving and evolving.
          </p>
        </div>
      </section>
      <AboveFooter />

    </div>
    
  )
}

export default page



