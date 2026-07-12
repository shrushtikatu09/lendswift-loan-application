import ErrorMessage from "./ErrorMessage";

function FileUpload({
  label,
  id,
  register,
  name,
  error,
  accept = ".jpg,.jpeg,.png,.pdf",
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 font-medium"
      >
        {label}
      </label>

      <input
        id={id}
        type="file"
        accept={accept}
        {...register(name)}
      />

      <small className="block mt-1 text-gray-500">
        Allowed: JPG, PNG, PDF (Max 5 MB)
      </small>

      <ErrorMessage message={error} />
    </div>
  );
}

export default FileUpload;