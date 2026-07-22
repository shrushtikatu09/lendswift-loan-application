import ErrorMessage from "./ErrorMessage";

function Select({
  label,
  id,
  name,
  options = [],
  register,
  error,
  placeholder = "Select an option",
  required = false,
  disabled = false,
}) {
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

      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        disabled={disabled}
        defaultValue=""
        className={`
          w-full rounded-lg border px-4 py-3 text-sm
          bg-white text-slate-800
          transition-all duration-200
          focus:outline-none focus:ring-2
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : "border-slate-300 focus:border-blue-700 focus:ring-blue-200"
          }
          disabled:bg-slate-100
          disabled:text-slate-500
          disabled:cursor-not-allowed
        `}
        {...register(name)}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div id={`${id}-error`}>
        <ErrorMessage message={error} />
      </div>
    </div>
  );
}

export default Select;