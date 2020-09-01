import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type ContextInterface = [boolean, Dispatch<SetStateAction<boolean>>];

const Context = createContext<ContextInterface | null>(null);

const Provider: React.FC = ({ children }) => {
  const result = useState(false);

  return <Context.Provider value={result}>{children}</Context.Provider>;
};

export function useCommandContext(): ContextInterface {
  const context = useContext(Context);

  if (context === null) {
    throw new Error('Must be used in a provider');
  }

  return context;
}

export const CommandProvider = Provider;
