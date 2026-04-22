import Tesseract from "tesseract.js";

export const runOCR = async (imagePath) => {
  const result = await Tesseract.recognize(imagePath, "eng+hin+mar", {
    logger: (m) => console.log(m) // optional progress log
  });

  return result.data.text;
};