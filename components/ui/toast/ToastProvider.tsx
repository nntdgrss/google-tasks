"use client";

import { useState } from "react";
import { Toast } from "./Toast";
import { ToastContext } from "./ToastContext";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({
    message: "",
    isVisible: false,
    duration: 3000,
  });

  const showToast = (message: string, duration = 3000) => {
    setState({ message, isVisible: true, duration });
  };

  const hideToast = () => {
    setState((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        message={state.message}
        isVisible={state.isVisible}
        duration={state.duration}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};
