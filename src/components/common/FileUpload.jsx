import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useDropzone } from "react-dropzone";

import ErrorMessage from "./ErrorMessage";
import { compressImage } from "../../utils/imageCompression";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const MAX_FILES = 1;

const STATUS = {
  PENDING: "Pending",
  UPLOADING: "Uploading",
  UPLOADED: "Uploaded",
};

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
  const file = watch(name);

  const [uploadError, setUploadError] =
    useState("");

  const [uploadStatus, setUploadStatus] =
    useState(STATUS.PENDING);

  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [sizeInfo, setSizeInfo] =
    useState(null);

  const uploadInterval =
    useRef(null);

  const previewUrl =
    useRef(null);

  const clearPreview = useCallback(() => {
    if (previewUrl.current) {
      URL.revokeObjectURL(
        previewUrl.current
      );

      previewUrl.current = null;
    }
  }, []);

  const preview = useMemo(() => {
    clearPreview();

    if (
      !file ||
      !(file instanceof File) ||
      !file.type?.startsWith("image/")
    ) {
      return null;
    }

    previewUrl.current =
      URL.createObjectURL(file);

    return previewUrl.current;
  }, [file, clearPreview]);

  useEffect(() => {
    return () => {
      clearPreview();

      if (uploadInterval.current) {
        clearInterval(
          uploadInterval.current
        );
      }
    };
  }, [clearPreview]);

  useEffect(() => {
    if (!file) {
      setUploadStatus(
        STATUS.PENDING
      );

      setUploadProgress(0);

      setSizeInfo(null);

      return;
    }

    setUploadStatus(
      STATUS.UPLOADED
    );

    setUploadProgress(100);
  }, [file]);

  const stopUpload = () => {
    if (uploadInterval.current) {
      clearInterval(
        uploadInterval.current
      );

      uploadInterval.current =
        null;
    }
  };

  const simulateUpload = () => {
    stopUpload();

    setUploadStatus(
      STATUS.UPLOADING
    );

    setUploadProgress(0);

    let progress = 0;

    uploadInterval.current =
      setInterval(() => {
        progress += 10;

        if (progress >= 100) {
          progress = 100;

          stopUpload();

          setUploadStatus(
            STATUS.UPLOADED
          );
        }

        setUploadProgress(progress);
      }, 100);
  };

  const validateImageSize =
    (selectedFile) => {
      if (
        selectedFile.type.startsWith(
          "image/"
        ) &&
        selectedFile.size >
          MAX_FILE_SIZE
      ) {
        return "Image exceeds maximum size of 5 MB.";
      }

      return null;
    };

  const processImage =
    async (selectedFile) => {
      const compressed =
        await compressImage(
          selectedFile
        );

      return {
        file: compressed.file,
        originalSize:
          compressed.originalSize,
        compressedSize:
          compressed.compressedSize,
      };
    };
      const onDrop = useCallback(
    async (
      acceptedFiles,
      rejectedFiles
    ) => {
      setUploadError("");

      stopUpload();

      if (
        rejectedFiles.length > 0
      ) {
        const reason =
          rejectedFiles[0]?.errors?.[0];

        switch (reason?.code) {
          case "file-too-large":
            setUploadError(
              "Maximum allowed file size is 5 MB."
            );
            break;

          case "file-invalid-type":
            setUploadError(
              "Only JPG, PNG and PDF files are supported."
            );
            break;

          case "too-many-files":
            setUploadError(
              "Only one file can be uploaded."
            );
            break;

          default:
            setUploadError(
              "Unable to upload this file."
            );
        }

        return;
      }

      const selectedFile =
        acceptedFiles?.[0];

      if (!selectedFile) {
        return;
      }

      const validationError =
        validateImageSize(
          selectedFile
        );

      if (validationError) {
        setUploadError(
          validationError
        );
        return;
      }

      try {
        let finalFile =
          selectedFile;

        let originalSize =
          selectedFile.size;

        let compressedSize =
          selectedFile.size;

        if (
          selectedFile.type.startsWith(
            "image/"
          )
        ) {
          const processed =
            await processImage(
              selectedFile
            );

          finalFile =
            processed.file;

          originalSize =
            processed.originalSize;

          compressedSize =
            processed.compressedSize;

          if (
            compressedSize >
            MAX_IMAGE_SIZE
          ) {
            console.warn(
              "Compressed image is still larger than recommended size."
            );
          }
        }

        setSizeInfo({
          originalSize,
          compressedSize,
        });

        setValue(
          name,
          finalFile,
          {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          }
        );

        simulateUpload();
      } catch (err) {
        console.error(err);

        setUploadError(
          "Something went wrong while processing the selected file."
        );

        setUploadStatus(
          STATUS.PENDING
        );

        setUploadProgress(0);
      }
    },
    [name, setValue]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
  });

  const removeFile = () => {
    stopUpload();

    clearPreview();

    setValue(name, null, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setUploadError("");

    setUploadStatus(
      STATUS.PENDING
    );

    setUploadProgress(0);

    setSizeInfo(null);
  };

  const displaySize =
    (
      sizeInfo?.compressedSize ??
      file?.size ??
      0
    ) /
    1024 /
    1024;

  const originalSize =
    (
      sizeInfo?.originalSize ??
      0
    ) /
    1024 /
    1024;

  const isCompressed =
    sizeInfo &&
    sizeInfo.originalSize >
      sizeInfo.compressedSize;
        return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="mb-2 block font-semibold text-slate-800"
      >
        {label}
      </label>

      {!file && (
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
            isDragActive
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-500 hover:bg-gray-50"
          }`}
        >
          <input
            id={name}
            {...getInputProps()}
            aria-label={label}
          />

          <div className="text-5xl">
            📤
          </div>

          <p className="mt-3 font-semibold text-slate-700">
            Click or Drag & Drop
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Supported Files:
            JPG • PNG • PDF
          </p>

          <p className="text-xs text-slate-400">
            Maximum Size: 5 MB
          </p>
        </div>
      )}

      {file && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-start gap-4">
            {preview ? (
              <img
                src={preview}
                alt="Document Preview"
                className="h-24 w-24 rounded-lg border object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border bg-slate-100 text-4xl">
                📄
              </div>
            )}

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="max-w-xs truncate font-semibold">
                  {file.name}
                </h4>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    uploadStatus ===
                    STATUS.UPLOADED
                      ? "bg-green-100 text-green-700"
                      : uploadStatus ===
                        STATUS.UPLOADING
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {uploadStatus ===
                  STATUS.UPLOADED
                    ? "✓ Uploaded"
                    : uploadStatus ===
                      STATUS.UPLOADING
                    ? "Uploading..."
                    : "Pending"}
                </span>
              </div>

              <div className="mt-3 space-y-1 text-sm text-slate-500">
                <p>
                  Current Size :{" "}
                  {displaySize.toFixed(2)} MB
                </p>

                {isCompressed && (
                  <p className="text-xs text-slate-400">
                    Original Size :{" "}
                    {originalSize.toFixed(2)} MB
                  </p>
                )}
              </div>

              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>
                    {uploadStatus}
                  </span>

                  <span>
                    {uploadProgress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        uploadProgress,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={removeFile}
                disabled={
                  uploadStatus ===
                  STATUS.UPLOADING
                }
                className="mt-4 rounded-md border border-red-200 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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
          aria-live="polite"
          className="mt-2 text-sm text-red-600"
        >
          {uploadError}
        </p>
      )}

      <ErrorMessage
        message={error}
      />
    </div>
  );
}

export default FileUpload;