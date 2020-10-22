import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../landlord/messages/MessageProvider";
import { TenantContext } from "../../landlord/tenants/TenantProvider";
import { MessageDelete } from "../../landlord/messages/MessageDelete";
import { TenantMessageInput } from "./TenantMessageInput";
import { Col, Row } from "reactstrap";

export const TenantMessageShowing = () => {
  const { messages, getMessages } = useContext(MessageContext);
  const { getTenantById } = useContext(TenantContext);
  const [landlord, setLandlord] = useState();

  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const currentTenant = parseInt(localStorage.tenant);
    getTenantById(currentTenant).then((response) => {
      setLandlord(response.landlord);
    });
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
                    <div className="float-right">
                      <MessageDelete id={message.id} />
                    </div>
                    <p>{message.text}</p>

                    <small className="float-right">
                      {new Date(message.date).toLocaleString()}
                    </small>
                  </div>
                </Col>
              ) : (
                <Col sm={12}>
                  <div className="recieverMessageBox m-2 p-3">
                    <div className="float-left"></div>
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
        <div>
          {" "}
          <TenantMessageInput id={landlord} />
        </div>
      </div>
    </>
  );
};
