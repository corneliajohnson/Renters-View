import React, { useContext, useEffect, useState, useRef } from "react";
import { PropertyContext } from "./PropertyProvider";
import { useHistory } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./Property.css";

export const PropertyForm = (props) => {
  const { addProperty } = useContext(PropertyContext);
  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //For Modal Form
  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>
        {" "}
        Add New Property
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add A New Property</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input type="text" name="street" placeholder="1234 Main St" />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input type="text" name="city" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input type="text" name="state" id="exampleState" />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="zip">Zip</Label>
                  <Input type="text" name="zip" />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleSelect">Tenant</Label>
              <Input type="select" name="tenantId" id="exampleSelect">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="leaseStartDate">Lease Begin</Label>
                    <Input type="date" name="leaseStartDate" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="leaseEndDate">Lease Ends</Label>
                    <Input type="date" name="leaseEndDate" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="rentAmount">Rent</Label>
                    <Input type="text" name="rentAmount" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="secuirtyDesposit">Secuirty Desposit</Label>
                    <Input type="text" name="secuirtyDesposit" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="paymentDay">Monthly Due Date</Label>
                    <Input type="number" name="paymentDay" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="lastPaymentAmount">Last Payment Made</Label>
                    <Input type="date" name="lastPaymentAmount" />
                  </FormGroup>
                </Col>
                <Col>
                  <Label for="leaseTerm">Lease Term</Label>
                  <Input type="select" name="leaseTerm" id="exampleSelect">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
