import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LivreRepository } from './repositories/livre.repository';
import { Livre } from 'src/livres/entities/livre/livre';
import { CreateLivreDto } from './dto/create-livre.dto';
import { UpdateLivreDto } from './dto/update-livre.dto';
import { LivrePresenter } from './presenters/livre.presenter';

@Injectable()
export class LivresService {
  constructor(
    @InjectRepository(LivreRepository)
    private readonly livreRepository: LivreRepository,
  ) {}

  async findAll(): Promise<Livre[]> {
    const livres = await this.livreRepository.findAllWithAuthors();
    return LivrePresenter.toListResponse(livres);
  }

  async findOne(id: number) {
    const livre = await this.livreRepository.findOne({ where: { id }, relations: ['auteur'] });
    if (!livre) throw new NotFoundException(`Livre avec ID ${id} non trouvé.`);
    return LivrePresenter.toResponse(livre);
  }

  async create(createLivreDto: CreateLivreDto) {
    const livre = this.livreRepository.create(createLivreDto);
    await this.livreRepository.save(livre);
    return LivrePresenter.toResponse(livre);
  }

  async update(id: number, updateLivreDto: UpdateLivreDto) {
    await this.livreRepository.update(id, updateLivreDto);
    const updatedLivre = await this.findOne(id);
    return LivrePresenter.toResponse(updatedLivre);
  }

  async remove(id: number) {
    const livre = await this.findOne(id);
    await this.livreRepository.remove(livre);
    return { message: `Livre supprimé avec succès.` };
  }
}
