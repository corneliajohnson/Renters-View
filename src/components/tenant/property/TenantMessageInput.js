import React, { useContext, useState } from "react";
import { MessageContext } from "../../landlord/messages/MessageProvider";
import { InputGroup, InputGroupAddon, Button, Input, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export const TenantMessageInput = (reciever) => {
  const { addMessage } = useContext(MessageContext);

  const [message, setMessage] = useState({});

  //Controlled component
  const handleControlledInputChange = (event) => {
    const newMessage = { ...message };
    newMessage[event.target.name] = event.target.value;
    setMessage(newMessage);
  };

  const constructMessage = () => {
    const checkTenant = Object.keys(localStorage);
    //if the user is a tenant
    if (checkTenant[0] === "tenant") {
      addMessage({
        tenantId: parseInt(localStorage.tenant),
        landlordId: reciever.id.id,
        text: message.text.trim(),
        date: Date.now(),
        sender: "tenant",
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
            placeholder="Write message here ..."
            onChange={handleControlledInputChange}
          />
          {message.text ? (
            <InputGroupAddon addonType="append">
              <Button
                style={{ color: "darkcyan" }}
                color="link"
                onClick={(e) => {
                  e.preventDefault();
                  constructMessage();
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroupAddon>
          ) : (
            <InputGroupAddon addonType="append">
              <Button style={{ color: "darkcyan" }} color="link" disabled>
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroupAddon>
          )}
        </InputGroup>
      </Form>
    </>
  );
};
