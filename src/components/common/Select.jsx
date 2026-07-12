import ErrorMessage from "./ErrorMessage";

function Select({
  label,
  id,
  name,
  options = [],
  register,
  error,
  placeholder = "Select an option",
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 font-medium"
      >
        {label}
      </label>

      <select
        id={id}
        className="border rounded px-3 py-2 w-full"
        defaultValue=""
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

      <ErrorMessage message={error} />
    </div>
  );
}

export default Select;