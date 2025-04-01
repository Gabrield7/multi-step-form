import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IUser {
    name: string;
    email: string;
    phone: string;
}

interface UserStore {
    user: IUser;
    setUser: (user: IUser) => void
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: {
                name: '',
                email: '',
                phone: ''
            },
            setUser: (user) => {
                set({ user })
            }
        }),
        {
            name: 'signature-storage-user',
            storage: {
                getItem: (name) => {
                    const storedValue = localStorage.getItem(name);
                    return storedValue ? JSON.parse(storedValue) : {};
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value))
                },
                removeItem: (name) => localStorage.removeItem(name),
            }
        }
    )
)

export { useUserStore }