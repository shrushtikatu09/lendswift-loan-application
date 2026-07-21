import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import ErrorMessage from "./ErrorMessage";

const MAX_SIZE = 5 * 1024 * 1024;

function FileUpload({
  label,
  name,
  error,
  setValue,
  watch,
  accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "application/pdf": [".pdf"],
  },
}) {
  const [uploadError, setUploadError] = useState("");

  const file = watch(name);

  const preview = useMemo(() => {
    if (
      file &&
      file.type &&
      file.type.startsWith("image/")
    ) {
      return URL.createObjectURL(file);
    }

    return null;
  }, [file]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setUploadError("");

      if (rejectedFiles.length > 0) {
        const reason = rejectedFiles[0].errors[0];

        if (reason.code === "file-too-large") {
          setUploadError("Maximum file size is 5 MB");
        } else {
          setUploadError(
            "Only JPG, PNG and PDF files are allowed"
          );
        }

        return;
      }

      const selectedFile = acceptedFiles[0];

      if (!selectedFile) return;

      setValue(name, selectedFile, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [name, setValue]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    multiple: false,
    maxSize: MAX_SIZE,
    accept,
    onDrop,
  });

  const removeFile = () => {
    setValue(name, null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setUploadError("");
  };

  return (
    <div className="mb-6">
      <label className="mb-2 block font-semibold">
        {label}
      </label>

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition
        ${
          isDragActive
            ? "border-blue-600 bg-blue-50"
            : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />

        <p className="font-medium">
          Drag & Drop file here
        </p>

        <p className="mt-2 text-sm text-gray-500">
          or Click to Browse
        </p>

        <p className="mt-2 text-xs text-gray-400">
          JPG • PNG • PDF (Max 5 MB)
        </p>
      </div>

      {file && (
        <div className="mt-4 rounded-lg border p-4">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mb-4 h-40 rounded border object-contain"
            />
          ) : (
            <div className="mb-4 rounded bg-gray-100 p-3 text-center text-sm text-gray-600">
              PDF Selected
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {file.name}
              </p>

              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="font-semibold text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {uploadError && (
        <p className="mt-2 text-sm text-red-600">
          {uploadError}
        </p>
      )}

      <ErrorMessage message={error} />
    </div>
  );
}

export default FileUpload;