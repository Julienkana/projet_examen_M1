import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auteur } from 'src/auteurs/entities/auteur/auteur';
import { CreateAuteurDto } from 'src/auteurs/dto/create-auteur.dto';
import { UpdateAuteurDto } from 'src/auteurs/dto/update-auteur.dto';

@Injectable()
export class AuteursService {
  constructor(
    @InjectRepository(Auteur)
    private readonly auteurRepository: Repository<Auteur>,
  ) {}

  async findAll(): Promise<Auteur[]> {
    return await this.auteurRepository.find({ relations: ['livres'] });
  }

  async findOne(id: number): Promise<Auteur> {
    const auteur = await this.auteurRepository.findOne({ where: { id }, relations: ['livres'] });
    if (!auteur) throw new NotFoundException(`Auteur avec ID ${id} non trouvé.`);
    return auteur;
  }

  async create(createAuteurDto: CreateAuteurDto): Promise<Auteur> {
    const auteur = this.auteurRepository.create(createAuteurDto);
    return await this.auteurRepository.save(auteur);
  }

  async update(id: number, updateAuteurDto: UpdateAuteurDto): Promise<Auteur> {
    await this.auteurRepository.update(id, updateAuteurDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const auteur = await this.findOne(id);
    await this.auteurRepository.remove(auteur);
  }
}
