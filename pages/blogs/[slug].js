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
    const parseDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <article className="space-y-8">
          {/* Header */}
          <header className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {blogs.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <time dateTime={blogs.createdAt}>
                {parseDate(blogs.createdAt)}
              </time>
              <span>•</span>
              <span>By @{blogs.user}</span>
            </div>
          </header>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{__html: blogs.content}}
          />
        </article>
      </div>
    </div>
  );
};

export default Blogs;
