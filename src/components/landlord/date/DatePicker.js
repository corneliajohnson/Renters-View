import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";

export const DatePicker = () => {
  const [date, setDate] = useState({});
  //get name of each input
  const handleControlledInputChange = (event) => {
    const newDate = { ...date };
    newDate[event.target.name] = event.target.value;
    setDate(newDate);
  };

  return (
    <Form className="w-50">
      <Row>
        <Col>
          <FormGroup>
            <Input
              type="date"
              name="startDate"
              onChange={handleControlledInputChange}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Input
              type="date"
              name="endDate"
              onChange={handleControlledInputChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button
        onClick={(e) => {
          e.preventDefault();

          return date.startDate, date.endDate;
        }}
      >
        Search
      </Button>
    </Form>
  );
};
