
import { Inter } from "next/font/google";
import Link from "next/link";
import { Highlight, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  
  return (
    <>
      <div className="lg:flex max-sm:m-4 justify-center lg:mt-[10rem] lg:mb-[10rem]">
        <div className="lg:w-1/2">
          {/* <h1 className="font-bold text-[3rem] w-[30rem]">Welcome to the Simple Blogging App</h1> */}
          <Heading lineHeight='tall'>
            <Highlight
              query='simple'
              styles={{ px: '3', py: '1', rounded: 'full', bg: 'red.200'}}
            >
              Welcome to the Simple Blogging App.
            </Highlight>
          </Heading>
          <p className="text-lg lg:w-[30rem] my-10">
Welcome to our simple and intuitive blog app, where creativity meets convenience. With an easy-to-use interface, you can effortlessly create, publish, and share your thoughts with the world. Whether you&apos;re a seasoned blogger or just starting out, our platform offers everything you need to express yourself and connect with like-minded individuals.</p>
        </div>
        <div className="">
          <img className="" height={500} width={500} src="https://production-server-default-bucket.s3.amazonaws.com/64ec5007da11467032babb55" alt="image" />
        </div>
      </div>
      <div className="justify-center flex">
      <Link href={"/createblog"}><button className="bg-gray-900 p-2 rounded-lg text-white font-bold hover:bg-gray-700 transition-all ease-in-out duration-150 shadow-lg">Get Started</button></Link>
      </div>
    </>
  );
}
