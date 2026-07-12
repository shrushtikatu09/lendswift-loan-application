function Checkbox({
  id,
  label,
  register,
  name,
  error,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="flex items-center gap-2">
        <input
          id={id}
          type="checkbox"
          {...register(name)}
        />
        {label}
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