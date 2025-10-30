import { useState, useEffect } from "react";
import { ApiResponse } from "../interfaces/api";

export function useApi<T = any>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError };
}
