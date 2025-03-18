import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livre } from 'src/livres/entities/livre/livre';
import { LivrePresenter } from './presenters/livre.presenter';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { Auteur } from 'src/auteurs/entities/auteur/auteur';

@Injectable()
export class LivresService {
  constructor(
    @InjectRepository(Livre)
    private readonly livreRepository: Repository<Livre>,
    @InjectRepository(Auteur)
    private readonly auteursRepository: Repository<Auteur>
  ) {}

  async findAll(): Promise<Livre[]> {
    const livres = await this.livreRepository.find({ relations: ['auteur'] });
    console.log('Livres récupérés :', livres);
    return LivrePresenter.toListResponse(livres);
  }

  async findOne(id: number) {
    const livre = await this.livreRepository.findOne({ where: { id }, relations: ['auteur'] });
    if (!livre) throw new NotFoundException(`Livre avec ID ${id} non trouvé.`);
    return LivrePresenter.toResponse(livre);
  }

  async create(createLivreDto: CreateLivreDto) {
    const auteur = await this.auteursRepository.findOne({
        where: { id: createLivreDto.auteurId },
    });
    
    if (!auteur) {
      throw new Error('Auteur non trouvé');
    }
  
    const livre = this.livreRepository.create({
      ...createLivreDto,
      auteur: auteur,
    });

    await this.livreRepository.save(livre);
  
    return LivrePresenter.toResponse(livre);
  }

  async update(id: number, updateLivreDto: UpdateLivreDto) {
    const livre = await this.livreRepository.findOne({ where: { id }, relations: ['auteur'] });
  
    if (!livre) {
      throw new NotFoundException('Livre non trouvé');
    }
  
    Object.assign(livre, updateLivreDto);
  
    if (updateLivreDto.auteurId) {
      const auteur = await this.auteursRepository.findOne({ where: { id: updateLivreDto.auteurId } });
  
      if (!auteur) {
        throw new NotFoundException('Auteur non trouvé');
      }
  
      livre.auteur = auteur;
    }
  
    await this.livreRepository.save(livre);
  
    const updatedLivre = await this.findOne(id);
  
    return LivrePresenter.toResponse(updatedLivre);
  }
  

  async remove(id: number) {
    const livre = await this.findOne(id);
    await this.livreRepository.remove(livre);
    return { message: `Livre supprimé avec succès.` };
  }
}
