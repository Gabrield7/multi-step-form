import { create } from 'zustand';

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
)

export { useUserStore }