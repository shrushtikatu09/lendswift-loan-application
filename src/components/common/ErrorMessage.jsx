function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p
      role="alert"
      aria-live="polite"
      className="text-red-600 text-sm mt-1"
    >
      {message}
    </p>
  );
}

export default ErrorMessage;