import { runOCR } from "../services/ocrService.js";

export const extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const langMap = {
      en: "eng",
      hi: "hin",
      mr: "mar",
      de: "deu",
    };

    const tessLang = langMap[req.body.lang] || "eng";

    const text = await runOCR(req.file.path, tessLang);

    res.json({
      success: true,
      text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OCR failed" });
  }
};