import React, { useEffect } from 'react'
import { useState } from 'react'

const Profile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const handleChange = () => (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value)
        }
        if(e.target.name === 'address'){
            setAddress(e.target.value)
        }
        if(e.target.name === 'phone'){
            setPhone(e.target.value)
        }
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
    }
  return (
    <>
    <div className="container px-4 sm:m-auto min-h-screen">
      <h1 className="font-bold text-3xl my-8 text-center ">Update My Account</h1>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2 ">
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange()}
              type="text"
              value={name}
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2 ">
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email (Default)
            </label>
            <input
              value={email}
              readOnly
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full ">
        <div className="relative mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            onChange={handleChange()}
            value={address}
            cols="30"
            rows="1"
            type="text"
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-4">
        <div className="px-2 w-1/2 ">
          <div className="relative mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone No.
            </label>
            <input
              onChange={handleChange()}
              placeholder="Format: 2041231234"
              value={phone}
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
        <div className='justify-center flex'>
          <button className="flex ml-3 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Update</button>
        </div>
      </div>
    </>
  )
}

export default Profile