import { useEffect, useRef } from "react";

export const useTimeout = (onTimeout: () => void, delay: number, active: boolean) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!active) return;

        timerRef.current = setTimeout(onTimeout, delay);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [active, delay, onTimeout]);
};

