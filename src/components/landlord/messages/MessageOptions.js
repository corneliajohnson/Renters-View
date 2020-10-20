import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

export const MessageOptions = () => {
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle color="link">
        <FontAwesomeIcon icon={faEllipsisV} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Delete</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};
