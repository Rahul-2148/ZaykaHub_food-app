const API_KEY = "YOUR_GOOGLE_CLOUD_API_KEY"; // यहां अपनी Google API Key डालो

export async function translateText(text: string, targetLang: string): Promise<string> {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      q: text,
      target: targetLang,
      format: "text",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.data.translations[0].translatedText;
}
