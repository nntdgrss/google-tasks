"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RippleEffect } from "@/components/ui/RippleEffect";

const mockTodoData = [
  {
    id: 1,
    title: "Задача 1",
    desciption: "Описание задачи 1",
    complitedDate: "2025-03-20",
  },
  {
    id: 2,
    title: "Задача 2",
    complitedDate: "2025-02-23",
  },
  {
    id: 3,
    title: "Задача 31",
    complitedDate: "2025-02-20",
  },
  {
    id: 4,
    title: "Задача 4",
    complitedDate: "2025-01-20",
  },
];

export default function ComplitedTodo() {
  const [opened, setOpened] = useState(false);

  const formatDate = (date: string) => {
    const inputDate = new Date(date);

    const weekdays = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    const months = [
      "янв.",
      "фев.",
      "мар.",
      "апр.",
      "мая",
      "июн.",
      "июл.",
      "авг.",
      "сен.",
      "окт.",
      "ноя.",
      "дек.",
    ];
    const day = weekdays[inputDate.getDay()];
    const month = months[inputDate.getMonth()];
    return `${day}, ${date} ${month}`;
  };

  return (
    <div className="m-3 px-4 pb-4 bg-[#131314] rounded-xl">
      <RippleEffect color="rgba(214, 150, 219, 0.1)">
        <div
          className="flex flex-row items-center justify-between cursor-pointer h-12 w-full"
          onClick={() => setOpened(!opened)}
        >
          <h1 className="text-sm">Выполненные</h1>
          <Image
            src="/arrow.svg"
            alt="arrow"
            width={25}
            height={25}
            style={{
              transform: opened ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
      </RippleEffect>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col gap-3 mt-4"
          >
            {mockTodoData.map((todo) => (
              <div
                key={todo.id}
                className="flex flex-row items-start justify-start p-1 mb-2"
              >
                <Check size={18} color="#d696db" strokeWidth={3} />
                <div className="flex flex-col ml-2">
                  <h1 className="text-sm font-light line-through">
                    {todo.title}
                  </h1>
                  <p className="text-xs font-light text-zinc-300">
                    {todo.desciption}
                  </p>
                  <p className="text-xs font-light text-zinc-300">
                    Выполнена: {formatDate(todo.complitedDate)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {mockTodoData.length === 0 && opened && (
        <div className="flex flex-row items-center justify-center w-full h-20">
          <p className="text-sm font-light text-zinc-300">
            У вас пока нет выполненных задач
          </p>
        </div>
      )}
    </div>
  );
}
