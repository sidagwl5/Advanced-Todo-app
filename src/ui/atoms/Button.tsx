import { tw } from "twind";
import { ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={tw(
        "px-6 py-2 rounded-md bg-blue-500 text-white max-w-max text-base",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
