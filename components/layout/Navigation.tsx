"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const mockNavagationItems = [
  {
    name: "Все задачи",
    isSelected: true,
    count: 0,
  },
  {
    name: "Программированние",
    isSelected: false,
    count: 23,
  },
];

export default function Navigation() {
  const [items, setItems] = useState(mockNavagationItems);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLHeadingElement | null>>([]);

  const handleStarClick = () => {
    setSelectedIndex(-1);
    setItems(items.map((item) => ({ ...item, isSelected: false })));
  };

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
    setItems(
      items.map((item, i) => ({
        ...item,
        isSelected: i === index,
      }))
    );
  };

  useEffect(() => {
    const updateIndicatorStyle = () => {
      if (typeof window === "undefined") return;

      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const scrollOffset = containerRef.current?.scrollLeft || 0;

      if (selectedIndex === -1 && starRef.current) {
        const starLeft = starRef.current.offsetLeft;
        setIndicatorStyle({
          width: "25px",
          transform: `translateX(${starLeft - 8}px)`,
        });
      } else if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
        const element = itemRefs.current[selectedIndex];
        if (element) {
          const elementLeft = element.offsetLeft;
          const elementWidth = element.offsetWidth;
          setIndicatorStyle({
            width: `${elementWidth}px`,
            transform: `translateX(${elementLeft - 12}px)`,
          });
        }
      }
    };

    updateIndicatorStyle();

    const handleEvents = () => {
      requestAnimationFrame(updateIndicatorStyle);
    };

    window.addEventListener("resize", handleEvents);
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleEvents);
    }

    return () => {
      window.removeEventListener("resize", handleEvents);
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleEvents);
      }
    };
  }, [selectedIndex]);

  return (
    <>
      <div
        ref={containerRef}
        className="navigation-container relative flex flex-row gap-3 justify-start items-center pt-4 pb-1 px-3 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div
          ref={starRef}
          onClick={handleStarClick}
          className={`cursor-pointer flex-shrink-0 ${
            selectedIndex === -1 ? "text-[#f7adfd]" : ""
          }`}
        >
          <Image
            src="/star-filled.svg"
            alt="star"
            width={25}
            height={25}
            className="ml-1"
          />
        </div>

        {items.map((item, index) => (
          <h1
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={() => handleItemClick(index)}
            className={`text-sm mx-2 relative cursor-pointer nav-item flex items-center gap-2 ${
              item.isSelected ? "text-[#f7adfd]" : "text-[#A8A8A8]"
            }`}
          >
            {item.name}
            {item.count > 0 && !item.isSelected && (
              <span className="text-[0.6rem] bg-[#343535] px-1.5 py-0.5 rounded-full">
                {item.count}
              </span>
            )}
          </h1>
        ))}

        <h1 className="flex flex-row justify-center items-center text-sm ml-4 text-[#A8A8A8] cursor-pointer">
          <Image
            src="/add.svg"
            alt="add"
            width={16}
            height={16}
            className="mr-1"
          />
          Создать список
        </h1>

        <div
          className="nav-indicator bg-[#f7adfd] h-[2px] rounded-3xl absolute bottom-0"
          style={indicatorStyle}
        />
      </div>
      <div className="w-screen h-[2px] bg-[#343535]" />
    </>
  );
}
