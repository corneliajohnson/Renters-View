import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import "./Message.css";

export const MessageInput = (reciever) => {
  const { addMessage } = useContext(MessageContext);

  const [message, setMessage] = useState({});

  const handleControlledInputChange = (event) => {
    const newMessage = { ...message };
    newMessage[event.target.name] = event.target.value;
    setMessage(newMessage);
  };

  const constructMessage = () => {
    const checkLandlord = Object.keys(localStorage);

    if (checkLandlord[0] === "landlord" && reciever.id) {
      addMessage({
        tenantId: reciever.id,
        landlordId: parseInt(localStorage.landlord),
        text: message.text.trim(),
        date: Date.now(),
        sender: "landlord",
      });
    }
  };
  return (
    <>
      <InputGroup>
        <Input
          type="text"
          name="text"
          defaultValue=""
          placeholder="Write a message"
          onChange={handleControlledInputChange}
        />
        <InputGroupAddon addonType="append">
          <Button
            color="secondary"
            onClick={() => {
              if (message.text) {
                constructMessage();
              }
            }}
          >
            Send
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </>
  );
};
