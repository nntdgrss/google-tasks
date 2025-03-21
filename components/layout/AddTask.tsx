import { Plus } from "lucide-react";

export default function AddTask() {
  return (
    <div className="fixed bottom-7 right-3 size-12 rounded-xl bg-[#534153] drop-shadow-[0_3px_6px_rgba(83,65,83,0.5)] flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200">
      {/* 
      drop-shadow-[offset-x_offset-y_blur-radius_color]
      - offset-x: horizontal offset (0 = no horizontal shift)
      - offset-y: vertical offset (8px = down)
      - blur-radius: shadow blur (24px = soft shadow)
      - color: rgba or hex (using rgba for opacity control)
      */}
      <Plus size={37} className="text-[#f4dbf1] p-2" />
    </div>
  );
}
