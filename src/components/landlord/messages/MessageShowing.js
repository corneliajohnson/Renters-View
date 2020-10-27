import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { TenantContext } from "../tenants/TenantProvider";
import { Col, Row } from "reactstrap";
import "./Message.css";
import { MessageInput } from "./MessageInput";
import { MessageDelete } from "./MessageDelete";

export const MessageShowing = (tenantConversation) => {
  const { messages, getMessages } = useContext(MessageContext);
  const { getTenantById } = useContext(TenantContext);

  const [reciever, setReciever] = useState();
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [tenant, setTenant] = useState({});
  const [property, setProperty] = useState({});

  //get all messages
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
        setProperty(response.property);
      });
    }
    setReciever(tenantConversation.id);
  }, [tenantConversation]);

  return (
    <>
      <div className="inputAndMessage">
        <div className="messageShowingArea">
          {/* show tennant name if landlord is logged in */}
          {localStorage.landlord ? (
            <div className="text-center messageNameTitle p-4 sticky-top bg-white">
              {tenant.id ? (
                <>
                  <h3>
                    {tenant.firstName} {tenant.lastName}
                  </h3>{" "}
                  <p className="text-secondary">
                    {" "}
                    {property.street} {property.city} {property.state}
                  </p>
                </>
              ) : (
                <h3 className="text-secondary">Select A Tenant</h3>
              )}
              <p></p>
            </div>
          ) : (
            ""
          )}
          <Row>
            {filteredMessages.map((message) =>
              message.sender === "landlord" ? (
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
          {/* pass the id of the reciver/tenant */}
          <MessageInput id={reciever} />{" "}
        </div>
      </div>
    </>
  );
};
