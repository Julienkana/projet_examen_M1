import { useAuteurs } from '../../hooks/useAuteurs';
import AuteurList from '../../components/AuteurList';

const AuteursPage = () => {
  const { auteurs, loading } = useAuteurs('http://localhost:3000/auteurs');

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Liste des auteurs</h1>
      <AuteurList auteurs={auteurs} />
    </div>
  );
};

export default AuteursPage;
