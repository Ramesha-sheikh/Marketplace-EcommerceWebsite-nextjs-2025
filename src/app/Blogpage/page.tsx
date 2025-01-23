import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from "@/sanity/lib/client";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
  name: string;
}

interface SanityBlogPost {
  _id: string;
  title: string;
  date: string;
  image: {
    asset: {
      url: string;
    };
  };
  content: string;
  name: string;
}

const Blog = async () => {
  const res = await client.fetch(`
    *[_type == "blog"]{
      _id,
      title,
      date,
      "image": image.asset->url,
      content,
      name
    }
  `);

  const blogPosts: BlogPost[] = res.map((post: SanityBlogPost) => ({
    id: post._id,
    title: post.title,
    date: post.date,
    image: post.image,
    content: post.content,
    name: post.name,
  }));

  const recentPosts = blogPosts.slice(0, 4);

  return (
    <div>
      <section className="relative h-[50vh] bg-cover bg-center bg-[url('/Spic1.png')]">
        <div className="absolute inset-0 bg-white opacity-30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <Image
              src="/Spic2.png"
              alt="Blog Icon"
              width={100}
              height={100}
              className="object-cover rounded-full"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">Blog</h1>
          <p className="text-lg sm:text-xl mt-4">
            <Link href="/">Home</Link> &gt; Blog
          </p>
        </div>
      </section>

      <section className="bg-white py-6 sm:py-10">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="sm:col-span-2 lg:col-span-3 space-y-6">
              {blogPosts.slice(0, 4).map((post) => (
                <div key={post.id}>
                  <div className="w-full h-auto">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={500}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold mt-4">{post.title}</h1>
                  <p className="text-gray-600 mt-4 text-justify text-sm sm:text-base">
                    {post.content}
                  </p>
                  <Link href={`/post/${post.id}`} className="text-gray-600 hover:underline mt-4 block">
                    Read More
                  </Link>
                </div>
              ))}
            </div>

            <div className="sm:col-span-2 lg:col-span-2 space-y-6">
              <h1 className="text-xl sm:text-2xl font-bold mb-4">Recent Posts</h1>
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center space-x-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={120}
                    height={120}
                    className="object-cover w-[100px] h-[100px] rounded-md"
                  />
                  <div>
                    <h2 className="text-black font-bold text-sm sm:text-base">
                      {post.title}
                    </h2>
                    <Link href={`/post/${post.id}`} className="text-gray-500 hover:underline mt-4 block">
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF4F4] text-black py-10">
        <div className="container mx-auto px-2 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h2 className="text-black font-bold text-2xl sm:text-3xl text-center">Free Delivery</h2>
              <p className="text-base sm:text-lg text-gray-700 text-center">For all orders over $50, consectetur adipiscing elit.</p>
            </div>
            <div>
              <h2 className="text-black font-bold text-2xl sm:text-3xl text-center">90 Days Return</h2>
              <p className="text-base sm:text-lg text-gray-700 text-center">If the product has an issue, consectetur adipiscing elit.</p>
            </div>
            <div>
              <h2 className="text-black font-bold text-2xl sm:text-3xl text-center">Secure Payments</h2>
              <p className="text-base sm:text-lg text-gray-700 text-center">100% secure payments, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
