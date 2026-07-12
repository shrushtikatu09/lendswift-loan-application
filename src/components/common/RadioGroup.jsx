import ErrorMessage from "./ErrorMessage";

function RadioGroup({
  label,
  name,
  options = [],
  register,
  error,
}) {
  return (
    <div className="mb-4">
      <fieldset>
        <legend className="block mb-2 font-medium">
          {label}
        </legend>

        <div className="flex gap-4 flex-wrap">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                value={option.value}
                {...register(name)}
              />

              <span>{option.label}</span>
            </label>
          ))}
        </div>

        <ErrorMessage message={error} />
      </fieldset>
    </div>
  );
}

export default RadioGroup;