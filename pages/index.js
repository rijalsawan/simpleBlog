
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Highlight, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [state , setState] = useState(false)
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setState(false)
      router.push("/login");
    }
    else{
      setState(true)
    }
  }, []);
  return (
    <>
    <Navbar state={state}/>
      <div className="lg:flex justify-center lg:mt-[10rem] lg:mb-[10rem]">
        <div className="w-1/2">
          {/* <h1 className="font-bold text-[3rem] w-[30rem]">Welcome to the Simple Blogging App</h1> */}
          <Heading lineHeight='tall'>
            <Highlight
              query='simple'
              styles={{ px: '3', py: '1', rounded: 'full', bg: 'red.200'}}
            >
              Welcome to the Simple Blogging App.
            </Highlight>
          </Heading>
          <p className="text-lg w-[30rem] my-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ratione hic dolorem! Tempore praesentium nam sapiente ipsa non, a fugiat?</p>
        </div>
        <div className="w1/2">
          <img className="" height={500} width={500} src="https://production-server-default-bucket.s3.amazonaws.com/64ec5007da11467032babb55" alt="image" />
        </div>
      </div>
      <div className="justify-center flex">
      <Link href={"/createblog"}><button className="bg-gray-900 p-2 rounded-lg text-white font-bold hover:bg-gray-700 transition-all ease-in-out duration-150 shadow-lg">Get Started</button></Link>
      </div>
    </>
  );
}
