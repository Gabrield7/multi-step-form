import { availableAddons, availablePlans } from './Models.ts';
import { ReactNode, createContext, useEffect, useState } from 'react';

type PlanType = 'Arcade' | 'Advanced' | 'Pro' | null;
type AddonType = 'Online service' | 'Larger storage' | 'Customizable profile';
type BillingCycle = 'monthly' | 'yearly';

interface ISignatureContextProps {
    plan: PlanType;
    cycle: BillingCycle;
    addons: AddonType[]
    price: number;
    setPlan: (plan: PlanType) => void;
    setCycle: (cycle: BillingCycle) => void;
    setAddons: (addons: AddonType[]) => void;
    setPrice: (price: number) => void;
};

const SignatureContext = createContext<ISignatureContextProps>({
    plan: null,
    cycle: 'monthly',
    addons: [],
    price: 0,
    setPlan: () => {},
    setCycle: () => {},
    setAddons: () => {},
    setPrice: () => {}
});

const SignatureContextProvider = ({ children } : { children: ReactNode }) => {
    const [plan, setPlan] = useState<PlanType>(null);
    const [cycle, setCycle] = useState<BillingCycle>('monthly');
    const [addons, setAddons] = useState<AddonType[]>([]);
    const [price, setPrice] = useState<number>(0);

    const calculatePrice = () => {
        const addonsPrice = addons.reduce((acc, addon) => acc + availableAddons[addon].price[cycle], 0);
        const planPrice = plan? availablePlans[plan].price[cycle] : 0;

        setPrice(planPrice + addonsPrice);
    };

    useEffect(calculatePrice, [plan, cycle, addons]);

    return (
        <SignatureContext.Provider value={{ plan, cycle, addons, price, setPlan, setCycle, setAddons, setPrice }}>
            {children}
        </SignatureContext.Provider>
    )
}

export { SignatureContext, SignatureContextProvider}