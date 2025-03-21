"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  duration?: number;
  isVisible?: boolean;
  onClose?: () => void;
}

export const Toast = ({
  message,
  duration = 3000,
  isVisible = false,
  onClose,
}: ToastProps) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);

    if (isVisible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-50 transform -translate-x-1/2 px-4 w-full flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div
            className={cn(
              "bg-gray-800 text-white py-2 px-4 rounded-full text-sm max-w-xs mx-auto",
              "shadow-lg text-center"
            )}
          >
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
