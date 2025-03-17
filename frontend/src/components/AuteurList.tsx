import React from 'react';
import { Auteur } from '../models/auteur';
import AuteurItem from './AuteurItem';

interface AuteurListProps {
  auteurs: Auteur[];
}

const AuteurList: React.FC<AuteurListProps> = ({ auteurs }) => {
  return (
    <div>
      {auteurs.map((auteur) => (
        <AuteurItem key={auteur.id} auteur={auteur} />
      ))}
    </div>
  );
};

export default AuteurList;
