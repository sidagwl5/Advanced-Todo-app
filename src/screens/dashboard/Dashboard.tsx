import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { tw } from "twind";
import { useGlobalContext } from "../../GlobalContext";
import { Button } from "../../ui/atoms/Button";
import { AddTodo } from "./components/AddTodo";
import TodoItem from "./components/TodoItem";

const Dashboard = () => {
  const {
    handleTodos: { todos },
  } = useGlobalContext();
  const [addTodoDialog, setAddTodoDialog] = useState(false);

  return (
    <>
      <h3
        className={tw(
          "text-xl font-medium w-full flex items-center justify-between"
        )}
      >
        Todos
        {todos.length ? (
          <Button
            className="flex items-center gap-2"
            onClick={setAddTodoDialog.bind(this, true)}
          >
            <AddIcon
              className={tw("!text-lg !text-white relative top-[1px]")}
            />
            Create
          </Button>
        ) : null}
      </h3>

      <div className={tw("flex-1 relative")}>
        {todos.length ? (
          todos.map((todo) => <TodoItem {...todo} />)
        ) : (
          <p
            className={tw(
              "absolute top-[50%] flex flex-col items-center gap-3 left-[50%] -translate-x-[50%] -translate-y-[50%]"
            )}
          >
            No todos yet...
            <Button
              className="flex items-center gap-2"
              onClick={setAddTodoDialog.bind(this, true)}
            >
              <AddIcon
                className={tw("!text-lg !text-white relative top-[1px]")}
              />
              Create
            </Button>
          </p>
        )}
      </div>

      {addTodoDialog && <AddTodo close={setAddTodoDialog.bind(this, false)} />}
    </>
  );
};

export default Dashboard;
