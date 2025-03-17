import React from 'react';
import { Auteur } from '../models/auteur';

interface AuteurItemProps {
  auteur: Auteur;
}

const AuteurItem: React.FC<AuteurItemProps> = ({ auteur }) => {
  return (
    <div className="p-4 border-b">
      <h2>{auteur.nom}</h2>
      <p>{auteur.biographie}</p>
      <img src={auteur.photo} alt={auteur.nom} className="w-32 h-32 object-cover" />
    </div>
  );
};

export default AuteurItem;
