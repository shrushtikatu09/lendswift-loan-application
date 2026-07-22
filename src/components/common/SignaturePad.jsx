import {
  useEffect,
  useRef,
  useState,
} from "react";

function SignaturePad({
  value,
  onChange,
  error,
}) {
  const canvasRef =
    useRef(null);

  const [drawing, setDrawing] =
    useState(false);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000";
  }, []);

  useEffect(() => {
    if (!value) return;

    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    const image =
      new Image();

    image.onload = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };

    image.src = value;
  }, [value]);

  const getPosition = (
    event
  ) => {
    const canvas =
      canvasRef.current;

    const rect =
      canvas.getBoundingClientRect();

    if (event.touches) {
      return {
        x:
          event.touches[0]
            .clientX -
          rect.left,
        y:
          event.touches[0]
            .clientY -
          rect.top,
      };
    }

    return {
      x:
        event.nativeEvent
          .offsetX,
      y:
        event.nativeEvent
          .offsetY,
    };
  };

  const startDrawing = (
    event
  ) => {
    event.preventDefault();

    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    const pos =
      getPosition(event);

    ctx.beginPath();

    ctx.moveTo(
      pos.x,
      pos.y
    );

    setDrawing(true);
  };

  const draw = (event) => {
    if (!drawing) {
      return;
    }

    event.preventDefault();

    const ctx =
      canvasRef.current.getContext(
        "2d"
      );

    const pos =
      getPosition(event);

    ctx.lineTo(
      pos.x,
      pos.y
    );

    ctx.stroke();
      };

  const stopDrawing = () => {
    if (!drawing) {
      return;
    }

    setDrawing(false);

    const canvas =
      canvasRef.current;

    const image =
      canvas.toDataURL(
        "image/png"
      );

    onChange(image);
  };

  const clearSignature = () => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    onChange("");
  };

  return (
    <div className="mb-6">
      <canvas
        ref={canvasRef}
        width={500}
        height={180}
        className="w-full rounded-lg border bg-white touch-none"
        onMouseDown={
          startDrawing
        }
        onMouseMove={draw}
        onMouseUp={
          stopDrawing
        }
        onMouseLeave={
          stopDrawing
        }
        onTouchStart={
          startDrawing
        }
        onTouchMove={draw}
        onTouchEnd={
          stopDrawing
        }
      />

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={
            clearSignature
          }
          className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Clear Signature
        </button>
      </div>

      {value && (
        <div className="mt-4">
          <p className="mb-2 font-medium">
            Signature Preview
          </p>

          <img
            src={value}
            alt="Signature Preview"
            className="w-72 rounded border"
          />
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="mt-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default SignaturePad;