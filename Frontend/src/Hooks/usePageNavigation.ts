import { useContext, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LoadingContext } from '@contexts/LoadingContext';
import { useSubscription } from './useSubscription';

export function usePageNavigation(type: 'back' | 'next') {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading } = useContext(LoadingContext);
  
    const path = location.pathname;
    const subscribe = useSubscription();
  
    const config = useMemo(() => {
        if (type === 'back') {
            if (path === '/info') return null;

            return {
                className: 'page-button back',
                text: 'Go Back',
                onClick: () => !isLoading && navigate(-1),
                type: 'button'
            };
        }
  
        if (type === 'next') {
            if (path === '/summary') {
                return {
                    className: 'page-button confirm',
                    text: 'Confirm',
                    onClick: () => !isLoading && subscribe(),
                    type: 'button'
                };
            }

            return {
                className: 'page-button next',
                text: 'Next Step',
                type: 'submit',
                form: `${path.split('/')[1]}-form`
            };
        }
  
        return null;
    }, [type, path, isLoading, navigate, subscribe]);
  
    return config;
};

