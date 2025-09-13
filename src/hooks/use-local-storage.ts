"use client";

import { useState, useEffect, useCallback } from "react";

// Custom hook to manage state in localStorage with SSR safety.
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // We need to make sure we're on the client before we try to access localStorage.
  const [isClient, setIsClient] = useState(false);

  // The state is initialized with the initialValue.
  // It will be updated with the value from localStorage once the component mounts on the client.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // On component mount, we set isClient to true.
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // This effect runs only on the client and only once.
  // It reads the value from localStorage and updates the state.
  useEffect(() => {
    if (isClient) {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error(error);
            // If there's an error, we can fall back to the initial value.
            setStoredValue(initialValue);
        }
    }
  }, [isClient, key, initialValue]);

  // The setValue function persists the new value to localStorage.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    if (!isClient) return; // Don't do anything on the server.
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue, isClient]);

  return [storedValue, setValue];
}
