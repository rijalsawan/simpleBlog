/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import mongoose from "mongoose";
import Blog from "@/models/Blog";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const getServerSideProps = async (context) => {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    const blogs = await Blog.find();
    return {
      props: { blogs: JSON.parse(JSON.stringify(blogs)) },
    };
  };

const Blogs = ({blogs}) => {
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
     <h1 className="text-3xl text-center mt-5 font-bold">All Blogs</h1>
      <div className="relative lg:w-[40rem]  sm:pb-12 lg:ml-[35rem] mt-10">
     
        <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-slate-200 dark:bg-slate-800 sm:block"></div>
        {blogs.map((item) => { return(<div key={item.slug} className="space-y-16 mb-5 max-sm:m-5">
          <article className="relative group">
            <div className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl"></div>
            <svg
              viewBox="0 0 9 9"
              className="hidden absolute right-full mr-6 top-2  dark:text-slate-400 md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
            >
              <circle
                cx="4.5"
                cy="4.5"
                r="4.5"
                stroke="currentColor"
                className="fill-white dark:fill-slate-400"
              ></circle>
            </svg>
            <div className="relative">
              <h3 className="text-base font-semibold tracking-tight pt-8 lg:pt-0">
                {item.title}
              </h3>
            
              <div className="mt-2 mb-4 prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2">
                <span className="w-[40rem]" dangerouslySetInnerHTML={{__html: item.content}}>
                </span>
              </div>
              <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
                <dt className="sr-only">Date</dt>
                <dd className="whitespace-nowrap text-sm leading-6">
                  <time dateTime="2024-03-19T18:00:00.000Z">
                    {parseDate(item.createdAt)}
                  </time>
                </dd>
              </dl>
            </div>
            <Link
              className="flex items-center text-sm text-sky-500 font-medium"
              href={`/blogs/${item.slug}`}
            >
              <span className="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl"></span>
              <span className="relative">
                Read more
                <span className="sr-only">
                  , We're hiring a Design Engineer + Staff Engineer
                </span>
              </span>
              <svg
                className="relative mt-px overflow-visible ml-2.5 text-sky-300 dark:text-sky-700"
                width="3"
                height="6"
                viewBox="0 0 3 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0L3 3L0 6"></path>
              </svg>
            </Link>
          </article>
        </div>)})}
      </div>
    </>
  );
};

export default Blogs;
