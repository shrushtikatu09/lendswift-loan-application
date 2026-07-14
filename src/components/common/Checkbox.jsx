function Checkbox({
  id,
  label,
  register,
  name,
  error,
  disabled = false,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="flex items-start gap-2 cursor-pointer"
      >
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          {...register(name)}
        />

        <span>{label}</span>
      </label>

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

export default Checkbox;