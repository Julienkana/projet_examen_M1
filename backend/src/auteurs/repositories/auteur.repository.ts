import { EntityRepository, Repository } from 'typeorm';
import { Auteur } from 'src/auteurs/entities/auteur/auteur';

@EntityRepository(Auteur)
export class AuteurRepository extends Repository<Auteur> {
  async findAllWithBooks() {
    return this.find({ relations: ['livres'] });
  }
}
