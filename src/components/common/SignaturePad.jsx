import { useEffect, useRef, useState } from "react";

function SignaturePad({
  value,
  onChange,
  error,
}) {
  const canvasRef = useRef(null);

  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
  }, []);

  const getPosition = (event) => {
    const canvas = canvasRef.current;

    const rect = canvas.getBoundingClientRect();

    if (event.touches) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    }

    return {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };
  };

  const startDrawing = (event) => {
    const ctx = canvasRef.current.getContext("2d");

    const pos = getPosition(event);

    ctx.beginPath();

    ctx.moveTo(pos.x, pos.y);

    setDrawing(true);
  };

  const draw = (event) => {
    if (!drawing) return;

    event.preventDefault();

    const ctx = canvasRef.current.getContext("2d");

    const pos = getPosition(event);

    ctx.lineTo(pos.x, pos.y);

    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!drawing) return;

    setDrawing(false);

    const image = canvasRef.current.toDataURL("image/png");

    onChange(image);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    onChange("");
  };

  return (
    <div className="mb-6">

      <label className="block mb-2 font-semibold">
        E-Signature
      </label>

      <canvas
        ref={canvasRef}
        width={500}
        height={180}
        className="border rounded-lg bg-white touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      <div className="mt-3">

        <button
          type="button"
          onClick={clearSignature}
          className="rounded bg-red-500 px-4 py-2 text-white"
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
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}

    </div>
  );
}

export default SignaturePad;