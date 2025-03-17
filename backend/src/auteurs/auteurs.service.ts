import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuteurRepository } from './repositories/auteur.repository';
import { Auteur } from 'src/auteurs/entities/auteur/auteur';
import { CreateAuteurDto } from 'src/auteurs/dto/create-auteur.dto';
import { UpdateAuteurDto } from 'src/auteurs/dto/update-auteur.dto';
import { AuteurPresenter } from './presenters/auteur.presenter';

@Injectable()
export class AuteursService {
  constructor(
    @InjectRepository(AuteurRepository)
    private readonly auteurRepository: AuteurRepository,
  ) {}

  async findAll() {
    const auteurs = await this.auteurRepository.findAllWithBooks();
    return AuteurPresenter.toListResponse(auteurs);
  }

  async findOne(id: number): Promise<Auteur> {
    const auteur = await this.auteurRepository.findOne({ where: { id }, relations: ['livres'] });
  
    if (!auteur) {
      throw new NotFoundException(`Auteur avec ID ${id} non trouvé.`);
    }
  
    return auteur;
  }

  async create(createAuteurDto: CreateAuteurDto) {
    const auteur = this.auteurRepository.create(createAuteurDto);
    await this.auteurRepository.save(auteur);
    return AuteurPresenter.toResponse(auteur);
  }

  async update(id: number, updateAuteurDto: UpdateAuteurDto) {
    await this.auteurRepository.update(id, updateAuteurDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const auteur = await this.findOne(id);
  
    if (!auteur) {
      throw new NotFoundException(`Auteur avec ID ${id} non trouvé.`);
    }
  
    await this.auteurRepository.remove(auteur);
    return { message: `Auteur supprimé avec succès.` };
  }

}
