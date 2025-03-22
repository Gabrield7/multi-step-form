import { createContext, ReactNode, useState } from 'react';

interface IUser {
    name: string;
    email: string;
    phone: string;
}

interface IUserContextProps {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const UserContext = createContext<IUserContextProps>({
    user: {
        name: '',
        email: '',
        phone: ''
    },
    setUser: () => {}
});

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser>({
        name: '',
        email: '',
        phone: '',
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider }