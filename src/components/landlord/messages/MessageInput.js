import React, { useContext, useState, useEffect } from "react";
import { MessageContext } from "./MessageProvider";
import { InputGroup, InputGroupAddon, Button, Input, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./Message.css";
let messageId = 0;

export const MessageInput = (reciever) => {
  const { addMessage, messageText, setMessageText, updateMessage } = useContext(
    MessageContext
  );

  useEffect(() => {
    messageId = 0;
  }, [reciever]);

  const [message, setMessage] = useState({});

  //Controlled component
  const handleControlledInputChange = (event) => {
    const newMessage = { ...message };
    newMessage[event.target.name] = event.target.value;
    setMessage(newMessage);
  };

  message.text = messageText;

  const constructMessage = () => {
    const checkLandlord = Object.keys(localStorage);
    //if the user is a landlord add to database
    //to edit message
    if (messageId !== 0 && checkLandlord[0] === "landlord" && reciever.id) {
      updateMessage({
        id: messageId,
        tenantId: reciever.id,
        landlordId: parseInt(localStorage.landlord),
        text: message.text.trim(),
        date: Date.now(),
        sender: "landlord",
      }).then((_) => {
        messageId = 0;
        setMessageText("");
      });
    } else if (checkLandlord[0] === "landlord" && reciever.id) {
      addMessage({
        tenantId: reciever.id,
        landlordId: parseInt(localStorage.landlord),
        text: message.text.trim(),
        date: Date.now(),
        sender: "landlord",
      })
        //clear the message after its been sent
        .then((_) => {
          messageId = 0;
          setMessageText("");
        });
    }
  };

  return (
    <>
      <Form>
        <InputGroup>
          <Input
            onKeyUp={(keyEvent) => setMessageText(keyEvent.target.value)}
            className="messageTextInput"
            type="text"
            name="text"
            defaultValue={messageText}
            placeholder="Write message here ..."
            onChange={handleControlledInputChange}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="link"
              onClick={(e) => {
                if (message.text) {
                  e.preventDefault();
                  constructMessage();
                }
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </>
  );
};

export const EditMessage = (message) => {
  messageId = message;
};
