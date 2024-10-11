// src/App.tsx
import React from "react";
import ChatPage from "./pages/ChatPage";
import Captcha from "./components/Captcha";
import ImagePreview from "./components/ImagePreview";
import girl from "./assets/1.jpg";
const App: React.FC = () => {
  // return <ChatPage />;
  return (
    // <ImagePreview
    //   src={
    //     "https://upload-images.jianshu.io/upload_images/5809200-736bc3917fe92142.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
    //   }
    //   placeholderSrc={girl}
    //   alt="Sample Image"
    // />
    <ChatPage></ChatPage>
  );
};

export default App;
