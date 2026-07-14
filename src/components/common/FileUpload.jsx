import { useCallback, useState } from "react";
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

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setUploadError("");

      if (rejectedFiles.length > 0) {
        const reason = rejectedFiles[0].errors[0];

        if (reason.code === "file-too-large") {
          setUploadError("Maximum file size is 5 MB");
        } else {
          setUploadError("Only JPG, PNG and PDF files are allowed");
        }

        return;
      }

      const selectedFile = acceptedFiles[0];

      if (!selectedFile) return;

      setValue(name, selectedFile, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [name, setValue]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      multiple: false,
      maxSize: MAX_SIZE,
      accept,
      onDrop,
    });

  const removeFile = () => {
    setValue(name, null, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setUploadError("");
  };

  return (
    <div className="mb-6">

      <label className="block mb-2 font-semibold">
        {label}
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition

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

        <p className="text-sm text-gray-500 mt-2">
          or Click to Browse
        </p>

        <p className="text-xs mt-2 text-gray-400">
          JPG • PNG • PDF (Max 5 MB)
        </p>
      </div>

      {file && (
        <div className="mt-4 border rounded-lg p-3 flex justify-between items-center">

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
            className="text-red-600 font-semibold"
          >
            Remove
          </button>

        </div>
      )}

      {uploadError && (
        <p className="text-red-600 text-sm mt-2">
          {uploadError}
        </p>
      )}

      <ErrorMessage message={error} />

    </div>
  );
}

export default FileUpload;