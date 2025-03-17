import { Auteur } from 'src/auteurs/entities/auteur/auteur';

export class AuteurPresenter {
  static toResponse(auteur: Auteur) {
    return {
      id: auteur.id,
      nom: auteur.nom,
      photo: auteur.photo || null,
      biographie: auteur.biographie || null,
      livres: auteur.livres ? auteur.livres.map((livre) => ({
        id: livre.id,
        titre: livre.titre,
      })) : [],
    };
  }

  static toListResponse(auteurs: Auteur[]) {
    return auteurs.map(this.toResponse);
  }
}
