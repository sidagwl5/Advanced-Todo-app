import { enqueueSnackbar } from "notistack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { tw } from "twind";
import { useGlobalContext } from "../../GlobalContext";
import { axiosInstance } from "../../configs/axios.config";
import { Button } from "../../ui/atoms/Button";
import { TextInput } from "../../ui/atoms/Text-Input";
import { useEffect } from "react";

const Login = () => {
  const {
    handleUser: [_, setUser],
  } = useGlobalContext();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: { password: "", username: "" },
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const onLogin: SubmitHandler<{
    password: string;
    username: string;
  }> = async (data) => {
    try {
      const {
        data: { user, token },
      } = await axiosInstance.post("/user/dummy-login", data);

      localStorage.setItem("token", token);
      setUser(user);

      enqueueSnackbar({
        variant: "success",
        message: "Login successful",
      });

      navigate("/");
    } catch (error: any) {
      enqueueSnackbar({
        variant: "error",
        message:
          error.response?.data?.message ??
          error.message ??
          "Something went wrong!",
      });
    }
  };

  return (
    <section className={tw("w-full h-screen p-5 gap-10 flex justify-center")}>
      <div className={tw("flex-1 min-w-[300px] hidden md:block")}>
        <img
          src="/images/left.png"
          className={tw("w-full h-full object-contain")}
        />
      </div>
      <form
        onSubmit={handleSubmit(onLogin)}
        className={tw(
          "w-full max-w-[450px] md:mr-[8%] flex flex-col justify-center gap-4"
        )}
      >
        <h1 className={tw("text-4xl font-semibold mb-3")}>Login</h1>
        <Controller
          name="username"
          control={control}
          rules={{
            required: { message: "Required", value: true },
          }}
          render={({
            fieldState: { error },
            field: { ref, value, onChange },
          }) => (
            <TextInput
              label="User Name*"
              type="username"
              id="username"
              onChange={onChange}
              placeholder="sid_agwl"
              errorMessage={error?.message}
              ref={ref}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: { message: "Required", value: true },
          }}
          render={({
            fieldState: { error },
            field: { ref, value, onChange },
          }) => (
            <TextInput
              label="Password*"
              type="password"
              id="password"
              onChange={onChange}
              placeholder="*****"
              errorMessage={error?.message}
              ref={ref}
              value={value}
            />
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </section>
  );
};

export default Login;
