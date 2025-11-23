const express = require("express");
const router = express.Router();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    // MODEL MỚI NHẤT 2025
    const MODEL_NAME = "gemini-2.5-flash"; // hoặc đổi thành: gemini-2.5-pro

    const url =
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=` +
      process.env.GEMINI_API_KEY;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return res.json({ reply: "❌ Gemini lỗi: " + data.error.message });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Không có phản hồi AI";

    res.json({ reply });
  } catch (err) {
    console.error("System Error:", err);
    res.json({ reply: "❌ Lỗi kết nối server" });
  }
});

module.exports = router;
