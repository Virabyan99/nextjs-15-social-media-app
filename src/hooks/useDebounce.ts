import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 250): T {
    const [debauncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)
    }, [value, delay])

    return debauncedValue;
}