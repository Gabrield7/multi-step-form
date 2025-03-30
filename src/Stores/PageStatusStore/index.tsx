import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PagePath = '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';

type PageStatus = {
    [key in PagePath]: boolean;
};

interface PageValidationStore {
    pageStatus: PageStatus;
    validatePage: (path: keyof PageStatus, status: boolean) => void;
}

const usePageValidationStore = create<PageValidationStore>()(
    persist(
        (set) => ({
            pageStatus: {
                '/info': true,
                '/plan': false,
                '/addons': false,
                '/summary': false,
                '/confirmation': false,
            },
            validatePage: (path, status) => {
                set((state) => ({
                    pageStatus: {
                        ...state.pageStatus,
                        [path]: status,
                    },
                }));
            },
        }),
        {
            name: 'signature-storage',
            partialize: (state) => ({
                pageValidation: state.pageStatus
            })
        }
    )
);

export { usePageValidationStore };