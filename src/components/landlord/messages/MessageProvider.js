import React, { useState, createContext } from "react";

export const MessageContext = createContext();

export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    return fetch(
      "http://localhost:8088/messages?_expand=tenant&_expand=landlord"
    )
      .then((res) => res.json())
      .then(setMessages);
  };

  return (
    <MessageContext.Provider value={{ getMessages, messages }}>
      {props.children}
    </MessageContext.Provider>
  );
};
