import Image from "next/image";
import React from "react";
import Hero from "@/Components/Hero";
import Sectiontwo from "@/Components/Sectiontwo";
import Sectionfive from "@/Components/New arrival";
import Link from "next/link";
import HomeCards from "@/Components/toppiccards/cards";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { Clock4, CalendarDays } from "lucide-react";

// Sanity image builder function
const builder = imageUrlBuilder(client);

// Type for image source (Sanity image asset)
interface SanityImageSource {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// Sanity URL builder function
function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  name: string;
}

const Home = async () => {
  // Fetch blog data from Sanity
  const res = await client.fetch(`
    *[_type == "blog"]{
      _id,
      title,
      date,
      "image": image.asset->_id,
      content,
      name
    }
  `);

  // Extract blog posts (handle errors if needed)
  const blogPosts: BlogPost[] = res.map((post: { _id: string; title: string; date: string; image: string; content: string; name: string }) => ({
    id: post._id,
    title: post.title,
    date: post.date,
    image: post.image,
    content: post.content,
    name: post.name,
  }));

  // Display only the first 3 blog posts on the Home page
  const firstThreePosts = blogPosts.slice(0, 3);

  return (
    <div>
      <Hero />
      <Sectiontwo />
      <HomeCards />
      <Sectionfive />

      {/* Our Blog Section */}
      <div className="max-w-[1440px] min-h-[844px] bg-[#FFFFFF] px-11">
        <div className="flex flex-col items-center text-center">
          <p className="font-[500] text-[36px] leading-[54px]">Our Blogs</p>
          <p className="text-[#9F9F9F] font-[500] text-[16px] leading-[24px] mt-4">
            Find a bright ideal to suit your taste with our great selection
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5">
            {firstThreePosts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg w-full h-[390px] rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              >
                <Image
                  src={urlFor({ _type: "image", asset: { _ref: product.image, _type: "reference" } }).width(300).height(300).url()}
                  alt={product.title}
                  width={300}
                  height={500}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg text-gray-900 text-wrap">{product.title}</h3>
                </div>
                <Link
                  href={`/post/${product.id}`}
                  className="text-black hover:underline block text-center font-semibold text-lg"
                >
                  Read More
                </Link>
                <div className="flex flex-row gap-5 justify-center items-center mt-4">
                  <div className="flex gap-2">
                    <Clock4 />
                    <span>2 min read</span>
                  </div>
                  <div className="flex gap-2">
                    <CalendarDays />
                    <span>{product.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-28">
          <Link href="/Blogpage">
            <p className="underline underline-offset-8 mt-2 cursor-pointer font-[500] text-[20px] transition-transform hover:scale-105 hover:text-gray-700">
              View All Post
            </p>
          </Link>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="relative w-full h-auto">
        <div className="w-full h-[450px]">
          <Image
            src={"/pic12.png"}
            alt="pic12"
            width={1440}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <p className="font-bold text-[40px] md:text-[60px] leading-[50px] md:leading-[90px]">
              Our Instagram
            </p>
            <p className="font-[400] text-[16px] md:text-[20px] leading-[24px] md:leading-[30px]">
              Follow our store on Instagram
            </p>
          </div>
          <div>
            <Link href="https://www.instagram.com/">
              <button className="w-[200px] h-[50px] md:w-[255px] md:h-[64px] rounded-full bg-white transition-transform hover:scale-105 text-black font-[500] text-[16px] md:text-[20px] drop-shadow-lg">
                Follow Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
