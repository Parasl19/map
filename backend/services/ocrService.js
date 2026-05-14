import Tesseract from "tesseract.js";
import sharp from "sharp";

export const runOCR = async (
  imagePath,
  tessLang = "eng"
) => {

  // processed image path
  const processedPath =
    imagePath + "-processed.png";

  // preprocess image
  await sharp(imagePath)
    .grayscale()
    .normalize()
    .sharpen()
    .threshold(150)
    .toFile(processedPath);

  // OCR
  const result = await Tesseract.recognize(
    processedPath,
    tessLang,
    {
      logger: (m) => console.log(m),
    }
  );

  let text = result.data.text || "";

  // cleanup OCR text
  text = text.replace(/-\n/g, "");
  text = text.replace(/\n+/g, "\n");
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\s+([.,!?;:])/g, "$1");
  text = text.trim();

  return text;
};