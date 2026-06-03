import React, { createContext, useContext, useState } from 'react';

const PhleboContext = createContext(null);

export const PhleboProvider = ({ children, setPage }) => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [walletBalance, setWalletBalance] = useState(350);

  // NEW
  const [completedTasks, setCompletedTasks] = useState([]);
  console.log("PhleboProvider Mounted");

  return (
    <PhleboContext.Provider value={{
      activeOrder,
      setActiveOrder,
      walletBalance,
      setWalletBalance,

      // NEW
      completedTasks,
      setCompletedTasks,

      setPage
    }}>
      {children}
    </PhleboContext.Provider>
  );
};

export const usePhlebo = () => {
  const context = useContext(PhleboContext);

  if (!context) {
    throw new Error(
      'usePhlebo must be wrapped and initialized inside a PhleboProvider node.'
    );
  }
 
  return context;
};