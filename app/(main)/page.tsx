import Navigation from "@/components/layout/Navigation";
import Header from "../../components/layout/Header";
import Todo from "@/components/layout/Todo";
import ComplitedTodo from "@/components/layout/ComplitedTodo";
import AddTask from "@/components/layout/AddTask";

export default function Home() {
  return (
    <div className="container mx-auto overflow-x-hidden">
      <Header />
      <Navigation />
      <Todo />
      <ComplitedTodo />
      <div className="w-full h-20" />
      <AddTask />
    </div>
  );
}
