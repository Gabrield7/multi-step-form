//import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router';

//type PageStatus = { [path: string]: boolean };

type PagePath = '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';

type PageStatus = {
  [key in PagePath]: boolean;
};


interface IPageValidationContextProps{
    pageStatus: PageStatus
    setPageStatus: (path: string, status: boolean) => void // Dispatch<SetStateAction<PageStatus>> // 
};


const PageValidationContext = createContext<IPageValidationContextProps>({
    pageStatus: {
        '/info': true,
        '/plan': false,
        '/addons': false,
        '/summary': false,
        '/confirmation': false
    },
    setPageStatus: () => {}
});

const PageValidationProvider = ({ children }: { children: ReactNode }) => {
    const [pageStatus, setPageStatus] = useState<PageStatus>({
        '/info': true,
        '/plan': false,
        '/addons': false,
        '/summary': false,
        '/confirmation': false,
    });

    const navigate = useNavigate();
    const validPage = (path: string, status: boolean) => {
        console.log('Atualizando', path, 'para', status);
        
        setPageStatus(prev => ({
            ...prev,
            [path]: status
        }));

        navigate(path)
    };

    return (
        <PageValidationContext.Provider value={{pageStatus, setPageStatus: validPage}}>
            {children}
        </PageValidationContext.Provider>
    )
};

export { PageValidationContext, PageValidationProvider } 