import { useSnackbar } from "notistack";
import { HTMLAttributes, forwardRef } from "react";
import { css, style, tw } from "twind/style";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const notificationStyles = style({
  base: tw(
    "max-w-[350px] w-full h-12 font-nunitoSans text-sm text-white py-2 px-4 rounded-lg flex gap-3 items-center"
  ),
  variants: {
    variant: {
      success: css({
        background: "linear-gradient(90deg, #359C11 14.62%, #39E736 119.74%)",
      }),
      info: css({
        background: "linear-gradient(90deg, #1E38C1 14.62%, #48A6FC 119.74%)",
      }),
      error: css({
        background: "linear-gradient(90deg, #C51919 14.62%, #F02995 119.74%)",
      }),
      warning: css({
        background: "linear-gradient(90deg, #C27F1B 14.62%, #ECC436 119.74%)",
      }),
    },
  },
});

interface IAlertProps extends HTMLAttributes<HTMLDivElement> {
  variant: "success" | "info" | "error" | "warning";
  message: string;
}

export const Alert = forwardRef<HTMLDivElement, IAlertProps>(
  ({ variant, message, id }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const clickHandler = () => {
      closeSnackbar(id);
    };

    return (
      <div ref={ref} className={tw(notificationStyles({ variant }))}>
        {message}

        <IconButton onClick={clickHandler}>
          <CloseIcon className={tw("text-white text-xl!")} />
        </IconButton>
      </div>
    );
  }
);
