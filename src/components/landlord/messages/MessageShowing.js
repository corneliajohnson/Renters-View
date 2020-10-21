import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { TenantContext } from "../tenants/TenantProvider";
import { Col, Row } from "reactstrap";
import "./Message.css";
import { MessageInput } from "./MessageInput";
import { MessageOptions } from "./MessageOptions";

export const MessageShowing = (tenantConversation) => {
  const { messages, getMessages, setMessageText } = useContext(MessageContext);
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
        <div className="messageShowingArea overflow-auto">
          <h3 className="text-center messageNameTitle p-4 sticky-top bg-white">
            {tenant.id
              ? `${tenant.firstName} ${tenant.lastName}`
              : "Select a Tenant"}
          </h3>
          <Row>
            {filteredMessages.map((message) =>
              //landlord messages
              message.sender === "landlord" ? (
                <Col sm={12} className="float-right">
                  <div className="landLordMessageBox m-2 p-3">
                    {localStorage.landlord ? (
                      <div className="float-right">
                        <MessageOptions id={message.id} />
                      </div>
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
                //tenant message
                <Col sm={12}>
                  <div className="tenatMessageBox m-2 p-3">
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
          <MessageInput id={reciever} />
        </div>
      </div>
    </>
  );
};
