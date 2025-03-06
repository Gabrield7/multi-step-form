import { useState, createContext, ReactNode } from "react";
import './Plan.scss';

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
            <div className='plan__container'>
                {children}
            </div>
        </SwitchContext.Provider>
    )
}

export { SwitchContext, SwitchContextProvider}