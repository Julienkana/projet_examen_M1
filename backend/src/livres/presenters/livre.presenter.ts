import { Livre } from 'src/livres/entities/livre/livre';

export class LivrePresenter {
    static toResponse(livre: Livre): any {
      return {
        id: livre.id,
        titre: livre.titre,
        anneePublication: livre.anneePublication,
        prix: livre.prix,
        auteur: livre.auteur ? { id: livre.auteur.id, nom: livre.auteur.nom } : null,
      };
    }

    static toListResponse(livres: Livre[]) {
        return livres.map(this.toResponse);
      }
  }
  