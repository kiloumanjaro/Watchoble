// hooks/useSearch.ts
import { useState, useEffect, useCallback } from 'react';
import { searchMovies } from '@/services/api/movieService';
import { Movie } from '@/services/api/movieService';

export const useSearch = (debounceMs: number = 1000) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchMovies(query);
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchError('Failed to search movies');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, debounceMs);

    return () => {
      clearTimeout(timeoutId);
      setIsSearching(false);
    };
  }, [query, debounceMs]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setSearchResults([]);
    setSearchError(null);
    setIsSearching(false);
  }, []);

  return {
    query,
    setQuery,
    searchResults,
    isSearching,
    searchError,
    clearSearch,
    hasResults: searchResults.length > 0,
  };
};