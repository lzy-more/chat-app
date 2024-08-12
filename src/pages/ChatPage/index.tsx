import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import ApiKeyInput from "../../components/ApiKeyInput";
import ChatInput from "../../components/ChatInput";
import MessageList from "../../components/MessageList";
import { sendMessageToAI } from "../../services/openRouterService";

type Message = {
  sender: "user" | "ai";
  content: string;
};

const ChatPage: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (message: string) => {
    const newMessages = [...messages, { sender: "user", content: message }];
    setMessages(newMessages);
    console.log(apiKey, "onSendMessageonSendMessageonSendMessageonSendMessage");

    if (apiKey) {
      const aiResponse = await sendMessageToAI(apiKey, [
        ...newMessages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.content,
        })),
      ]);
      setMessages([
        ...newMessages,
        { sender: "ai", content: aiResponse.choices[0].message.content },
      ]);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          paddingTop: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          AI Chat
        </Typography>
        {!apiKey ? (
          <ApiKeyInput onSave={setApiKey} />
        ) : (
          <>
            <MessageList messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default ChatPage;
