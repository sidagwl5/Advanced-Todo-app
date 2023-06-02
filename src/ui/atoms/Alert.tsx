import { forwardRef } from "react";
import { css, style, tw } from "twind/style";

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

export const Alert = forwardRef(({ variant, message }, ref) => {
  return (
    <div ref={ref} className={tw(notificationStyles({ variant }))}>
      {message}
    </div>
  );
});
