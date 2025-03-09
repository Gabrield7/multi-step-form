import { useState, createContext, ReactNode } from "react";

interface ISwitchContextProps {
    check: boolean;
    setCheck: (check: boolean) => void;
}

const SwitchContext = createContext<ISwitchContextProps>({
    check: false,
    setCheck: () => {}
});

interface ISwitchContextProviderProps {
    children: ReactNode;
}

const SwitchContextProvider =({ children }: ISwitchContextProviderProps) => {
    const [check, setCheck] = useState(false);

    return (
        <SwitchContext.Provider value={{ check, setCheck }}>
            {children}
        </SwitchContext.Provider>
    )
}

export { SwitchContext, SwitchContextProvider}