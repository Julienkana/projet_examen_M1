import { EntityRepository, Repository } from 'typeorm';
import { Livre } from 'src/livres/entities/livre/livre';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Livre)
export class LivreRepository extends Repository<Livre> {
  async findAllWithAuthors() {
    return this.find({ relations: ['auteur'] });
  }
}
