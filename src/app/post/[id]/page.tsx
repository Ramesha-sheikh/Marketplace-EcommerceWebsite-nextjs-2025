import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
// import imageUrlBuilder from "@sanity/image-url";
import { Clock4, User, CalendarDays } from "lucide-react";

// Sanity image URL builder
// const builder = imageUrlBuilder(client);

// function urlFor(source: { asset: { _ref: string } }) {
//   return builder.image(source);
// }

interface BlogProps {
  params: { id: string };
}

export default async function BlogDetail({ params }: BlogProps) {
  const { id } = params;

  // Fetch the specific blog data using its ID
  const blog = await client.fetch(
    `
    *[_type == "blog" && _id == $id][0]{
      title,
      "image": image.asset->url,
      content,
      date,
      name
    }
  `,
    { id }
  );

  if (!blog) {
    notFound(); // If blog is not found, show a 404 page
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 md:px-8 py-10">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-5 text-center sm:text-left">
        {blog.title}
      </h1>
      
      {/* Info Section */}
      <div className="flex flex-row sm:flex-row sm:gap-6 gap-4 items-start sm:items-center text-gray-600 pb-5">
        {/* Author Name */}
        <div className="flex gap-2 items-center">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{blog.name}</span>
        </div>

        {/* Read Time */}
        <div className="flex gap-2 items-center">
          <Clock4 className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">2 min read</span>
        </div>

        {/* Date */}
        <div className="flex gap-2 items-center">
          <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">{blog.date}</span>
        </div>
      </div>

      {/* Blog Image */}
      <Image
        src={blog.image}
        alt={blog.title}
        width={800}
        height={500}
        className="w-full h-[250px] sm:h-[350px] md:h-[500px] rounded-lg object-cover"
      />

      {/* Blog Content */}
      <p className="text-gray-700 mt-5 text-sm sm:text-base md:text-lg text-justify leading-6 sm:leading-7 md:leading-8">
        {blog.content}
      </p>
    </div>
  );
}


