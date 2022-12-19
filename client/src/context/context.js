import React, { useState, createContext } from "react";

export const UserContext = createContext(null);

export default ({ children }) => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const user = {
    email,
    setEmail,
    userId,
    setUserId,
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
