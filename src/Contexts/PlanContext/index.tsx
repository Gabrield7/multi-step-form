import { availableAddons, availablePlans } from './Models.ts';
import { ReactNode, createContext, useEffect, useState } from 'react';

type PlanName = 'Arcade' | 'Advanced' | 'Pro' | undefined;
type AddonType = 'Online service' | 'Larger storage' | 'Customizable profile';
type BillingCycle = 'monthly' | 'yearly';

interface IPlan {
    name: PlanName
    cycle: BillingCycle
    addons: AddonType[]
    price: number
}
interface IPlanContextProps {
    plan: IPlan
    setPlan: (planName: PlanName) => void
    setAddons: (addonName: AddonType) => void
};

const PlanContext = createContext<IPlanContextProps>({
    plan: {
        name: undefined,
        cycle: 'monthly',
        addons: [],
        price: 0
    },
    setPlan: () => {},
    setAddons: () => {}
});

const PlanProvider = ({ children } : { children: ReactNode }) => {
    const [plan, setPlan] = useState<IPlan>({
        name: undefined,
        cycle: 'monthly',
        addons: [],
        price: 0
    });

    const calculatePrice = () => {
        const addonsPrice = plan.addons.reduce((acc, addon) => acc + availableAddons[addon].price[plan.cycle], 0);
        const planPrice = plan.name? availablePlans[plan.name].price[plan.cycle] : 0;

        setPlan(prev => ({...prev, price: planPrice + addonsPrice}))
    };

    useEffect(calculatePrice, [plan.name, plan.cycle, plan.addons]);

    const handleAddons = (addonName: AddonType) => {
        setPlan(prev => ({
            ...prev,
            addons: prev.addons.includes(addonName)
                ? prev.addons.filter(addon => addon !== addonName)
                : [...prev.addons, addonName]
        }));
    };

    const handlePlan = (planName: PlanName) => {
        setPlan(prev => ({...prev, name: planName}))
    }

    return (
        <PlanContext.Provider value={{ plan, setPlan: handlePlan, setAddons: handleAddons }}>
            {children}
        </PlanContext.Provider>
    )
}

export { PlanContext, PlanProvider}