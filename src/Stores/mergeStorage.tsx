import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { usePlanStore } from '@stores/PlanStore';
import { useUserStore } from '@stores/UserStore';
import { usePageValidationStore } from '@stores/PageStatusStore';

interface GlobalStore {
    pageStatus: ReturnType<typeof usePageValidationStore>;
    user: ReturnType<typeof useUserStore>;
    plan: ReturnType<typeof usePlanStore>;
    syncStores: () => void;
    initializeStores: () => void;
}

const useGlobalStore = create<GlobalStore>()(
    persist(
        (set) => ({
            pageStatus: usePageValidationStore.getState().pageStatus,
            user: useUserStore.getState().user,
            plan: usePlanStore.getState().plan,

            syncStores: () => {
                set({
                    pageStatus: usePageValidationStore.getState().pageStatus,
                    user: useUserStore.getState().user,
                    plan: usePlanStore.getState().plan,
                });
            },

            initializeStores: () => {
                const storedData = localStorage.getItem('signature-storage-global');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    usePageValidationStore.setState({ pageStatus: parsedData.pageStatus });
                    useUserStore.setState({ user: parsedData.user });
                    usePlanStore.setState({ plan: parsedData.plan });
                }
            }
        }),
        {
            name: 'signature-storage-global',
            storage: {
                getItem: (name) => {
                    const storedValue = localStorage.getItem(name);
                    return storedValue ? JSON.parse(storedValue) : {};
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
);

usePageValidationStore.subscribe(() => useGlobalStore.getState().syncStores());
useUserStore.subscribe(() => useGlobalStore.getState().syncStores());
usePlanStore.subscribe(() => useGlobalStore.getState().syncStores());

export { useGlobalStore };
