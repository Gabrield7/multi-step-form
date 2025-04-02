import { create } from 'zustand';
//import { persist } from 'zustand/middleware';
import { availableAddons, availablePlans } from './availableServices.ts';

type PlanName = 'Arcade' | 'Advanced' | 'Pro' | undefined;
type AddonType = 'Online service' | 'Larger storage' | 'Customizable profile';
type BillingCycle = 'monthly' | 'yearly';

export interface IPlan {
    name: PlanName
    cycle: BillingCycle
    addons: AddonType[]
    price: number
}

interface PlanStore {
    plan: IPlan
    setPlan: (prop: keyof IPlan, value: IPlan[keyof IPlan]) => void
    setAddons: (addonName: AddonType) => void
};

// Aux. function for addons price calculation
const getAddonTotalPrice = (addons: AddonType[], cycle: BillingCycle): number => {
    return addons.reduce((total, addon) => total + availableAddons[addon].price[cycle], 0);
};

// Aux. function for plan price calculation
const getPlanTotalPrice = (planName: PlanName, cycle: BillingCycle): number => {
    return planName ? availablePlans[planName].price[cycle] : 0;
};

// Aux. function for total (plan + addons) price calculation
const calculateTotalPrice = (plan: IPlan): number => {
    const planPrice = getPlanTotalPrice(plan.name, plan.cycle);
    const addonsPrice = getAddonTotalPrice(plan.addons, plan.cycle);
    return planPrice + addonsPrice;
};

const usePlanStore = create<PlanStore>()(
    //persist(
        (set) => ({
            plan: {
                name: undefined,
                cycle: 'monthly',
                addons: [],
                price: 0
            },
            // Update the plan props
            setPlan: (property, value) => set((state) => {
                const updatedPlan = { ...state.plan, [property]: value };
                return { plan: { ...updatedPlan, price: calculateTotalPrice(updatedPlan) } };
            }),
            // Add or remove addons
            setAddons: (addonName) => set((state) => {
                const updatedAddons = state.plan.addons.includes(addonName)
                    ? state.plan.addons.filter((addon) => addon !== addonName)
                    : [...state.plan.addons, addonName];
        
                const updatedPlan = { ...state.plan, addons: updatedAddons };
                return { plan: { ...updatedPlan, price: calculateTotalPrice(updatedPlan) } };
            })
        }),
        // {
        //     name: 'signature-storage-plan',
        //     storage: {
        //         getItem: (name) => {
        //             const storedValue = localStorage.getItem(name);
        //             return storedValue ? JSON.parse(storedValue) : {};
        //         },
        //         setItem: (name, value) => {
        //             localStorage.setItem(name, JSON.stringify(value))
        //         },
        //         removeItem: (name) => localStorage.removeItem(name),
        //     }
        // }
    //)
)

export { usePlanStore }