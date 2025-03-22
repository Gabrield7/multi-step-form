import { ReactNode } from 'react';
import { UserProvider } from './UserContext';
import { PlanProvider } from './PlanContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
        <PlanProvider>
            {children}
        </PlanProvider>
    </UserProvider>
  );
};