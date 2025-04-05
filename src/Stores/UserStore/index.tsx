import { create } from 'zustand';

export interface IUser {
    name: string;
    email: string;
    phone: string;
}

interface UserStore {
    user: IUser;
    setUser: (data: Partial<IUser>) => void
}

const useUserStore = create<UserStore>()(
    (set) => ({
        user: {
            name: '',
            email: '',
            phone: ''
        },
        setUser: ( data ) => {
            set((state) => ({
                user: {
                    ...state.user,
                    ...data
                }
            }))
        }
    }),
)

export { useUserStore }