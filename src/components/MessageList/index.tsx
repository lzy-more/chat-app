import React from "react";
import { List, ListItem, ListItemText, Box, Avatar } from "@mui/material";

type Message = {
  sender: "user" | "ai";
  content: string;
};

type MessageListProps = {
  messages: Message[];
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box sx={{ flexGrow: 1, overflow: "auto", marginBottom: 2 }}>
      <List>
        {messages.map((message, index) => (
          <ListItem
            key={index}
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Avatar>{message.sender === "user" ? "You" : "Gpt"}</Avatar>

            <ListItemText
              sx={{
                backgroundColor:
                  message.sender === "user" ? "primary.main" : "secondary.main",
                color: "#fff",
                borderRadius: 2,
                padding: 1,
                width: "75%",
              }}
              primary={message.content}
              style={{ display: "block" }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;
