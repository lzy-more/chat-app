import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        label="Type a message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
