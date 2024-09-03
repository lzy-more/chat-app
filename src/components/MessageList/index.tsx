/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import "./index.css";

// 定义消息类型
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

// 分割 Markdown 内容为块级元素
const splitMarkdownByBlock = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks = Array.from(doc.body.children).map((child) => child.outerHTML);
  return blocks;
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <Box sx={{ flexGrow: 1, overflow: "auto", marginBottom: 2 }}>
      <List>
        {messages.map((message, index) => {
          // 使用 MarkdownIt 渲染内容
          const renderedContent = md.render(message.content);
          // 分割内容为块级元素
          const blocks = splitMarkdownByBlock(renderedContent);
          console.log("blocks", blocks);

          return (
            <ListItem
              key={index}
              style={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Avatar>{message.sender === "user" ? "You" : "Gpt"}</Avatar>
              <Box sx={{ width: "75%", marginTop: 1 }}>
                {!message.loading ? (
                  // 根据发送者渲染不同的背景色
                  <Box
                    sx={{
                      backgroundColor:
                        message.sender === "user"
                          ? "primary.main"
                          : "secondary.main",
                      color: "#fff",
                      borderRadius: 2,
                      padding: 1,
                    }}
                    className={
                      message.sender !== "user" ? "gpt-answer" : "question"
                    }
                  >
                    {blocks.map((block, idx) => (
                      <div
                        key={idx}
                        style={{ animationDelay: `${0.5 * (idx + 1)}s` }}
                        dangerouslySetInnerHTML={{ __html: block }}
                      />
                    ))}
                  </Box>
                ) : (
                  <CircularProgress color="secondary" />
                )}
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default MessageList;
