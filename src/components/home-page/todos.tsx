import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { SubmitHandler, useForm } from "react-hook-form";
import { Reorder, useDragControls } from "framer-motion";
import { ITodo } from "../../lib/types";
import { text } from "../../lang";
import { TodoCheckedIcon, TodoIcon } from "../icons";
import { cn } from "../../lib/utils";
import Chip from "../chip";
import Modal from "../modal";

type Inputs = { todoBody: string };

export default function Todos() {
  const [language] = useLocalStorage<string>("lang", "EN");
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const [items, setItems] = useState(todos);

  useEffect(() => {
    setItems(todos);
  }, [todos]);

  const [todoModal, setTodoModal] = useState(false);

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
      setTodoModal(false);
    }
  };

  const handleClose = (id: string) => {
    if (confirm(`${text.delete[language]}?`) === true) {
      setTodos(todos.filter((el) => el.id !== id));
    }
  };

  return (
    <section className="mt-4 pc:px-3">
      {todoModal && (
        <Modal setOpen={setTodoModal}>
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

            <button
              type="submit"
              className="btn mt-4 ml-auto w-20 bg-app-blue/20"
            >
              OK
            </button>
          </form>

          {todos.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={cn("", todo.isCompleted && "opacity-80 grayscale")}
                >
                  <Chip
                    id={todo.id}
                    label={todo.todoBody}
                    onClose={handleClose}
                  />
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      <div className="bg-app-gray p-4 pc:rounded-3xl">
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="flex flex-col gap-3"
        >
          {items.map((todo) => (
            <TodoItem key={todo.id} todo={todo} items={items} />
          ))}
        </Reorder.Group>

        <button
          onClick={() => setTodoModal(true)}
          className={cn("btn bg-app-blue/15", todos.length > 0 && "mt-5")}
        >
          {text.addTodo[language]}
        </button>
      </div>
    </section>
  );
}

type TodoItemProps = {
  todo: ITodo;
  items: ITodo[];
};

function TodoItem({ items, todo }: TodoItemProps) {
  const controls = useDragControls();
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
    <Reorder.Item
      key={todo.id}
      value={todo}
      onDragEnd={() => setTodos(items)}
      dragListener={false}
      dragControls={controls}
      className={cn(
        "flex w-fit items-center gap-3 text-lg touch-none select-none",
        todo.isCompleted ? "line-through text-app-gray-200" : ""
      )}
    >
      <button className="z-10" onClick={() => handleChange(todo.id)}>
        {todo.isCompleted ? <TodoCheckedIcon /> : <TodoIcon />}
      </button>

      <span
        onPointerDown={(e) => controls.start(e)}
        className="cursor-grab active:cursor-grabbing"
      >
        {todo.todoBody}
      </span>
    </Reorder.Item>
  );
}
