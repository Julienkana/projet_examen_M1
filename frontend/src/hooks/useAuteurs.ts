import { useState, useEffect } from 'react';
import { Auteur } from '../models/auteur';

export const useAuteurs = (url: string) => {
  const [auteurs, setAuteurs] = useState<Auteur[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuteurs = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAuteurs(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des auteurs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuteurs();
  }, [url]);

  return { auteurs, loading };
};
