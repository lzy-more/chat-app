import React, { useState, useRef, useEffect } from "react";
import { Box, Container, Typography, Modal } from "@mui/material";
import ApiKeyInput from "../../components/ApiKeyInput";
import ChatInput from "../../components/ChatInput";
import MessageList from "../../components/MessageList";
import { sendMessageToAI } from "../../services/openRouterService";

type Message = {
  sender: "user" | "ai";
  content: string;
  loading?: boolean;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ChatPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);

  const [apiKey, setApiKey] = useState<string>(
    window.localStorage.getItem("apiKey") || ""
  );
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (message: string) => {
    if (!apiKey) {
      setOpen(true);
      return;
    }

    const newMessages: Message[] = [
      ...messages,
      { sender: "user", content: message },
      { sender: "ai", content: "Loading...", loading: true },
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      const aiResponse = await sendMessageToAI(apiKey, [
        ...newMessages
          .filter((msg) => !msg.loading)
          .map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.content,
          })),
      ]);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove the loading message
        {
          sender: "ai",
          content: aiResponse.choices[0].message.content,
          loading: false,
        },
      ]);
    } catch (error) {
      console.log(error, "Error occurred");
      window.localStorage.removeItem("apiKey");
      alert("apiKey is invalid");
    } finally {
      setLoading(false);
    }
  };

  const saveKey = (apiKey: string) => {
    setApiKey(apiKey);
    window.localStorage.setItem("apiKey", apiKey);
    handleClose();
  };

  return (
    <Container
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          border: "1px solid #eee",
          boxSizing: "border-box",
        }}
        style={{ width: "70%" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          AI Chat
        </Typography>
        <MessageList messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ApiKeyInput onSave={saveKey} />
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default ChatPage;
