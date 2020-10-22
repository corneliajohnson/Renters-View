import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";
import { MessageContext } from "./MessageProvider";

export const MessageDelete = (message) => {
  const { deleteMessage } = useContext(MessageContext);
  return (
    <Button
      style={{ color: "darkcyan" }}
      color="link"
      onClick={() => deleteMessage(message.id)}
    >
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};
