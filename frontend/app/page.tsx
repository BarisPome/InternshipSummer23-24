"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { handleSignOut } from './(auth)/actions';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useToast } from '@/components/ui/toast/ToastProvider';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  const { error: errorToast } = useToast();

  useEffect(() => {
    if (message === 'PasswordResetSuccess') {
      errorToast('Password reset successful');
    } 
  }, [message]);

  const onSignOut = async () => {
    try {
      await handleSignOut();
      router.push('/sign-in?message=SignOutSuccess'); // Redirect with a success message query parameter
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      router.push('/sign-in?message=SignOutError'); // Redirect with an error message query parameter
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>
        <button
          type="button"
          onClick={onSignOut}
          style={{
            backgroundColor: 'rgba(63, 122, 192, 1)',
            color: 'white',
            padding: '0.375rem 0.75rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            lineHeight: '1.5rem',
            borderRadius: '0.375rem',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
          onMouseOver={(e) => {
            const target = e.target as HTMLElement; // Type assertion
            target.style.backgroundColor = 'rgba(63, 122, 192, 0.8)';
          }}
          onMouseOut={(e) => {
            const target = e.target as HTMLElement; // Type assertion
            target.style.backgroundColor = 'rgba(63, 122, 192, 1)';
          }}
          onFocus={(e) => {
            const target = e.target as HTMLElement; // Type assertion
            target.style.outline = '2px solid rgba(63, 122, 192, 1)';
            target.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            const target = e.target as HTMLElement; // Type assertion
            target.style.outline = 'none';
          }}
        >
          Sign out
        </button>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.beko.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/favicon.ico"
              alt="beko logo right top"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/favicon.ico"
          alt="beko logo center"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <Link
          //app/Chargeback
          href="/Chargeback/UploadFile"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Chargeback{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Handle Chargeback Processes and Get Data Insights.
          </p>
        </Link>

        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            TO DO 2{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            TO DO 2
          </p>
        </a>

        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            TO DO 3{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            TO DO 3
          </p>
        </a>

        <a
          href=""
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            TO DO 4{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            TO DO 4
          </p>
        </a>
      </div>
    </main>
  );
}
