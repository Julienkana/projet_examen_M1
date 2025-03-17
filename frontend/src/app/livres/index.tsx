import { useState } from 'react';
import LivreList from '../../components/LivreList'; // Assure-toi que le composant LivreList est bien dans le dossier components
import { useLivres } from '../../hooks/useLivres'; // Assure-toi que ton hook useLivres est dans le dossier hooks

const LivresPage = () => {
  const [sortBy, setSortBy] = useState<string>(''); // Typage de l'état sortBy pour préciser que c'est une chaîne de caractères
  const { livres, loading } = useLivres('http://localhost:3000/livres', sortBy);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Liste des livres</h1>
      <div>
        <label htmlFor="sort">Trier par :</label>
        <select id="sort" onChange={handleSortChange}>
          <option value="">Sélectionner...</option>
          <option value="anneePublication">Année de publication</option>
          <option value="prix">Prix</option>
        </select>
      </div>
      <LivreList livres={livres} /> {/* LivreList est un composant qui prend en paramètre les livres */}
    </div>
  );
};

export default LivresPage;
