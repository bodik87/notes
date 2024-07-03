import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITodo } from "../../lib/types";
import { text } from "../../lang";
import Modal from "../modal";
import { TodoCheckedIcon, TodoIcon } from "../icons";
import { cn } from "../../lib/utils";
import Chip from "../chip";

type Inputs = { todoBody: string };
type TodosProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Todos({ open, setOpen }: TodosProps) {
  const [language] = useLocalStorage<string>("lang", "EN");
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ todoBody }) => {
    if (todoBody) {
      const newTodo: ITodo = { id: uuidv4(), todoBody, isCompleted: false };
      if (todos.length === 0) {
        setTodos([newTodo]);
      } else {
        setTodos([...todos, newTodo]);
      }
      reset();
      setOpen(false);
    }
  };

  const handleClose = (id: string) => {
    setTodos(todos.filter((el) => el.id !== id));
  };

  return (
    <section className={`${todos.length === 0 ? "mt-0" : "mt-4"} px-3`}>
      {open && (
        <Modal setOpen={setOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("todoBody", { required: true })}
              placeholder={text.todo[language]}
              autoComplete="off"
              spellCheck={"false"}
              className="bg-transparent"
              onKeyUp={(e) => e.key === "Enter" && e.currentTarget.blur()}
              autoFocus
            />

            <button type="submit" className="btn mt-4 min-w-14 bg-app-gray">
              OK
            </button>
          </form>

          {todos.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {todos.map((todo) => (
                <Chip
                  id={todo.id}
                  label={todo.todoBody}
                  onClose={handleClose}
                />
              ))}
            </div>
          )}
        </Modal>
      )}

      <div className="flex flex-col gap-2 text-sm">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </section>
  );
}

type TodoItemProps = {
  todo: ITodo;
};

function TodoItem({ todo }: TodoItemProps) {
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const [isSelected, setIsSelected] = useState(todo.isCompleted);
  const handleChange = (todoId: string) => {
    setIsSelected(!isSelected);
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };
  return (
    <button
      className={cn(
        "flex items-center gap-3 text-lg",
        todo.isCompleted ? "line-through text-app-gray-200" : ""
      )}
      onClick={() => handleChange(todo.id)}
    >
      {todo.isCompleted ? <TodoCheckedIcon /> : <TodoIcon />} {todo.todoBody}
    </button>
  );
}
