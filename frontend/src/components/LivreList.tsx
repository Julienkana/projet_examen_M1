import React from 'react';
import { Livre } from '../models/livre';
import LivreItem from './LivreItem';

interface LivreListProps {
  livres: Livre[];
}

const LivreList: React.FC<LivreListProps> = ({ livres }) => {
  return (
    <ul>
      {livres.map((livre) => (
        <LivreItem key={livre.id} livre={livre} />
      ))}
    </ul>
  );
};

export default LivreList;
