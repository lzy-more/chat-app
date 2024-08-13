const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export const sendMessageToAI = async (
  apiKey: string,
  messages: { role: string; content: string }[],
  onMessage: (content: string) => void
) => {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({ messages, stream: true }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder("utf-8");
  let partialMessage = "";

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      partialMessage += chunk;

      // 按换行符分割数据块，处理每一行数据
      const lines = partialMessage.split("\n");
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();

        if (line.startsWith("data: ")) {
          const jsonString = line.substring(6); // 移除 "data: " 前缀
          if (jsonString === "[DONE]") {
            // 忽略 "[DONE]" 标记
            continue;
          }
          try {
            const parsed = JSON.parse(jsonString);
            onMessage(parsed.choices[0].delta.content); // 处理解析后的内容
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      }

      // 将未完成的部分保留到下一次迭代
      partialMessage = lines[lines.length - 1];
    }
  }
};
