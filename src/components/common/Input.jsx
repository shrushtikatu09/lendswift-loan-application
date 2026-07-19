import React from "react";

const Input = React.forwardRef(
  (
    {
      label,
      id,
      type = "text",
      error,
      helpText,
      className = "",
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-5">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            {label}
            {required && (
              <span className="ml-1 text-red-600">*</span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${id}-error`
              : helpText
              ? `${id}-help`
              : undefined
          }
          className={`
            w-full rounded-lg border px-4 py-3 text-sm
            text-slate-800
            placeholder:text-slate-400
            transition-all duration-200
            focus:outline-none focus:ring-2
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-700 focus:ring-blue-200"
            }
            disabled:cursor-not-allowed
            disabled:bg-slate-100
            disabled:text-slate-500
            ${className}
          `}
          {...props}
        />

        {helpText && (
          <p
            id={`${id}-help`}
            className="mt-2 text-xs text-slate-500"
          >
            {helpText}
          </p>
        )}

        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            aria-live="polite"
            className="mt-2 text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;