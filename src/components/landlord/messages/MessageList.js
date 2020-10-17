import React, { useContext, useEffect, useState } from "react";
import { TenantContext } from "../tenants/TenantProvider";
import { MessageShowing } from "./MessageShowing";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";

export const MessageList = () => {
  const { getTenants, tenants } = useContext(TenantContext);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [conversation, setConversation] = useState();

  useEffect(() => {
    getTenants();
  }, []);

  useEffect(() => {
    const subsetTenants = tenants.filter(
      (tenant) =>
        tenant.landlordId === parseInt(localStorage.landlord) && tenant.id !== 1
    );

    setFilteredTenants(subsetTenants);
  }, [tenants]);

  return (
    <>
      <div className="container">
        <Row>
          <Col sm={3}>
            <h3>Tenants</h3>
            <ListGroup>
              {filteredTenants.map((tenant) => (
                <ListGroupItem
                  key={tenant.id}
                  tag="button"
                  onClick={() => {
                    setConversation(tenant.id);
                  }}
                  action
                >
                  {tenant.firstName} {tenant.lastName}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col sm={9}>
            <h3>Messages</h3>
            <div>
              <MessageShowing id={conversation} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
