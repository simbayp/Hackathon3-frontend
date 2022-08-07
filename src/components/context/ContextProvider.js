import React, { createContext, useState } from "react";

export const addData = createContext("");

const ContextProvider = ({ children }) => {
  const [leadDataContext, setLeadDataContext] = useState("");

  return (
    <addData.Provider value={{ leadDataContext, setLeadDataContext }}>
      {{ children }}
    </addData.Provider>
  );
};

export default ContextProvider;
