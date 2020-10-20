import React, { useContext, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { InputGroup, InputGroupAddon, Button, Input, Form } from "reactstrap";
import "./Message.css";

export const MessageInput = (reciever) => {
  const { addMessage } = useContext(MessageContext);

  const [message, setMessage] = useState({});

  //Controlled component
  const handleControlledInputChange = (event) => {
    const newMessage = { ...message };
    newMessage[event.target.name] = event.target.value;
    setMessage(newMessage);
  };

  const constructMessage = () => {
    const checkLandlord = Object.keys(localStorage);
    //if the user is a landlord add to database
    if (checkLandlord[0] === "landlord" && reciever.id) {
      addMessage({
        tenantId: reciever.id,
        landlordId: parseInt(localStorage.landlord),
        text: message.text.trim(),
        date: Date.now(),
        sender: "landlord",
      })
        //clear the message after its been sent
        .then((_) => {
          message.text = "";
        });
    }
  };
  return (
    <>
      <Form>
        <InputGroup>
          <Input
            className="messageTextInput"
            type="text"
            name="text"
            value={message.text}
            onChange={handleControlledInputChange}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="secondary"
              onClick={(e) => {
                if (message.text) {
                  e.preventDefault();
                  constructMessage();
                }
              }}
            >
              Send
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </>
  );
};
