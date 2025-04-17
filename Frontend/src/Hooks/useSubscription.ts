import {  useContext } from "react";
import { useNavigate } from "react-router";
import { LoadingContext } from "@contexts/LoadingContext";
import { confirmRegister } from "@utils/confirmRegister";
import { safeGetItem } from "@utils/encryptedStorage";
import { useGlobalStore } from "@stores/mergeStorage";
import { usePageValidationStore } from "@stores/PageStatusStore";

export const useSubscription = () => {
    const { setIsLoading } = useContext(LoadingContext);
    const { setSyncEnabled } = useGlobalStore();
    const { validatePage } = usePageValidationStore();
    const navigate = useNavigate();

    const subcribe = async () => {
        setIsLoading(true);
        const response = await confirmRegister();
        setIsLoading(false);
    
        if (response.success) {
            setSyncEnabled(false); //prevents the store to set the values back to the localStorage
            if (safeGetItem()) localStorage.removeItem('signature-storage-global');
        }
    
        validatePage('/confirmation', true);
    
        navigate('/confirmation', { state: response });
    }

    return subcribe;
};
