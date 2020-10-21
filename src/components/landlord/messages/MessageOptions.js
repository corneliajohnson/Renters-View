import React, { useContext, useEffect, useState } from "react";
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
  const { deleteMessage, getMessageById, setMessageText } = useContext(
    MessageContext
  );

  const [messageSelected, setMessageSelected] = useState({});
  const [editButtonClick, setEditButtonClick] = useState(false);

  useEffect(() => {
    if (messageSelected) {
      getMessageById(messageSelected).then((response) => {
        constructMessage(response);
      });
    }
  }, [messageSelected, editButtonClick]);

  const constructMessage = (messageObj) => {
    if (messageObj.id) {
      setMessageText(messageObj.text);
    }
  };

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle color="link">
        <FontAwesomeIcon icon={faEllipsisV} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem
          onClick={() => {
            setMessageSelected(message.id);
            if (editButtonClick) {
              setEditButtonClick(true);
            } else {
              setEditButtonClick(false);
            }
          }}
        >
          Edit
        </DropdownItem>
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
