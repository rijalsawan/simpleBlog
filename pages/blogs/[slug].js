/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Blog from "@/models/Blog";

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const blogs = await Blog.findOne({ slug: context.query.slug });
  return {
    props: { blogs: JSON.parse(JSON.stringify(blogs)) },
  };
};

const Blogs = ({blogs}) => {
    console.log(blogs);

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
      <div className="px-4 sm:px-6 md:px-8 mt-10">
        <div className="max-w-3xl mx-auto">
          <main>
            <article className="relative pt-10">
              <h1 className="text-2xl font-extrabold tracking-tight  md:text-3xl">
                {blogs.title}
              </h1>
              <div className="text-sm leading-6">
                <dl>
                  <dt className="sr-only">Date</dt>
                  <dd className="absolute top-0 inset-x-0">
                    <time dateTime="2024-03-19T18:00:00.000Z">
                        {parseDate(blogs.createdAt)}
                    </time>
                  </dd>
                </dl>
              </div>
              <div className="mt-6">
                <ul className="flex flex-wrap text-sm leading-6 -mt-6 -mx-5">
                  <li className="flex items-center font-medium whitespace-nowrap px-5 mt-6">
                    <img
                      src="/_next/static/media/adamwathan.8adb7a70.jpg"
                      alt=""
                      className="mr-3 w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800"
                      decoding="async"
                    />
                    <div className="text-sm leading-4">
                      <div className="">{blogs.user}</div>
                      <div className="mt-1">
                        <a
                          href="https://twitter.com/adamwathan"
                          className="text-sky-500 hover:text-sky-600 dark:text-sky-400"
                        >
                          @{blogs.user}
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </article>
            <p className="mt-10">
                {blogs.content}
            </p>
          </main>
        </div>
      </div>
    </>
  );
};

export default Blogs;
