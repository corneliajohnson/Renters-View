import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { TenantContext } from "../tenants/TenantProvider";
import { Col, Row } from "reactstrap";
import "./Message.css";
import { MessageInput } from "./MessageInput";

export const MessageShowing = (tenantConversation) => {
  const { messages, getMessages } = useContext(MessageContext);
  const { getTenantById } = useContext(TenantContext);
  const [reciever, setReciever] = useState();

  const [filteredMessages, setFilteredMessages] = useState([]);
  const [tenant, setTenant] = useState({});

  useEffect(() => {
    getMessages();
  }, []);

  //only get messages in the clicked on conversation
  useEffect(() => {
    const subsetMessages = messages.filter(
      (message) => message.tenantId === tenantConversation.id
    );
    setFilteredMessages(subsetMessages);
  }, [messages, tenantConversation]);

  //get the reciever/tenant in selected conversation
  useEffect(() => {
    if (tenantConversation.id) {
      getTenantById(tenantConversation.id).then((response) => {
        setTenant(response);
      });
    }
    setReciever(tenantConversation.id);
  }, [tenantConversation]);

  return (
    <>
      <div className="inputAndMessage">
        <div className="messageShowingArea">
          <h3 className="text-center messageNameTitle p-4">
            {tenant.id
              ? `${tenant.firstName} ${tenant.lastName}`
              : "Select a Tenant"}
          </h3>
          <Row>
            {filteredMessages.map((message) =>
              message.sender === "landlord" ? (
                <Col sm={12} className="float-right">
                  <div className="landLordMessageBox m-2 p-3">
                    {message.text}
                  </div>
                </Col>
              ) : (
                <Col sm={12}>
                  <div className="tenatMessageBox m-2 p-3">{message.text}</div>
                </Col>
              )
            )}
          </Row>
        </div>
        <div>
          <MessageInput id={reciever} />
        </div>
      </div>
    </>
  );
};
