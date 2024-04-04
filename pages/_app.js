import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import LoadingBar from 'react-top-loading-bar';
import { useRouter } from "next/router";
import { useState } from "react";


export default function App({ Component, pageProps }) {
  const [state , setState] = useState(false)
  const router = useRouter();
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setState(false)
    }
    else{
      setState(true)
    }
    router.events.on('routeChangeComplete', () => setProgress(100))
    router.events.on('routeChangeStart', () => setProgress(40))
  },[]);
  return (
    <>
    <LoadingBar color = "white" progress = {progress} waitingTime = {500} onLoadFinished = {()=>setProgress(0)}/>
    <Navbar state={state}/>
    <ChakraProvider> 
    <Component {...pageProps} />
    </ChakraProvider>
    </>
  );
}
