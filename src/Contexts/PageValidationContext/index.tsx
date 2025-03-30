import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type PagePath = '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';

type PageStatus = {
    [key in PagePath]: boolean;
};

interface IPageValidationContextProps{
    pageStatus: PageStatus
    validatePage: (path: keyof PageStatus, status: boolean) => void // Dispatch<SetStateAction<PageStatus>>
    previousPage: string
    setPreviousPage: Dispatch<SetStateAction<string>>
};

const PageValidationContext = createContext<IPageValidationContextProps>({
    pageStatus: {
        '/info': true,
        '/plan': false,
        '/addons': false,
        '/summary': false,
        '/confirmation': false,
    },
    validatePage: () => {},
    previousPage: '/info',
    setPreviousPage: () => {}
});

const PageValidationProvider = ({ children }: { children: ReactNode }) => {
    const [pageStatus, setPageStatus] = useState<PageStatus>({
        '/info': true,
        '/plan': false,
        '/addons': false,
        '/summary': false,
        '/confirmation': false,
    });

    const [previousPage, setPreviousPage] = useState('/info');

    const validatePage = (path: keyof PageStatus, status: boolean) => {
        setPageStatus(prev => ({
            ...prev,
            [path]: status
        }));
    };

    return (
        <PageValidationContext.Provider value={{pageStatus, validatePage, previousPage, setPreviousPage }}>
            {children}
        </PageValidationContext.Provider>
    )
};

export { PageValidationContext, PageValidationProvider } 