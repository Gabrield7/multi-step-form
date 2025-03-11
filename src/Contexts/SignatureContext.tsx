import { availableAddons, availablePlans } from './Models.ts';
import { ReactNode, createContext, useState } from 'react';

type PlanName = keyof typeof availablePlans;
type Plan = typeof availablePlans[PlanName];

type AddonName = keyof typeof availableAddons;
type Addon = typeof availableAddons[AddonName];

interface ISignatureContextProps {
    plan: Plan;
    cycle: 'monthly' | 'yearly';
    addons: Addon[];
    price: number;
    setPlan: (plan: Plan) => void;
    setCycle: (cycle: 'monthly' | 'yearly') => void;
    setAddons: (addons: Addon[]) => void;
    setPrice: (price: number) => void;
};

const SignatureContext = createContext<ISignatureContextProps>({
    plan: availablePlans['Arcade'],
    cycle: 'monthly',
    addons: [],
    price: 0,
    setPlan: () => {},
    setCycle: () => {},
    setAddons: () => {},
    setPrice: () => {}
});

const SignatureContextProvider = ({ children } : { children: ReactNode }) => {
    const [plan, setPlan] = useState<Plan>(availablePlans['Arcade']);
    const [cycle, setCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [addons, setAddons] = useState<Addon[]>([]);
    const [price, setPrice] = useState<number>(0);

    const totalPrice = () => {
        const addonsPrice = addons?.length 
            ? addons.reduce((acc, addon) => acc + addon.price[cycle], 0) 
            : 0;
        const addonsCyclingPrice = cycle === 'monthly'? addonsPrice : addonsPrice*10;

        const planCyclingPrice = plan.price[cycle];
        const planPrice: number = cycle === 'monthly'? planCyclingPrice : planCyclingPrice*10;

        setPrice(planPrice + addonsCyclingPrice);
    };

    return (
        <SignatureContext.Provider 
            value={{
                plan,
                cycle,
                addons,
                price,
                setPlan,
                setCycle,
                setAddons,
                setPrice: totalPrice
            }}
        >
            {children}
        </SignatureContext.Provider>
    )
}

export { SignatureContext, SignatureContextProvider}