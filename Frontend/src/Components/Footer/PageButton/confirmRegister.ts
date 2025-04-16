import { safeGetItem } from '@utils/encryptedStorage';

export const confirmRegister = async () => {
    const data = safeGetItem() || null;

    const user = data?.user;
    const plan = data?.plan;
    
    if (!user || !plan) return;

    try {
        const response = await fetch('api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user, plan})
        });

        const body = await response.json();
        
        if (!response.ok) {
            return {
                success: false,
                message: body.message || 'Unnexpected server error',
                status: body.status || response.status,
            };
        }

        return body;
    } catch (error) {
        return { 
            success: false,
            message: 'Failed to connect to server. Please try again later',
            error
        }
    }
}