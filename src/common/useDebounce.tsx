import React, { useEffect, useRef } from "react"

export const useDebounce = (callback: () => void, delay: number, ...dependencies: React.DependencyList) => {
    const timerRef = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(callback, delay);
    }, [callback, delay, dependencies]);
}