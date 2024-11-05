"use client"

import { useState } from "react";
import { handleForgotPassword } from "../actions";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { AuthError, authErrorMessages } from "../constants";
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword(){
  const [email, setEmail] = useState<string>(""); 

  const { error: errorToast } = useToast();

  const handleSubmit = async (event: any) => {
    event.preventDefault();  

    try {
        await handleForgotPassword(email);
    } catch (error: any) {
        errorToast(authErrorMessages[error.message as AuthError] ?? error.message);
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/favicon.ico"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                  style={{
                    focusRingColor: 'rgba(63, 122, 192, 1)'
                  }}
                  onChange={(e) => { setEmail(e.target.value); }}
                />
              </div>
            </div>
    
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                style={{
                  backgroundColor: 'rgba(63, 122, 192, 1)',
                  hover: { backgroundColor: 'rgba(63, 122, 192, 0.8)' },
                  focusVisible: { outlineColor: 'rgba(63, 122, 192, 1)', outlineOffset: '2px' }
                }}
              >
                Submit
              </button>
            </div>
          </form>
  
          <p className="mt-10 text-center text-sm text-gray-500">
            Remembered your password? {' '}
            <a
              href="/sign-in"
              className="font-semibold leading-6"
              style={{ color: 'rgba(63, 122, 192, 1)' }}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );

}
  