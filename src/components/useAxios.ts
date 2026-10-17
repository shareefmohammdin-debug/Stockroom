
import { useState, useEffect } from 'react';
import axios, {type AxiosRequestConfig, AxiosError } from 'axios';

interface UseAxiosReturn<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}


export default function useAxios<T>(url: string, options?: AxiosRequestConfig): UseAxiosReturn<T> {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get<T>(url, options);
                setData(response.data);
            } catch (err) {
                setError(err as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options]);

    return { data, loading, error };
}