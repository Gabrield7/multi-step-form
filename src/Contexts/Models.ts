interface Addon {
    price: { monthly: number, yearly: number };
    description: string;
}

const availableAddons: Record<string, Addon> = {
    'Online service': {
        price: { monthly: 1, yearly: 10 },
        description: 'Access to multiplayer games',
    },
    'Larger storage': {
        price: { monthly: 2, yearly: 20 },
        description: 'Extra 1TB of cloud save',
    },
    'Customizable profile': {
        price: { monthly: 2, yearly: 20 },
        description: 'Custom theme on your profile',
    }
} as const;

interface Plan {
    price: { monthly: number, yearly: number };
    iconPath: string;
}

const availablePlans: Record<string, Plan> = {
    'Arcade': {
        price: { monthly: 9, yearly: 90 },
        iconPath: '/assets/images/icon-arcade.svg',
    },
    'Advanced': {
        price: { monthly: 12, yearly: 120 },
        iconPath: '/assets/images/icon-advanced.svg',
    },
    'Pro': {
        price: { monthly: 15, yearly: 150 },
        iconPath: '/assets/images/icon-pro.svg',
    }
} as const;

export { availableAddons, availablePlans }

