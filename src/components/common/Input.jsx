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
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-4">
        {label && (
          <label
            htmlFor={id}
            className="block mb-1 font-medium"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          className={`border rounded px-3 py-2 w-full ${className}`}
          {...props}
        />

        {helpText && (
          <small className="text-gray-500 block mt-1">
            {helpText}
          </small>
        )}

        {error && (
          <p
            role="alert"
            aria-live="polite"
            className="text-red-600 text-sm mt-1"
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