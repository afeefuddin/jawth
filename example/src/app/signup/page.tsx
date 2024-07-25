"use client"
import axios from 'axios'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { Toaster, toast } from 'sonner'

 const signup_schema = z.object({
    email: z.object({value: z.string()}),
    username: z.object({value: z.string()}),
    password: z.object({value: z.string()}),

})
function Signup() {
    const [clicked,setClicked] = useState(false)
    const [signupDone,setSignupDone] = useState(false)
    async function onSubmit(e: React.FormEvent){
        e.preventDefault()
        const parsed_data = signup_schema.parse(e.target)
        // console.log()
        setClicked(true)
        try {
            const resp = await axios.post('/api/signup',{
                email: parsed_data.email.value,
                password: parsed_data.password.value,
                username: parsed_data.username.value
            },{
                withCredentials: true
            })
            if(resp.data){
              setSignupDone(true)
            }
        } catch (error: unknown) {
         
          toast((error as Error).message)
            console.log(error)
        } finally{
            setClicked(false)
        }
    }

    useEffect(()=>{
      if(signupDone){
        redirect('/login')
      }
    },[signupDone])

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <div className='text-center text-3xl font-bold'>JAWTH</div>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign up to your account
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <Toaster />
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
          Username
        </label>
        <div className="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>


      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button disabled={clicked === true}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Already have an account?{' '}
      <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
       Login
      </Link>
    </p>
  </div>
</div>
  )
}

export default Signup