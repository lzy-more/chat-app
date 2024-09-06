// src/App.tsx
import React from "react";
// import ChatPage from "./pages/ChatPage";
import Captcha from "./components/Captcha";
import ImagePreview from "./components/ImagePreview";
import girl from "./assets/1.jpg";
const App: React.FC = () => {
  // return <ChatPage />;
  return (
    <ImagePreview
      src={
        "https://sns-webpic-qc.xhscdn.com/202409061415/d74e16a51f9a9fe1db4352acdd920db0/1040g008317ce7dhiju2g5p4opesk8ea1bd7gbp0!nc_n_webp_mw_1"
      }
      placeholderSrc={girl}
      alt="Sample Image"
    />
  );
};

export default App;
