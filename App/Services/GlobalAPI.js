const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyDWOvABLfsBn0WTWI3CH_dicDYxEmuSgp4";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

export default async function getBardApi(userMsg) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = userMsg;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
getBardApi();
