import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Livre } from '../../models/livre'; // Assure-toi que le chemin est correct

const LivreDetailPage = () => {
  const { query } = useRouter();
  const [livre, setLivre] = useState<Livre | null>(null); // Typage explicite pour l'état livre

  useEffect(() => {
    if (query.id) {
      fetch(`http://localhost:3000/livres/${query.id}`)
        .then((res) => res.json())
        .then((data) => setLivre(data))
        .catch((error) => console.error('Erreur lors de la récupération du livre', error));
    }
  }, [query.id]);

  if (!livre) return <p>Chargement...</p>;

  return (
    <div>
      <h1>{livre.titre}</h1>
      <p>Année de publication : {livre.anneePublication}</p>
      <p>Prix : {livre.prix}€</p>
      <p>Auteur : {livre.auteur.nom}</p>
    </div>
  );
};

export default LivreDetailPage;
