/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import mongoose from "mongoose";
import Blog from "@/models/Blog";
import Link from "next/link";
import {useRouter} from 'next/router'

export const getServerSideProps = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const blogs = await Blog.find();
  return {
    props: { blogs: JSON.parse(JSON.stringify(blogs)) },
  };
};

const Blogs = ({blogs}) => {
  const router = useRouter();
  const parseDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-light text-gray-900 mb-12 text-center">
            Blogs
          </h1>
          
          <div className="space-y-8">
            {blogs.map((item) => (
              <article key={item.slug} className="border-b border-gray-100 pb-8 last:border-b-0">
                <div className="flex flex-col space-y-3">
                  <time className="text-sm text-gray-500 font-light">
                    {parseDate(item.createdAt)}
                  </time>
                  
                  <h2 className="text-2xl font-medium text-gray-900 leading-tight">
                    {item.title}
                  </h2>
                  
                  <div className="prose prose-gray max-w-none text-gray-600 line-clamp-3">
                    <div dangerouslySetInnerHTML={{__html: item.content}} />
                  </div>
                  
                  <Link
                    href={`/blogs/${item.slug}`}
                    className="inline-flex items-center text-sm text-gray-900 hover:text-gray-600 transition-colors duration-200 mt-4 group"
                  >
                    Read more
                    <svg 
                      className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
