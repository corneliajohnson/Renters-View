import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../landlord/messages/MessageProvider";
import { Col, Row } from "reactstrap";

export const TenantMessageShowing = () => {
  const { messages, getMessages } = useContext(MessageContext);
  const [reciever, setReciever] = useState();

  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  //only get messages in the clicked on conversation
  useEffect(() => {
    const subsetMessages = messages.filter(
      (message) => message.tenantId === parseInt(localStorage.tenant)
    );
    setFilteredMessages(subsetMessages);
  }, [messages]);

  return (
    <>
      <div className="inputAndMessage">
        <div className="messageShowingArea">
          <Row>
            {filteredMessages.map((message) =>
              message.sender === "tenant" ? (
                <Col sm={12} className="float-right">
                  <div className="senderMessageBox m-2 p-3">
                    {localStorage.landlord ? (
                      <div className="float-right"></div>
                    ) : (
                      ""
                    )}
                    <p>{message.text}</p>
                    <small className="float-right">
                      {new Date(message.date).toLocaleString()}
                    </small>
                  </div>
                </Col>
              ) : (
                <Col sm={12}>
                  <div className="recieverMessageBox m-2 p-3">
                    {localStorage.landlord ? (
                      <div className="float-left"></div>
                    ) : (
                      ""
                    )}
                    <p>{message.text}</p>
                    <small className="float-right">
                      {new Date(message.date).toLocaleString()}
                    </small>
                  </div>
                </Col>
              )
            )}
          </Row>
        </div>
        <div> {/* <MessageInput id={reciever} />{" "} */}</div>
      </div>
    </>
  );
};
