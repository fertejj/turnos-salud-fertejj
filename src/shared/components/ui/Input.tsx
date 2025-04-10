import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { MdErrorOutline } from "react-icons/md";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  label?: string;
  className?: string;
  errorMessage?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ hasError = false, errorMessage, className, label, ...props }, ref) => {
    return (
      <div className={clsx("flex flex-col gap-1", className)}>
        {label && (
          <label className="text-sm font-medium text-text mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            aria-invalid={hasError}
            className={clsx(
              "w-full rounded-2xl px-4 py-2.5 bg-white text-sm text-text placeholder-text-soft",
              "transition-all duration-200 shadow-md focus:outline-none focus:ring-2",
              hasError
                ? "ring-2 ring-red-400 pr-10"
                : "focus:ring-primary/40 focus:border-primary"
            )}
            {...props}
          />
          {hasError && (
            <MdErrorOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xl" />
          )}
        </div>

        {hasError && errorMessage && (
          <span className="text-sm text-red-500">{errorMessage}</span>
        )}
      </div>
    );
  }
);



export default Input;
