import { enqueueSnackbar } from "notistack";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export interface ITodo {
  name: string;
  description?: string;
  id: string;
  subtasks: { name: string; done: boolean; id: string }[];
  done: boolean;
}

const context = createContext(
  {} as {
    handleTodos: {
      addTodo: (value: ITodo) => void;
      deleteTodo: (id: string) => void;
      completeTodo: (id: string) => void;
      incompleteTodo: (id: string) => void;
      updateTodo: (id: string, value: Partial<ITodo>) => void;
      todos: ITodo[];
    };
    handleUser: [Record<string, string> | null, Dispatch<SetStateAction<null>>];
  }
);

export const useGlobalContext = () => useContext(context);

export const GlobalContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState<ITodo[]>(
    JSON.parse(localStorage.getItem("todos") ?? "null") ?? [
      {
        name: "Is This website good? 😁",
        description: "All the necessary tasks are done and implemented",
        id: crypto.randomUUID(),
        done: true,
        subtasks: [
          {
            name: "Login functionality Implemented",
            done: true,
            id: crypto.randomUUID(),
          },
          {
            name: "Logout functionality Implemented",
            done: true,
            id: crypto.randomUUID(),
          },
          { name: "UI/UX Implemented", done: true, id: crypto.randomUUID() },
          {
            name: "Task and Subtask CRUD Implemented",
            done: true,
            id: crypto.randomUUID(),
          },
          {
            name: "Form validations Implemented",
            done: true,
            id: crypto.randomUUID(),
          },
          {
            name: "JWT Auth implemented using NestJS",
            done: true,
            id: crypto.randomUUID(),
          },
        ],
      },
      {
        name: "Bucket List 🥰",
        description: "Things to do before dying",
        id: crypto.randomUUID(),
        done: false,
        subtasks: [],
      },
    ]
  );

  const addTodo = (value: ITodo) => {
    setTodos((prev) => prev.concat(value));
    enqueueSnackbar({
      variant: "success",
      message: "Todo added successfully",
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    enqueueSnackbar({
      variant: "success",
      message: "Todo deleted successfully",
    });
  };

  const completeTodo = (id: string) => {
    setTodos((prev) => {
      const index = prev.findIndex((todo) => todo.id === id);
      const newArray = [...prev];

      newArray.splice(index, 1, {
        ...prev[index],
        done: true,
        subtasks: prev[index].subtasks.map((subtask) => ({
          ...subtask,
          done: true,
        })),
      });
      return newArray;
    });

    enqueueSnackbar({
      variant: "success",
      message: "Todo marked check!",
    });
  };

  const incompleteTodo = (id: string) => {
    setTodos((prev) => {
      const index = prev.findIndex((todo) => todo.id === id);
      const newArray = [...prev];

      newArray.splice(index, 1, {
        ...prev[index],
        done: false,
        subtasks: prev[index].subtasks.map((subtask) => ({
          ...subtask,
          done: false,
        })),
      });
      return newArray;
    });

    enqueueSnackbar({
      variant: "success",
      message: "Todo marked unchecked",
    });
  };

  const updateTodo = (id: string, value: Partial<ITodo>) => {
    setTodos((prev) => {
      const index = prev.findIndex((todo) => todo.id === id);
      const newArray = [...prev];

      newArray.splice(index, 1, {
        ...prev[index],
        ...value,
        done: (value.subtasks ?? []).every((subtask) => subtask.done),
      });
      return newArray;
    });

    enqueueSnackbar({
      variant: "success",
      message: "Todo updated successfully",
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <context.Provider
      value={{
        handleUser: [user, setUser],
        handleTodos: {
          addTodo,
          todos,
          updateTodo,
          deleteTodo,
          incompleteTodo,
          completeTodo,
        },
      }}
    >
      {children}
    </context.Provider>
  );
};
