import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livre } from 'src/livres/entities/livre/livre';
import { CreateLivreDto } from 'src/livres/dto/create-livre.dto';
import { UpdateLivreDto } from 'src/livres/dto/update-livre.dto';

@Injectable()
export class LivresService {
  constructor(
    @InjectRepository(Livre)
    private readonly livreRepository: Repository<Livre>,
  ) {}

  async findAll(): Promise<Livre[]> {
    return await this.livreRepository.find({ relations: ['auteur'] });
  }

  async findOne(id: number): Promise<Livre> {
    const livre = await this.livreRepository.findOne({ where: { id }, relations: ['auteur'] });
    if (!livre) throw new NotFoundException(`Livre avec ID ${id} non trouvé.`);
    return livre;
  }

  async create(createLivreDto: CreateLivreDto): Promise<Livre> {
    const livre = this.livreRepository.create(createLivreDto);
    return await this.livreRepository.save(livre);
  }

  async update(id: number, updateLivreDto: UpdateLivreDto): Promise<Livre> {
    await this.livreRepository.update(id, updateLivreDto);
    const updatedLivre = await this.findOne(id);
    return updatedLivre;
  }

  async remove(id: number): Promise<void> {
    const livre = await this.findOne(id);
    await this.livreRepository.remove(livre);
  }
}
