function formatValue(value) {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === false
  ) {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return value;
}

function ReviewSection({
  title,
  data,
}) {
  return (
    <div className="border rounded-lg shadow-sm p-5 mb-6 bg-white">

      <h3 className="text-xl font-semibold mb-4 border-b pb-2">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {data.map((item) => (
          <div
            key={item.label}
            className="flex flex-col border rounded p-3"
          >

            <span className="text-gray-500 text-sm">
              {item.label}
            </span>

            <span className="font-medium break-words">
              {formatValue(item.value)}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ReviewSection;