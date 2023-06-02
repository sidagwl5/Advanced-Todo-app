import { tw } from "twind";
import { Button } from "../../ui/atoms/Button";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { AddTodo } from "./components/AddTodo";

const Dashboard = () => {
  const [addTodoDialog, setAddTodoDialog] = useState(false);

  return (
    <>
      <div className={tw("flex-1")}>
        <h3
          className={tw(
            "text-xl font-medium w-full flex items-center justify-between"
          )}
        >
          Todos
          <Button
            className="flex items-center gap-2"
            onClick={setAddTodoDialog.bind(this, true)}
          >
            <AddIcon
              className={tw("!text-lg !text-white relative top-[1px]")}
            />
            Create
          </Button>
        </h3>
      </div>
      {addTodoDialog && <AddTodo close={setAddTodoDialog.bind(this, false)} />}
    </>
  );
};

export default Dashboard;
