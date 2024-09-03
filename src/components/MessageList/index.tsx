import React from "react";
import MarkdownIt from "markdown-it";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";

type Message = {
  sender: "user" | "ai";
  content: string;
  loading?: boolean;
};

type MessageListProps = {
  messages: Message[];
};

// 创建 MarkdownIt 实例
const md = new MarkdownIt();

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
            <Box sx={{ width: "75%", marginTop: 1 }}>
              {!message.loading ? (
                // 使用 MarkdownIt 渲染内容
                <ListItemText
                  sx={{
                    backgroundColor:
                      message.sender === "user"
                        ? "primary.main"
                        : "secondary.main",
                    color: "#fff",
                    borderRadius: 2,
                    padding: 1,
                  }}
                  // 使用 dangerouslySetInnerHTML 来显示解析后的 HTML
                  primary={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: md.render(message.content),
                      }}
                    />
                  }
                />
              ) : (
                <CircularProgress color="secondary" />
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;
