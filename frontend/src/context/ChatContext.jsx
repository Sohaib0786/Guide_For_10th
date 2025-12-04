import { createContext, useContext } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const openChatWithPrompt = (prompt) => {
    const event = new CustomEvent("chatPrompt", { detail: prompt });
    window.dispatchEvent(event);
  };

  return (
    <ChatContext.Provider value={{ openChatWithPrompt }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
