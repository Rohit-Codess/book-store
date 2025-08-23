import { useContext, createContext } from 'react';

// Create context
export const AppContext = createContext();

// Hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
