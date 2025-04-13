import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { usePlanStore } from '@stores/PlanStore';
import { useUserStore } from '@stores/UserStore';
import { usePageValidationStore } from '@stores/PageStatusStore';
import { safeGetItem, safeSetItem } from '../Utils/encryptedStorage';

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
                safeSetItem(updatedState)
            },

            initializeStores: () => {
                const storedData = safeGetItem();
                if (storedData) {
                    set({
                        pageStatus: storedData.pageStatus,
                        user: storedData.user,
                        plan: storedData.plan,
                        isInitialized: true
                    });
                    
                    usePageValidationStore.setState({ pageStatus: storedData.pageStatus });
                    useUserStore.setState({ user: storedData.user });
                    usePlanStore.setState({ plan: storedData.plan });
                }
            }
        }),
        {
            name: 'signature-storage-global',
            storage: {
                getItem: () => {
                    const storedValue = safeGetItem();
                    return storedValue ? storedValue : {};
                },
                setItem: (_, value) => safeSetItem(value),
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
);

usePageValidationStore.subscribe(() => useGlobalStore.getState().syncStores());
useUserStore.subscribe(() => useGlobalStore.getState().syncStores());
usePlanStore.subscribe(() => useGlobalStore.getState().syncStores());

export { useGlobalStore };
