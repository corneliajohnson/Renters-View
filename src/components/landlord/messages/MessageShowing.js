import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { Col, Row } from "reactstrap";
import "./Message.css";

export const MessageShowing = (tenantConversation) => {
  const { messages, getMessages } = useContext(MessageContext);

  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const subsetMessages = messages.filter(
      (message) => message.tenantId === tenantConversation.id
    );
    setFilteredMessages(subsetMessages);
  }, [messages, tenantConversation]);
  return (
    <>
      <div className="messageShowingArea">
        <Row>
          {filteredMessages.map((message) =>
            message.sender === "landlord" ? (
              <Col sm={12} className="float-right">
                <div className="landLordMessageBox m-2 p-3">{message.text}</div>
              </Col>
            ) : (
              <Col sm={12}>
                <div className="tenatMessageBox m-2 p-3">{message.text}</div>
              </Col>
            )
          )}
        </Row>
      </div>
    </>
  );
};
