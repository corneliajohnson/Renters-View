import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button, UncontrolledTooltip } from "reactstrap";
import { MessageContext } from "./MessageProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const MessageDelete = (message) => {
  const { deleteMessage } = useContext(MessageContext);

  //taost when a message is deleted
  const notify = () => {
    toast.error("Message Deleted", {
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  return (
    <>
      <Button
        id="UncontrolledTooltip"
        style={{ color: "darkcyan" }}
        color="link"
        onClick={() =>
          deleteMessage(message.id).then(() => {
            notify();
          })
        }
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <UncontrolledTooltip placement="top" target="UncontrolledTooltip">
        Delete
      </UncontrolledTooltip>
    </>
  );
};
