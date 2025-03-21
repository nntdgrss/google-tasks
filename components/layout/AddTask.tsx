"use client";

import { Clock4, Plus, Star } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/toast";

export default function AddTask() {
  const [isOpen, setIsOpen] = useState(false);
  const [taskValue, setTaskValue] = useState("");
  const [isFeatured, setIsFeatured] = useState(false); // New state for featured tasks
  const [isDescription, setIsDescription] = useState(false); // New state for description tasks
  const [description, setDescription] = useState("");
  const { showToast } = useToast();

  const handleTaskValueInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskValue(event.target.value);
  };

  const handleDescriptionInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!taskValue.trim()) return;

    if (taskValue.trim().length > 50) {
      showToast("Задача не может превышать 50 символов", 2000);
      return;
    }

    // Handle form submission
    console.log("Task Value:", taskValue);
    console.log("Description:", description);
    console.log("Is Featured:", isFeatured);

    setTaskValue("");
    setIsFeatured(false); // Reset featured state on submit
    setIsOpen(false);
    setIsDescription(false); // Reset description state on submit
    setDescription(""); // Reset description on submit
  };

  const handleFeatureClick = () => {
    setIsFeatured(!isFeatured);
  };

  const handleDescritionClick = () => {
    setIsDescription(!isDescription);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 w-screen h-screen bg-black/20"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 w-full h-auto bg-[#1f2020] rounded-t-[20px] p-4"
            >
              <input
                autoFocus
                className="border-none outline-0 text-[1rem] w-full"
                placeholder="Новая задача"
                value={taskValue}
                onKeyDown={handleKeyDown}
                onChange={handleTaskValueInputChange}
              />
              {isDescription && (
                <input
                  autoFocus
                  className="border-none outline-0 text-[0.8rem] w-full"
                  placeholder="Описание задачи"
                  value={description}
                  onKeyDown={handleKeyDown}
                  onChange={handleDescriptionInputChange}
                />
              )}
              <div className="flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row items-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill={isDescription ? "#d696db" : "#C1BDBD"}
                    onClick={handleDescritionClick}
                  >
                    <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
                  </svg>
                  <Clock4
                    size={20}
                    className="text-[#C1BDBD]"
                    strokeWidth={2}
                  />
                  <Star
                    size={20}
                    className={isFeatured ? "text-[#d696db]" : "text-[#C1BDBD]"}
                    strokeWidth={2}
                    onClick={handleFeatureClick}
                  />
                </div>
                <button
                  className={`font-medium text-sm ${
                    taskValue.trim()
                      ? "text-[#d696db] cursor-pointer"
                      : "text-zinc-600 cursor-not-allowed"
                  }`}
                  disabled={!taskValue.trim()}
                  onClick={handleSubmit}
                >
                  Сохранить
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div
        className={`fixed bottom-7 right-3 size-12 rounded-xl bg-[#534153] drop-shadow-[0_3px_6px_rgba(83,65,83,0.5)] flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200 ${
          isOpen && "hidden"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* 
      drop-shadow-[offset-x_offset-y_blur-radius_color]
      - offset-x: horizontal offset (0 = no horizontal shift)
      - offset-y: vertical offset (8px = down)
      - blur-radius: shadow blur (24px = soft shadow)
      - color: rgba or hex (using rgba for opacity control)
      */}
        <Plus size={37} className="text-[#f4dbf1] p-2" />
      </div>
    </>
  );
}
