import { ReactNode } from 'react';
import { UserProvider } from './UserContext';
import { PlanProvider } from './PlanContext';
import { PageValidationProvider } from './PageValidationContext';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PageValidationProvider>
      <UserProvider>
          <PlanProvider>
            {children}
          </PlanProvider>
      </UserProvider>
    </PageValidationProvider>
  );
};