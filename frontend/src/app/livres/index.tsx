import { useState } from "react";
import LivreList from "../../components/LivreList";
import { useLivres } from "../../hooks/useLivres";
import Link from "next/link";

const LivresPage = () => {
  const [sortBy, setSortBy] = useState<string>("");
  const { livres, loading } = useLivres("http://localhost:3001/api/livres", sortBy);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container">
      {/* 🥖 Breadcrumb */}
      <nav className="breadcrumb">
        <Link href="/">Accueil</Link> / <span>Liste des livres</span>
      </nav>

      {/* 📌 Titre de la page */}
      <h1 className="page-title">Liste des livres</h1>

      {/* 🏷️ Tri */}
      <div>
        <label htmlFor="sort">Trier par :</label>
        <select id="sort" onChange={handleSortChange}>
          <option value="">Sélectionner...</option>
          <option value="anneePublication">Année de publication</option>
          <option value="prix">Prix</option>
        </select>
      </div>

      {/* 📚 Liste des livres */}
      <LivreList livres={livres} />
    </div>
  );
};

export default LivresPage;
