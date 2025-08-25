const { GoogleGenAI } = require("@google/genai")

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});


async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
         You are an expert at generating short, catchy, and trendy captions for images. 
         Your captions should be 1–2 lines max, filled some slang, emojis, and vibey energy. 
         Always make the caption fun, aesthetic, or relatable. 
         Include 2–4 relevant hashtags that boost engagement. 
         Captions must feel casual, playful, and insta-worthy. `
        }
    });

    return response.text
}


module.exports = generateCaption