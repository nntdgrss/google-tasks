import Avatar from "../features/avatar";

export default function Header() {
  return (
    <div className="p-4 flex flex-row items-center justify-end">
      <h1 className="text-[1.2rem] font-light absolute left-1/2 -translate-x-1/2">
        Задачи
      </h1>
      <Avatar />
    </div>
  );
}

Header.metadata = {
  renderPriority: "low",
  stableTime: 60000,
};
