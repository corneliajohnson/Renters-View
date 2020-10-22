import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TenantContext } from "../../landlord/tenants/TenantProvider";
import { TenantMessageShowing } from "./TenantMessageShowing";

import { Button, Form, ModalHeader, CardLink } from "reactstrap";

const Modal = ({ onRequestClose }) => {
  const { getTenantById } = useContext(TenantContext);
  const [landlord, setLandlord] = useState();

  useEffect(() => {
    getTenantById(parseInt(localStorage.tenant)).then((response) => {
      setLandlord(response.landlordId);
    });
  }, []);

  // Use useEffect to add an event listener to the document
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        // Close the modal when the Escape key is pressed
        onRequestClose();
      }
    }

    // Prevent scolling
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="modal__backdrop">
      <div className="modal__container">
        <Form className="text-left">
          <CardLink
            className="d-flex justify-content-end text-danger"
            type="button"
            onClick={onRequestClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </CardLink>
          <ModalHeader className="display-3">Message</ModalHeader>
          <TenantMessageShowing />
        </Form>
        <div className="text-right">
          <Button
            className="m-2"
            outline
            color="secondary"
            type="button"
            onClick={onRequestClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

//add message button modal
export const MessageForm = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <div>
      {isModalOpen && <Modal onRequestClose={toggleModal} />}
      <Button onClick={toggleModal} outline color="secondary" type="button">
        Message
      </Button>
    </div>
  );
};
