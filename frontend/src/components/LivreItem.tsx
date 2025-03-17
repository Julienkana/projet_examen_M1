import React from 'react';
import { Livre } from '../models/livre';

interface LivreItemProps {
  livre: Livre;
}

const LivreItem: React.FC<LivreItemProps> = ({ livre }) => {
  return (
    <li className="p-4 border-b">
      <h2>{livre.titre}</h2>
      <p>{livre.anneePublication}</p>
      <p>Prix : {livre.prix}€</p>
      <p>Auteur : {livre.auteur.nom}</p>
    </li>
  );
};

export default LivreItem;
