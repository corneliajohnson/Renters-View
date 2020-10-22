import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import { MessageContext } from "./MessageProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const MessageDelete = (message) => {
  const { deleteMessage } = useContext(MessageContext);
  const notify = () => {
    toast("Basic Notication");
  };
  return (
    <Button
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
  );
};
