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
    isInitialized: boolean
    isSyncEnabled: boolean
    setSyncEnabled: (value: boolean) => void
}

const useGlobalStore = create<GlobalStore>()(
    persist(
        (set, get) => ({
            pageStatus: usePageValidationStore.getState().pageStatus,
            user: useUserStore.getState().user,
            plan: usePlanStore.getState().plan,
            isInitialized: false,
            isSyncEnabled: true,
            setSyncEnabled: (value: boolean) => {
                set({ isSyncEnabled: value });
            },

            syncStores: () => {
                if (!get().isSyncEnabled) return;
                const updatedState = {
                    pageStatus: usePageValidationStore.getState().pageStatus,
                    user: useUserStore.getState().user,
                    plan: usePlanStore.getState().plan,
                    isInitialized: true
                };

                set(updatedState);
                localStorage.setItem('signature-storage-global', JSON.stringify(updatedState));
            },

            initializeStores: () => {
                const storedData = localStorage.getItem('signature-storage-global');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);

                    set({
                        pageStatus: parsedData.pageStatus,
                        user: parsedData.user,
                        plan: parsedData.plan,
                        isInitialized: true
                    });

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
