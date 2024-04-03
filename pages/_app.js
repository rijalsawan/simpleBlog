import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import LoadingBar from 'react-top-loading-bar';
import { useRouter } from "next/router";
import { useState } from "react";


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    router.events.on('routeChangeComplete', () => setProgress(100))
    router.events.on('routeChangeStart', () => setProgress(40))
  },[]);
  return (
    <>
    <LoadingBar color = "white" progress = {progress} waitingTime = {500} onLoadFinished = {()=>setProgress(0)}/>
    <ChakraProvider> 
    <Component {...pageProps} />
    </ChakraProvider>
    </>
  );
}
