export async function compressImage(file) {
  if (!file.type.startsWith("image/")) {
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
    };
  }

  const originalSize = file.size;

  const image = await new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });

  const canvas = document.createElement("canvas");

  let { width, height } = image;

  const MAX_WIDTH = 1200;

  if (width > MAX_WIDTH) {
    height = (height * MAX_WIDTH) / width;
    width = MAX_WIDTH;
  }

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0, width, height);

  let quality = 0.7;
  let blob;

  do {
    blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality)
    );

    quality -= 0.1;
  } while (blob.size > 2 * 1024 * 1024 && quality >= 0.3);

  const compressedFile = new File(
    [blob],
    file.name.replace(/\.(png|jpg|jpeg)$/i, ".jpg"),
    {
      type: "image/jpeg",
    }
  );

  return {
    file: compressedFile,
    originalSize,
    compressedSize: compressedFile.size,
  };
}