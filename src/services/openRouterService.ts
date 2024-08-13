import axios from "axios";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export const sendMessageToAI = async (
  apiKey: string,
  messages: { role: string; content: string }[]
) => {
  const response = await axios.post(
    OPENROUTER_API_URL,
    { messages },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
    }
  );
  return response.data;
};
// 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
