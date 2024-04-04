'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useToast } from '@chakra-ui/react'
import Link from 'next/link'

export default function Signin() {
  const toast = useToast();
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [router])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const handleEmailChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
    }

    const handlePasswordChange = (e) => {
        if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let data = {
            email,
            password
        }
        await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                console.log(data)
                localStorage.setItem('token', data.token)
                toast({
                  title: `User login successful`,
                  status: 'success',
                  isClosable: true,
                  duration: 1000
                })
                setTimeout(() => {
                    router.push('/')
                }, 1000)
            }
            else{
                console.log(data.error)
                toast({
                  title: `Register First or Invalid Credentials`,
                  status: 'error',
                  isClosable: true,
                  duration: 1000
                })
            }
        })
    }
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    onChange={handleEmailChange}
                    required
                    className="block px-2 w-full transition-all ease-in-out duration-150 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                    required
                    className="block px-2 transition-all ease-in-out duration-150 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link href={"/signup"}>
              Register
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  