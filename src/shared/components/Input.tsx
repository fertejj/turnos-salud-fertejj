import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { MdErrorOutline } from "react-icons/md";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  errorMessage?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ hasError = false, errorMessage, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="relative">
          <input
            ref={ref}
            aria-invalid={hasError}
            className={clsx(
              "w-full bg-surface text-text-main placeholder-text-soft border p-2 pr-10 rounded focus:outline-none focus:ring-2 transition-all",
              hasError
                ? "border-red-500 focus:ring-red-300"
                : "border-border-base focus:ring-primary-light",
              className
            )}
            {...props}
          />
          {hasError && (
            <MdErrorOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-lg pointer-events-none" />
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
