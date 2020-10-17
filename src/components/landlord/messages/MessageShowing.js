import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "./MessageProvider";

export const MessageShowing = (tenantConversation) => {
  const { messages, getMessages } = useContext(MessageContext);

  useEffect(() => {
    getMessages();
  }, []);
  return <>{tenantConversation.id}</>;
};
