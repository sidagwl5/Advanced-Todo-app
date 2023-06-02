import CloseIcon from "@mui/icons-material/Close";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { tw } from "twind";
import { ITodo, useGlobalContext } from "../../../GlobalContext";
import { Button } from "../../../ui/atoms/Button";
import { TextInput } from "../../../ui/atoms/Text-Input";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const AddTodo = ({
  close,
  data,
}: {
  close: () => void;
  data?: ITodo;
}) => {
  const {
    handleTodos: { addTodo },
  } = useGlobalContext();
  const { control, handleSubmit } = useForm({
    defaultValues: data ?? {
      name: "",
      description: "",
      id: crypto.randomUUID(),
      subtasks: [],
      done: false,
    },
  });

  const onSubmit: SubmitHandler<ITodo> = (payload) => {
    addTodo(payload);
    close();
  };

  const isLoading = false;

  return (
    <Dialog
      classes={{
        paper: tw(
          "w-full !rounded-lg !max-w-[1200px] h-[80%] !mx-3 !sm:mx-5 !md:mx-8"
        ),
      }}
      open
    >
      <DialogTitle
        className={tw(
          "text-2xl w-full justify-between items-center flex font-medium border-b !px-3 !sm:px-5 md:!px-8"
        )}
      >
        {data ? "Edit" : "Add"} Todo(s)
        <IconButton onClick={close}>
          <CloseIcon className={tw("text-black")} />
        </IconButton>
      </DialogTitle>
      <DialogContent
        className={tw(
          "w-full flex-col bg-white flex text-[#0A0D13] gap-5 !pt-10 !px-3 !sm:px-5 md:!px-8"
        )}
      >
        <Controller
          control={control}
          name={"name"}
          rules={{
            required: { value: true, message: "Name required" },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextInput
              id="name"
              placeholder={"Enter name"}
              label="Name"
              errorMessage={error?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name={"description"}
          render={({ field }) => (
            <div className={tw("h-[220px] flex flex-col gap-2")}>
              <label
                className={tw("text-sm text-[#303030] font-medium mr-auto")}
              >
                Description
              </label>
              <ReactQuill
                className={tw("h-full")}
                modules={modules}
                formats={formats}
                {...field}
              />
            </div>
          )}
        />

        {/* <div className={tw("gap flex flex-col gap-1")}>
          <p className={tw("text-sm font-medium")}>Elements</p>
          {fields.map(({ id }, index) => (
            <div
              key={id}
              className={tw("w-full flex flex-col gap-1 px-2 mb-5")}
            >
              <div className={tw("flex w-full gap-3")}>
                {addIndicatorFields.map(
                  ({ name, placeholder, type, rules, ...rest }, idx) => (
                    <Controller
                      control={control}
                      key={idx}
                      rules={typeof rules === "function" ? rules(index) : rules}
                      name={`elements.${index}.${name}` as any}
                      render={({ field, fieldState: { error } }) => (
                        <TextInput
                          placeholder={placeholder}
                          type={type || "text"}
                          className={tw("max-w-none!")}
                          errorMessage={error?.message}
                          {...field}
                        />
                      )}
                    />
                  )
                )}
                {index === 0 ? (
                  <IconButton
                    className={tw("h-max")}
                    onClick={(e) => {
                      append(moduleBase);
                    }}
                  >
                    <AddIcon className={tw("text-blue-600")} />
                  </IconButton>
                ) : (
                  <IconButton
                    className={tw("h-max")}
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <DeleteIcon className={tw("text-red-600")} />
                  </IconButton>
                )}
              </div>
              <div className={tw("flex items-center")}>
                <label
                  className={tw("text-xs font-medium")}
                  htmlFor={"checkbox"}
                >
                  Required
                </label>
                <Controller
                  control={control}
                  name={`elements.${index}.required` as any}
                  render={({ field, fieldState: { error } }) => (
                    <Checkbox
                      size="small"
                      id={"checkbox"}
                      checked={field.value}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          ))}
        </div> */}
      </DialogContent>
      <DialogTitle
        className={tw(
          "w-full justify-end items-center flex font-medium border-t !px-3 !sm:px-5 md:!px-8"
        )}
      >
        <Button onClick={handleSubmit(onSubmit)}>
          {isLoading ? (
            <CircularProgress size={20} className={tw("text-white")} />
          ) : data ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </DialogTitle>
    </Dialog>
  );
};
