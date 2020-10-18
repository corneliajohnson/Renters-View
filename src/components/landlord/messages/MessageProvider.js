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

  const addMessage = (messageObj) => {
    return fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
    }).then(getMessages);
  };

  return (
    <MessageContext.Provider value={{ getMessages, messages, addMessage }}>
      {props.children}
    </MessageContext.Provider>
  );
};
