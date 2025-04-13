import CryptoJS from 'crypto-js';

const secretKey = import.meta.env.VITE_CRYPTO_KEY as string;

const safeSetItem = (value: unknown) => {
    const str = JSON.stringify(value);

    const encrypted = CryptoJS.AES.encrypt(str, secretKey).toString();

    localStorage.setItem('signature-storage-global', encrypted);
}

const safeGetItem = () => {
    const encrypted = localStorage.getItem('signature-storage-global');
    if (!encrypted) return null;

    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
        const text = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(text);
    } catch {
        return null;
    }
}

export { safeGetItem, safeSetItem }