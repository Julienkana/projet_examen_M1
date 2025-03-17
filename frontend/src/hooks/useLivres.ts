import { useState, useEffect } from 'react';
import { Livre } from '../models/livre';

export const useLivres = (url: string, sortBy: string = '') => {
  const [livres, setLivres] = useState<Livre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivres = async () => {
      try {
        const response = await fetch(`${url}?sortBy=${sortBy}`);
        const data = await response.json();
        setLivres(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivres();
  }, [url, sortBy]);

  return { livres, loading };
};
