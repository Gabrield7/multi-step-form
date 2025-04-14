import { createContext, useState } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: false,
    setIsLoading: () => {}
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export { LoadingProvider, LoadingContext };