"use client"

import React, { createContext, useContext, useMemo, ReactNode, useRef } from 'react';
import { ToastContainer, toast, ToastContainerProps, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastContextType {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastProvider = ({ children }: ToastProviderProps) => {
  const toastConfig: ToastContainerProps = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true
  };

  const toastIds = useRef(new Map<string, string>());

  const contextValue = useMemo(() => {
    const showToast = (type: 'success' | 'error' | 'info' | 'warning', message: string, options?: ToastOptions) => {
      const now = Date.now();
      const lastShown = toastIds.current.get(message);
      if (!lastShown || now - parseInt(lastShown) > 1000) {
        toastIds.current.set(message, now.toString());
        toast[type](message, { ...toastConfig, ...options });
      }
    };

    return {
      success: (message: string, options?: ToastOptions) => showToast('success', message, options),
      error: (message: string, options?: ToastOptions) => showToast('error', message, options),
      info: (message: string, options?: ToastOptions) => showToast('info', message, options),
      warning: (message: string, options?: ToastOptions) => showToast('warning', message, options),
    };
  }, []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer {...toastConfig} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;