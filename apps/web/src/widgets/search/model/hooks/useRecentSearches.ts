import { useState, useEffect } from 'react';

const RECENT_SEARCHES_KEY = 'recent_searches';
const MAX_RECENT_SEARCHES = 10;

export default function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const addSearch = (keyword: string) => {
    const newSearches = [
      keyword,
      ...recentSearches.filter(search => search !== keyword),
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(newSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
  };

  const removeSearch = (keyword: string) => {
    const newSearches = recentSearches.filter(search => search !== keyword);
    setRecentSearches(newSearches);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
  };

  const clearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  return {
    recentSearches,
    addSearch,
    removeSearch,
    clearSearches,
  };
}
