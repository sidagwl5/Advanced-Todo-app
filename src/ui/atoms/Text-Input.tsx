import { forwardRef } from "react";
import { tw } from "twind";

export const TextInput = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <section className={tw("flex flex-col gap-2 items-first")}>
      <label
        htmlFor={rest.id}
        className={tw("text-sm text-[#303030] font-medium mr-auto")}
      >
        {label}
      </label>
      <input
        className={tw(
          "flex h-12 w-full border-1 border-[#E0E0E0] bg-transparent px-4"
        )}
        type="text"
        {...rest}
        ref={ref}
      />
      {errorMessage && (
        <p className={tw("text-xs -mt-1 font-semibold text-red-400")}>
          {errorMessage}
        </p>
      )}
    </section>
  );
});
