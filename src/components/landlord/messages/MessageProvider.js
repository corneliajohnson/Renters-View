import React, { useState, createContext } from "react";

export const MessageContext = createContext();

export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

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

  const deleteMessage = (messageId) => {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "DELETE",
    }).then(getMessages);
  };

  const updateMessage = (message) => {
    return fetch(`http://localhost:8088/messages/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then(getMessages);
  };

  const getMessageById = (id) => {
    return fetch(`http://localhost:8088/messages/${id}`, {}).then((res) =>
      res.json()
    );
  };

  return (
    <MessageContext.Provider
      value={{
        getMessages,
        messages,
        addMessage,
        deleteMessage,
        updateMessage,
        getMessageById,
        messageText,
        setMessageText,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
