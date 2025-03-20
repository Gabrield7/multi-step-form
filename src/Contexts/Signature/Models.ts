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
    img: { path: string, alt: string}
}

const availablePlans: Record<string, Plan> = {
    'Arcade': {
        price: { monthly: 9, yearly: 90 },
        img: {
            path: '/assets/images/icon-arcade.svg',
            alt: 'Arcade plan icon'
        }
    },
    'Advanced': {
        price: { monthly: 12, yearly: 120 },
        img: {
            path: '/assets/images/icon-advanced.svg',
            alt: 'Advanced plan icon'
        }
    },
    'Pro': {
        price: { monthly: 15, yearly: 150 },
        img: {
            path: '/assets/images/icon-pro.svg',
            alt: 'Pro plan icon'
        }
    }
} as const;

export { availableAddons, availablePlans }

