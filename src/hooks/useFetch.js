import { useEffect } from "react";
import { useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const respData = await fetch(url);
                const result = await respData.json();
                setData(result)
                setIsLoading(false)
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();

    }, [url])

    return {data, isLoading, error}
}