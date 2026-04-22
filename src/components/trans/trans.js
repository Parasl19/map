import React, { useState, useRef, useEffect, useCallback } from "react";
// import Tesseract from "tesseract.js";
import "../../styles/ocr.css";



function simpleDevanagariToLatin(text) {
  const map = {
    "अ": "a", "आ": "aa", "ा": "a",
    "इ": "i", "ई": "ii", "ि": "i", "ी": "ii",
    "उ": "u", "ऊ": "uu", "ु": "u", "ू": "uu",
    "ए": "e", "ऐ": "ai",
    "ओ": "o", "औ": "au",

    "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "n",
    "च": "ch", "छ": "chh", "ज": "j", "झ": "jh", "ञ": "ny",
    "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
    "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
    "य": "y", "र": "r", "ल": "l", "व": "v",
    "श": "sh", "ष": "sh", "स": "s", "ह": "h",

    "ँ": "n", "ं": "n", "ः": "h",
    "ृ": "ri",

    "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
    "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
  };

  let out = "";
  for (const ch of text) out += map[ch] ?? ch;
  return out;
}

export default function OCR() {
  const [mode, setMode] = useState("upload"); // upload | camera
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);

  // NEW: translate / transliterate state
  const [convertMode, setConvertMode] = useState("translate"); // translate | transliterate
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [convertedText, setConvertedText] = useState("");
  const [convLoading, setConvLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => () => stopCamera(), []);

  const languageOptions = [
    { code: "auto", label: "Auto detect" },
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "mr", label: "Marathi" },
    { code: "de", label: "German" },
    { code: "fr", label: "French" },
  ];
  
  // 📌 File Upload
  const handleFile = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setImage(URL.createObjectURL(file));
  setLoading(true);
  setText("");
  setConvertedText("");

  try {
    const formData = new FormData();
    formData.append("image", file);

    // 🔥 OCR CALL (backend)
    const res = await fetch("http://localhost:5000/api/ocr/extract", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const extractedText = data.text || "";
    setText(extractedText);

    // 🔥 AUTO TRANSLATE
    // await processText(extractedText);
    setText(extractedText);

  } catch (err) {
    console.error(err);
    setText("❌ OCR failed");
  } finally {
    setLoading(false);
  }
};

  // 📌 Camera Handling
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    streamRef.current = stream;
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const stopCamera = () => {
    if (!streamRef.current) return;
    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const capturePhoto = async () => {
  const canvas = canvasRef.current;
  canvas.width = videoRef.current.videoWidth;
  canvas.height = videoRef.current.videoHeight;

  canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );

  const imageUrl = URL.createObjectURL(blob);
  setImage(imageUrl);

  setLoading(true);
  setText("");
  setConvertedText("");

  stopCamera();

  try {
    const formData = new FormData();
    formData.append("image", blob);

    const res = await fetch("http://localhost:5000/api/ocr/extract", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const extractedText = data.text || "";
    setText(extractedText);

    // 🔥 AUTO TRANSLATE
    // await processText(extractedText);
    setText(extractedText);

  } catch (err) {
    setText("❌ OCR failed");
  } finally {
    setLoading(false);
  }
};

  // 📌 Translation ONLY (clean version)
const translateText = useCallback(async (inputText) => {
  if (!inputText.trim()) return;

  setConvLoading(true);
  setConvertedText("");

  try {
    const res = await fetch("http://localhost:5000/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
        source: sourceLang === "auto" ? "en" : sourceLang,
        target: targetLang,
      }),
    });

    const data = await res.json();
    setConvertedText(data.translatedText || "⚠️ No translation");

  } catch (err) {
    setConvertedText("❌ Translation failed");
  } finally {
    setConvLoading(false);
  }
}, [sourceLang, targetLang]);


const transliterateText = useCallback(async (inputText) => {
  const cleanText = inputText?.trim();

  if (!cleanText) {
    setConvertedText("⚠️ No text to transliterate");
    return;
  }

  setConvLoading(true);
  setConvertedText("");

  try {
    const result = simpleDevanagariToLatin(cleanText);
    setConvertedText(result || "⚠️ No result");
  } catch (err) {
    setConvertedText("❌ Transliteration failed");
  } finally {
    setConvLoading(false);
  }
}, []);

const processText = useCallback(async (inputText) => {
  if (!inputText.trim()) return;

  if (convertMode === "translate") {
    await translateText(inputText);
  } else {
    await transliterateText(inputText);
  }
}, [convertMode, translateText, transliterateText]);

// auto effect
// useEffect(() => {
//   if (text) {
//     processText(text);
//   }
// }, [text, processText]);

  return (
    <div className="ocr-wrapper">
      <div className="ocr-container">
        <h1 className="ocr-title">OCR Photo Scanner</h1>
        <p className="ocr-subtitle">
          Extract text from images using your camera or uploaded photos
        </p>

        {/* TABS */}
        <div className="ocr-tabs">
          <button
            className={`ocr-tab ${mode === "upload" ? "active" : ""}`}
            onClick={() => {
              stopCamera();
              setMode("upload");
              setImage(null);
              setText("");
              setProgress(0);
              setConvertedText("");
            }}
          >
            📤 Upload Photo
          </button>
          <button
            className={`ocr-tab ${mode === "camera" ? "active" : ""}`}
            onClick={() => {
              setMode("camera");
              setText("");
              setImage(null);
              setProgress(0);
              setConvertedText("");
              startCamera();
            }}
          >
            📷 Use Camera
          </button>
        </div>

        {/* UPLOAD SECTION */}
        {mode === "upload" && !image && (
          <label className="ocr-upload-box">
            <span className="upload-icon">⬆</span>
            <span>Choose Image</span>
            <small>Supports JPG, PNG, and other image formats</small>
            <input type="file" accept="image/*" onChange={handleFile} hidden />
          </label>
        )}

        {/* CAMERA SECTION */}
        {mode === "camera" && !image && (
          <div className="ocr-camera-section">
            <video ref={videoRef} className="ocr-video" />
            <button className="capture-btn" onClick={capturePhoto}>
              📸 Capture Photo
            </button>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </div>
        )}

        {/* Preview */}
        {image && (
          <div className="ocr-preview">
            <button
              className="clear-img-btn"
              onClick={() => {
                setImage(null);
                setText("");
                setProgress(0);
                setConvertedText("");
              }}
            >
              ✖
            </button>
            <img src={image} alt="preview" />
          </div>
        )}

        {/* ACTION BUTTON */}

        {/* PROGRESS */}
        {loading && (
          <div className="ocr-progress">
            <div style={{ width: `${progress}%` }}></div>
          </div>
        )}

        {/* RESULTS */}
        {text && (
          <div className="ocr-result">
            <h3>Extracted Text</h3>
            <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <button
              onClick={() => navigator.clipboard.writeText(text)}
              className="copy-btn"
            >
              📋 Copy
            </button>
          </div>
        )}

        {/* TRANSLATE / TRANSLITERATE */}
        {text && (
          <div className="convert-section">
            <div className="convert-header">
              <h3>Convert text</h3>
              <div className="convert-mode-toggle">
                <button
                  className={`convert-mode-btn ${convertMode === "translate" ? "active" : ""
                    }`}
                  onClick={() => setConvertMode("translate")}
                >
                  Translate
                </button>
                <button
                    className={`convert-mode-btn ${convertMode === "transliterate" ? "active" : ""}`}
                    onClick={() => {
                      setConvertMode("transliterate");
                      transliterateText(text);
                      console.log("transliteration btn pressed");
                      
                    }}
                  >
                    Transliterate
                  </button>
              </div>
            </div>

            <div className="convert-row">
              <div className="convert-select">
                <label>From</label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                >
                  {languageOptions.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="convert-select">
                <label>To</label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  disabled={false}
                >
                  {languageOptions
                    .filter((l) => l.code !== "auto")
                    .map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.label}
                      </option>
                    ))}
                </select>
              </div>
              <button className="convert-btn" onClick={() => processText(text)}>
                  {convLoading
                    ? "Processing..."
                    : convertMode === "translate"
                    ? "Translate"
                    : "Transliterate"}
                </button>
            </div>

            {convertedText && (
              <div className="convert-output">
                <h4>
                  {convertMode === "translate"
                    ? "Translated text"
                    : "Transliteration"}
                </h4>
                <textarea readOnly value={convertedText} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

