"use client"

import { useState, useEffect } from "react";
import { handleResetPassword } from "../actions";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";  
import { AuthError, authErrorMessages } from "../constants";
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
    const [newPassword, setPassword] = useState<string>("") 
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    const { error: errorToast } = useToast();

    useEffect(() => {
        if (!code) {
          errorToast(authErrorMessages[AuthError.INVALID_OR_EXPIRED_CODE]);
        }
    }, [code]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!code) {
            errorToast(authErrorMessages[AuthError.INVALID_OR_EXPIRED_CODE]);
            return;
        }

        try {
            await handleResetPassword(newPassword, confirmPassword, code);
            router.push('/sign-in?message=PasswordResetSuccess');
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
              Choose a new password
            </h2>
          </div>
    
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    New Password
                  </label>
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
                      focusRingColor: 'rgba(63, 122, 192, 1)',
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
    
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                    style={{
                      focusRingColor: 'rgba(63, 122, 192, 1)',
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    focusVisible: {
                      outlineColor: 'rgba(63, 122, 192, 1)',
                      outlineOffset: '2px',
                    },
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
    
  }
