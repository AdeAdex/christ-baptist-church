// /app/cache/useCache.ts

import { get, set } from "idb-keyval";

// Generic cache function to get or fetch data
export const getCachedData = async <T>(key: string, fetchData: () => Promise<T>): Promise<T> => {
  try {
    // Try to get cached data from IndexedDB
    const cachedData = await get<T>(key);
    
    // Ensure cachedData is an array or string before checking length
    if (Array.isArray(cachedData) || typeof cachedData === "string") {
      if (cachedData.length > 0) {
        console.log(`Loaded ${key} from IndexedDB:`, cachedData);
        return cachedData;
      }
    }

    // If no cached data, fetch from API
    const fetchedData = await fetchData();
    await set(key, fetchedData); // Store fetched data in IndexedDB
    console.log(`Fetched ${key} from API:`, fetchedData);
    return fetchedData;
  } catch (error) {
    console.error(`Error fetching or caching ${key}:`, error);
    throw new Error(`Failed to get ${key} from cache or API`);
  }
};

