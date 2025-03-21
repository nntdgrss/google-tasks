"use client";

import React, { useState, useEffect } from "react";

interface RippleProps {
  children: React.ReactNode;
  color?: string;
}

interface RippleType {
  x: number;
  y: number;
  id: number;
}

export function RippleEffect({
  children,
  color = "rgba(255, 255, 255, 0.1)",
}: RippleProps) {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  useEffect(() => {
    const cleanup = () => {
      ripples.forEach((ripple) => {
        const element = document.getElementById(`ripple-${ripple.id}`);
        if (element) {
          element.remove();
        }
      });
      setRipples([]);
    };

    return cleanup;
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ripple: RippleType = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, ripple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
    }, 1000);
  };

  return (
    <div className="relative overflow-hidden" onClick={handleClick}>
      {children}
      {ripples.map((ripple) => (
        <span
          id={`ripple-${ripple.id}`}
          key={ripple.id}
          className="pointer-events-none"
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: color,
            animation: "ripple 1s ease-out",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(100);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
