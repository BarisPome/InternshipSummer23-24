"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState } from "react";
import { handleSignIn } from "../actions";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { useRouter } from 'next/navigation';
import { AuthError, authErrorMessages, AuthSuccess, authSuccessMessages } from '../constants';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>("");

  // Display a toast message based on the query parameter of sign out or reset password
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const { success: successToast, error: errorToast } = useToast();

  useEffect(() => {
    if (message === 'SignOutSuccess') {
      successToast(authSuccessMessages[AuthSuccess.SUCCEEDED_TO_SIGN_OUT]);
    } else if (message === 'SignOutError') {
      errorToast(authErrorMessages[AuthError.FAILED_TO_SIGN_OUT]);
    } else if (message === 'PasswordResetSuccess') {
      successToast(authSuccessMessages[AuthSuccess.SUCCEEDED_TO_RESET_PASSWORD]);
    }
  }, [message]);

  // Handle sign in, place query parameter on success
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await handleSignIn(email, password);
      router.push('/?message=SignInSuccess');
    } catch (error: any) {
      errorToast(authErrorMessages[error.message as AuthError] ?? error.message);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/favicon.ico"
            style={{ height: '100px', width: 'auto' }} // Adjust the height and width as needed
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/request-password-change"
                    className="font-semibold"
                    style={{ color: 'rgba(63, 122, 192, 1)' }}
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                  style={{
                    focusRingColor: 'rgba(63, 122, 192, 1)'
                  }}
                  onChange={(e) => setPassword(e.target.value)}
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
                Sign in
              </button>
            </div>
          </form>
  
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a
              href="/sign-up"
              className="font-semibold leading-6"
              style={{ color: 'rgba(63, 122, 192, 1)' }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );  
}