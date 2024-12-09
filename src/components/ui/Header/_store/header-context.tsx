"use client";

import React, { createContext, useReducer, ReactNode, Dispatch } from "react";

// Define the state interface for the header
interface HeaderState {
  openMenu: boolean;
  openSearch: boolean;
}
// Define the action types for the header
type HeaderAction = { type: "TOGGLE_MENU" } | { type: "TOGGLE_SEARCH" };

// Define the props interface for the header context
interface HeaderContextProps extends HeaderState {
  // Functions to toggle the menu and search
  handleToggleMenu: () => void;
  handleToggleSearch: () => void;
}
// Define the default state for the header
const defaultState: HeaderState = {
  openMenu: false,
  openSearch: false,
};

// Create the header context
export const HeaderContext = createContext<HeaderContextProps>({
  ...defaultState,
  handleToggleMenu: () => {},
  handleToggleSearch: () => {},
});

// Define the reducer function for the header
const headerReducer = (
  state: HeaderState,
  action: HeaderAction,
): HeaderState => {
  switch (action.type) {
    case "TOGGLE_MENU":
      // Toggle the menu state
      return { ...state, openMenu: !state.openMenu };
    case "TOGGLE_SEARCH":
      // Toggle the search state
      return { ...state, openSearch: !state.openSearch };
    default:
      // Return the current state if no action is matched
      return state;
  }
};

// Define the props interface for the header context provider
interface HeaderContextProviderProps {
  children: ReactNode;
}

// Create the header context provider
const HeaderContextProvider: React.FC<HeaderContextProviderProps> = ({
  children,
}) => {
  // Use the useReducer hook to create the state and dispatch
  const [state, dispatch] = useReducer<
    React.Reducer<HeaderState, HeaderAction>
  >(headerReducer, defaultState);

  // Define the handleToggleMenu function
  const handleToggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  // Define the handleToggleSearch function
  const handleToggleSearch = () => {
    dispatch({ type: "TOGGLE_SEARCH" });
  };

  // Create the context value
  const ctxValue: HeaderContextProps = {
    openMenu: state.openMenu,
    openSearch: state.openSearch,
    handleToggleMenu,
    handleToggleSearch,
  };

  return (
    // Return the header context provider
    <HeaderContext.Provider value={ctxValue}>{children}</HeaderContext.Provider>
  );
};

export default HeaderContextProvider;
