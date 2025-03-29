import { createContext, ReactNode, useState } from 'react';

type PagePath = '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';

type PageStatus = {
    [key in PagePath]: boolean;
};

interface IPageValidationContextProps{
    pageStatus: PageStatus
    validatePage: (path: keyof PageStatus, status: boolean) => void // Dispatch<SetStateAction<PageStatus>>
};

const PageValidationContext = createContext<IPageValidationContextProps>({
    pageStatus: {
        '/info': true,
        '/plan': false,
        '/addons': false,
        '/summary': false,
        '/confirmation': false,
    },
    validatePage: () => {}
});

const PageValidationProvider = ({ children }: { children: ReactNode }) => {
    const [pageStatus, setPageStatus] = useState<PageStatus>({
        '/info': true,
        '/plan': false,
        '/addons': false,
        '/summary': false,
        '/confirmation': false,
    });

    const validatePage = (path: keyof PageStatus, status: boolean) => {
        setPageStatus(prev => ({
            ...prev,
            [path]: status
        }));
    };

    return (
        <PageValidationContext.Provider value={{pageStatus, validatePage }}>
            {children}
        </PageValidationContext.Provider>
    )
};

export { PageValidationContext, PageValidationProvider } 