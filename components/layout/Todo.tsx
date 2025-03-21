"use client";

import { Check, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mockTodoData = [
  {
    id: 1,
    title: "Задача 1",
    description: "Описание задачи 1",
    stared: false,
    date: "2025-04-21",
  },
  {
    id: 2,
    title: "Задача 2",
    description: "Описание задачи 2",
    stared: true,
    date: "2025-03-20",
  },
  {
    id: 3,
    title: "Задача 3",
    description: "Описание задачи 3",
    stared: false,
    date: "2025-02-03",
  },
  {
    id: 4,
    title: "Задача 4",
    description: "",
    stared: false,
    date: "2025-01-04",
  },
  {
    id: 5,
    title: "Задача 5",
    description: "ASdasd",
    stared: false,
    date: "2024-06-14",
  },
];

export default function Todo() {
  const [todoData, setTodoData] = useState(mockTodoData);
  const [completedTodos, setCompletedTodos] = useState<number[]>([]);

  const createParticles = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const button = target.closest("button");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const particlesContainer = document.createElement("div");
    particlesContainer.style.position = "fixed";
    particlesContainer.style.left = `${rect.left + 8}px`; // Размер кружка 16px (size-4 = 1rem = 16px), берем центр
    particlesContainer.style.top = `${rect.top + 8}px`;
    particlesContainer.style.zIndex = "9999";
    particlesContainer.style.pointerEvents = "none";

    for (let i = 0; i < 6; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);
    setTimeout(() => document.body.removeChild(particlesContainer), 400);
  };

  const handleComplete = (id: number, event: React.MouseEvent) => {
    if (!completedTodos.includes(id)) {
      setCompletedTodos([...completedTodos, id]);
      createParticles(event);

      // Удаляем задачу из списка после анимации затухания
      setTimeout(() => {
        setTodoData((prev) => prev.filter((todo) => todo.id !== id));
      }, 300);
    }
  };

  const formatDate = (date: string) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const diffTime = currentDate.getTime() - inputDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Если дата будущая
    if (diffDays < 0) {
      if (diffDays === -1) {
        return "Завтра";
      }
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
      const date = inputDate.getDate();
      const month = months[inputDate.getMonth()];
      return `${day}, ${date} ${month}`;
    }

    // Если сегодня
    if (diffDays === 0) {
      return "Сегодня";
    }

    // Если вчера или до 6 дней назад
    if (diffDays > 0 && diffDays <= 6) {
      return `${diffDays} ${diffDays === 1 ? "день" : "дней"} назад`;
    }

    // Если неделя или более
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? "неделю" : "недель"} назад`;
  };

  const colorDate = (date: string) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const diffTime = currentDate.getTime() - inputDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If date is today or in the future
    if (diffDays <= 0) {
      return "#adadaa"; // grayish color
    }
    // If date is in the past
    return "#f1aba6"; // reddish color
  };

  return (
    <div className="m-3 p-4 bg-[#131314] rounded-xl">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-sm">Мои задачи</h1>
        <div className="flex flex-row items-center gap-5">
          <Image
            src="/swap-vert.svg"
            alt="swap-vert"
            width={17}
            height={17}
            className="select-none cursor-pointer"
          />
          <Image
            src="/more-vert.svg"
            alt="sort"
            width={17}
            height={17}
            className="select-none cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <AnimatePresence>
          {todoData.map((todo, index) => (
            <motion.div
              key={todo.id}
              className="flex flex-row items-center justify-between p-1 mb-2"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center">
                  <motion.button
                    type="button"
                    className="cursor-pointer outline-none relative"
                    onClick={(e) => handleComplete(todo.id, e)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {completedTodos.includes(todo.id) ? (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: completedTodos.includes(todo.id) ? 0 : 1,
                        }}
                        transition={{
                          scale: { duration: 0.2 },
                          opacity: { duration: 0.5 },
                        }}
                        className="size-4 rounded-full bg-[#d696db] flex items-center justify-center"
                      >
                        <Check size={12} color="white" strokeWidth={3} />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="size-4 border-[1.8px] border-zinc-300/80 rounded-full"
                        whileHover={{ borderColor: "#d696db" }}
                      />
                    )}
                  </motion.button>
                  <motion.div
                    className="ml-4 flex flex-col items-start"
                    animate={{
                      opacity: completedTodos.includes(todo.id) ? 0 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-[0.9rem]">{todo.title}</h1>
                    {todo.description && (
                      <p className="text-[0.7rem] text-zinc-300 font-light">
                        {todo.description}
                      </p>
                    )}
                    {todo.date && (
                      <p
                        className="text-[0.7rem] font-light"
                        style={{ color: colorDate(todo.date) }}
                      >
                        {formatDate(todo.date)}
                      </p>
                    )}
                  </motion.div>
                </div>
                <Star
                  size={20}
                  className="select-none cursor-pointer"
                  style={{ color: todo.stared ? "#d696db" : "#adadaa" }}
                />
              </div>
            </motion.div>
          ))}
          {todoData.length === 0 && (
            <motion.div
              className="flex flex-row items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[0.8rem] text-zinc-300">У вас нет задач</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
