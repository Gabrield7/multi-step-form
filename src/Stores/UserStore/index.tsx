import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUser {
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
            name: 'signature-storage',
            partialize: (state) => ({
                user: state.user
            })
        }
    )
)

export { useUserStore }