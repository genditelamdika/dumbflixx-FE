import React, { useState, createContext } from 'react';

export const DropdownContext = createContext();

export const DropdownProvider = (props) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <DropdownContext.Provider value={[dropdown, setDropdown]}>
      {props.children}
    </DropdownContext.Provider>
  )
}