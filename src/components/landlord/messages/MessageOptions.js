import React, { useContext } from "react";
import { MessageContext } from "./MessageProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

export const MessageOptions = (message) => {
  const { deleteMessage } = useContext(MessageContext);

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle color="link">
        <FontAwesomeIcon icon={faEllipsisV} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          className="text-danger"
          onClick={() => deleteMessage(message.id)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};
