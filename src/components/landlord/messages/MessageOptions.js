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
import { EditMessage } from "./MessageInput";

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

  //put the message text in the input
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
            //edit the id of the message to get text
            setMessageSelected(message.id);
            //get the id of the message to edit
            EditMessage(message.id);
            //make input toglle with useeffect
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
