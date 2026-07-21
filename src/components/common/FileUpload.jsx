import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
  const [uploadError, setUploadError] =
    useState("");

  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [uploadStatus, setUploadStatus] =
    useState("Pending");

  const [sizeInfo, setSizeInfo] =
    useState(null);

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

  useEffect(() => {
    if (!file) {
      setUploadStatus("Pending");
      setUploadProgress(0);
      return;
    }

    setUploadStatus("Uploaded");
    setUploadProgress(100);
  }, [file]);

  const simulateUpload = () => {
    setUploadStatus("Uploading");
    setUploadProgress(0);

    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;

      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        setUploadStatus("Uploaded");
      }
    }, 100);
  };

  const onDrop = useCallback(
    async (
      acceptedFiles,
      rejectedFiles
    ) => {
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
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [name, setValue]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept,
    maxSize: MAX_SIZE,
  });

  const removeFile = () => {
    setValue(name, null, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setUploadError("");

    setUploadStatus("Pending");

    setUploadProgress(0);

    setSizeInfo(null);
  };

  return (
    <div className="mb-6">
      <label className="mb-2 block font-semibold">
        {label}
      </label>

      {!file && (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
            isDragActive
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />

          <div className="text-4xl">
            📤
          </div>

          <p className="mt-3 font-semibold">
            Click or Drag & Drop
          </p>

          <p className="mt-1 text-sm text-gray-500">
            JPG • PNG • PDF
          </p>

          <p className="text-xs text-gray-400">
            Max Size 5 MB
          </p>
        </div>
      )}
            {file && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 rounded-lg border object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border bg-slate-100 text-4xl">
                📄
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="max-w-[260px] truncate font-semibold">
                  {file.name}
                </h4>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  ✓ Uploaded
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Size :
                {" "}
                {file?.size
                  ? (file.size / 1024 / 1024).toFixed(2)
                  : "0.00"}{" "}
                MB
              </p>

              {sizeInfo && (
                <p className="text-xs text-slate-400">
                  Compressed from{" "}
                  {sizeInfo.originalSize
                    ? (
                        sizeInfo.originalSize /
                        1024 /
                        1024
                      ).toFixed(2)
                    : "0.00"}{" "}
                  MB
                </p>
              )}

              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>{uploadStatus}</span>

                  <span>{uploadProgress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                className="mt-4 rounded-md border border-red-200 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Remove File
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadError && (
        <p
          role="alert"
          className="mt-2 text-sm text-red-600"
        >
          {uploadError}
        </p>
      )}

      <ErrorMessage message={error} />
    </div>
  );
}

export default FileUpload;