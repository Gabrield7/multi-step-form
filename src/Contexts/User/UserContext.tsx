import { createContext, ReactNode, useState } from 'react';

interface IUserContextProps {
    name: string,
    email: string,
    phone: number | null,
    setName: (name: string) => void,
    setEmail: (email: string) => void,
    setPhone: (number: number) => void
};

const UserContext = createContext<IUserContextProps>({
    name: '',
    email: '',
    phone: null,
    setName: () => {},
    setEmail: () => {},
    setPhone: () => {},
});

const UserContextProvider = ({ children } : { children: ReactNode }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<number | null>(null);
    
    return (
        <UserContext.Provider value={{ name, email, phone, setName, setEmail, setPhone }}>
            {children}
        </UserContext.Provider>
    )
};

export { UserContext, UserContextProvider }