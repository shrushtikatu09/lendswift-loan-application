import { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import ErrorMessage from "./ErrorMessage";
import { compressImage } from "../../utils/imageCompression";

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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] =
    useState("Pending");
  const [sizeInfo, setSizeInfo] = useState(null);

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

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const simulateUpload = () => {
    setUploadProgress(0);
    setUploadStatus("Uploading");

    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;

      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        setUploadStatus("Uploaded");
      }
    }, 120);
  };

  const onDrop = useCallback(
    async (acceptedFiles, rejectedFiles) => {
      setUploadError("");

      if (rejectedFiles.length > 0) {
        const reason =
          rejectedFiles[0].errors[0];

        if (
          reason.code === "file-too-large"
        ) {
          setUploadError(
            "Maximum file size is 5 MB"
          );
        } else {
          setUploadError(
            "Only JPG, PNG and PDF files are allowed"
          );
        }

        return;
      }

      const selectedFile =
        acceptedFiles[0];

      if (!selectedFile) return;

      let finalFile = selectedFile;

      let originalSize =
        selectedFile.size;

      let compressedSize =
        selectedFile.size;

      if (
        selectedFile.type.startsWith(
          "image/"
        )
      ) {
        const compressed =
          await compressImage(
            selectedFile
          );

        finalFile = compressed.file;

        originalSize =
          compressed.originalSize;

        compressedSize =
          compressed.compressedSize;
      }

      setSizeInfo({
        originalSize,
        compressedSize,
      });

      simulateUpload();

      setValue(name, finalFile, {
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

    setUploadProgress(0);

    setUploadStatus("Pending");

    setSizeInfo(null);
  };

  return (
    <div className="mb-6">
      <label className="mb-2 block font-semibold">
        {label}
      </label>

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition ${
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
            <div className="mb-4 rounded bg-gray-100 p-3 text-center">
              <div className="text-4xl">📄</div>

              <p className="mt-2 text-sm text-gray-600">
                PDF Document
              </p>
            </div>
          )}

          <div className="space-y-2">
            <p className="font-medium break-all">
              {file.name}
            </p>

            <p className="text-sm text-gray-500">
              Current Size :{" "}
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            {sizeInfo && (
              <>
                <p className="text-sm text-gray-500">
                  Original Size :{" "}
                  {(
                    sizeInfo.originalSize /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </p>

                <p className="text-sm text-green-600 font-medium">
                  Compressed Size :{" "}
                  {(
                    sizeInfo.compressedSize /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </p>
              </>
            )}

            <div className="mt-3">
              <div className="flex items-center justify-between text-sm">
                <span>
                  Status :
                  <span
                    className={`ml-2 font-semibold ${
                      uploadStatus === "Uploaded"
                        ? "text-green-600"
                        : uploadStatus === "Uploading"
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {uploadStatus}
                  </span>
                </span>

                <span>{uploadProgress}%</span>
              </div>

              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-200"
                  style={{
                    width: `${uploadProgress}%`,
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="mt-4 font-semibold text-red-600 hover:text-red-700"
            >
              Remove File
            </button>
          </div>
        </div>
      )}

      {uploadError && (
        <p
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {uploadError}
        </p>
      )}

      <ErrorMessage message={error} />
    </div>
  );
}

export default FileUpload;