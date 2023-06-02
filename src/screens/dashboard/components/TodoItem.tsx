import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { css, tw } from "twind/style";
import { ITodo, useGlobalContext } from "../../../GlobalContext";
import { TextInput } from "../../../ui/atoms/Text-Input";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { AddTodo } from "./AddTodo";

const TodoItem = ({ name, id, subtasks, description, done }: ITodo) => {
  const addNewSubTaskRef = useRef<HTMLInputElement>(null);
  const [editTodoDialog, setEditTodoDialog] = useState(false);

  const {
    handleTodos: { updateTodo, deleteTodo, completeTodo, incompleteTodo },
  } = useGlobalContext();
  const { control, getValues, setValue } = useForm({
    defaultValues: {
      subtasks: subtasks ?? [],
    },
  });

  useEffect(() => {
    setValue("subtasks", subtasks ?? []);
  }, [subtasks, setValue]);

  const { fields } = useFieldArray({
    control,
    name: "subtasks",
    keyName: "subtaskId",
  });

  return (
    <>
      <Accordion classes={{ root: tw("shadow-none!") }}>
        <AccordionSummary
          classes={{
            content: tw("items-center flex text-lg"),
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Tooltip
            disableInteractive
            arrow
            placement="top"
            title={done ? "Uncheck task" : "Check task"}
          >
            <IconButton
              className={tw("mr-3!")}
              onClick={(e) => {
                e.stopPropagation();
                if (done) incompleteTodo(id);
                else completeTodo(id);
              }}
              size="small"
            >
              {done ? (
                <CheckCircleIcon className={tw("text-xl! text-green-600!")} />
              ) : (
                <CheckCircleOutlineIcon
                  className={tw("text-xl! text-gray-500!")}
                />
              )}
            </IconButton>
          </Tooltip>
          {name}

          <div className={tw("flex items-center text-sm text-gray-400 ml-5")}>
            {fields.length}
            <IconButton
              className={tw("scale-[0.67] relative top-[1px] -left-[2px]")}
              size="small"
            >
              <AccountTreeIcon className={tw("text-xl! text-gray-400!")} />
            </IconButton>
          </div>
          <AccordionActions className={tw("ml-auto")}>
            <IconButton onClick={() => setEditTodoDialog(true)} size="small">
              <EditIcon className={tw("text-xl! text-gray-500!")} />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteTodo(id);
              }}
              size="small"
            >
              <DeleteIcon className={tw("text-xl! text-red-500!")} />
            </IconButton>
          </AccordionActions>
        </AccordionSummary>
        <AccordionDetails>
          {fields.map(({ id: todoId, done }, index) => (
            <Controller
              control={control}
              key={todoId}
              name={`subtasks.${index}.name`}
              render={({
                field: { onBlur, ...rest },
                fieldState: { error },
              }) => {
                return (
                  <div
                    className={tw("gap-1 mb-1 items-center w-full flex group")}
                  >
                    <Tooltip
                      disableInteractive
                      arrow
                      placement="top"
                      title={done ? "Uncheck sub-task" : "Check sub-task"}
                    >
                      <IconButton
                        onClick={() => {
                          const index = getValues("subtasks").findIndex(
                            (todo) => todo.id === todoId
                          );
                          const newArray = [...getValues("subtasks")];

                          newArray.splice(index, 1, {
                            ...getValues("subtasks")[index],
                            done: !done,
                          });

                          updateTodo(id, {
                            subtasks: newArray,
                          });
                        }}
                        size="small"
                      >
                        {done ? (
                          <CheckCircleIcon
                            className={tw("text-xl! text-green-600!")}
                          />
                        ) : (
                          <CheckCircleOutlineIcon
                            className={tw("text-xl! text-gray-500!")}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                    <TextInput
                      onBlur={() => {
                        console.log("looks cool");
                        updateTodo(id, { subtasks: getValues("subtasks") });
                        onBlur();
                      }}
                      onKeyDown={(e) => {
                        if (e.code === "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                      placeholder={"Enter subtask name"}
                      type="text"
                      className={tw(
                        "w-full hover:outline",
                        css({
                          "&": {
                            "& input": {
                              "@apply":
                                "border-transparent! hover:border-gray-200! h-10! text-sm! text-gray-500! px-2! focus:outline-none! focus-visible:outline-none!",
                            },
                          },
                        })
                      )}
                      errorMessage={error?.message}
                      {...rest}
                    />
                    <IconButton
                      onClick={() => {
                        updateTodo(id, {
                          subtasks: getValues("subtasks").filter(
                            (subtask) => subtask.id !== todoId
                          ),
                        });
                      }}
                      size="small"
                      className={tw("hidden! group-hover:block!")}
                    >
                      <DeleteIcon className={tw("text-xl! text-red-500!")} />
                    </IconButton>
                  </div>
                );
              }}
            />
          ))}

          <TextInput
            ref={addNewSubTaskRef}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                e.currentTarget.blur();
              }
            }}
            onBlur={(e) => {
              console.log("here", e);
              if (e.target.value)
                updateTodo(id, {
                  subtasks: getValues("subtasks").concat({
                    name: e.target.value,
                    id: crypto.randomUUID(),
                    done: false,
                  }),
                });

              e.target.value = "";
            }}
            placeholder={"Enter subtask name"}
            type="text"
            className={tw(
              "w-full",
              css({
                "&": {
                  "& input": {
                    "@apply":
                      "border-transparent! hover:border-gray-200! text-sm! text-gray-500! h-10! px-2! focus:outline-none! focus-visible: outline-none!",
                  },
                },
              })
            )}
          />
        </AccordionDetails>
      </Accordion>
      {editTodoDialog && (
        <AddTodo
          data={{ name, description, id, subtasks, done }}
          close={setEditTodoDialog.bind(this, false)}
        />
      )}
    </>
  );
};

export default TodoItem;
