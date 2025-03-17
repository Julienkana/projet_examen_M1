export interface Auteur {
    nom: string;
    prenom?: string;
  }
  
  export interface Livre {
    id: number;
    titre: string;
    anneePublication: number;
    prix: number;
    auteur: Auteur;
  }