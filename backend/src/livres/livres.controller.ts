import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LivresService } from './livres.service';
import { CreateLivreDto } from 'src/livres/dto/create-livre.dto';
import { UpdateLivreDto } from 'src/livres/dto/update-livre.dto';

@Controller('livres')
export class LivresController {
  constructor(private readonly livresService: LivresService) {}

  @Get()
  findAll() {
    return this.livresService.findAll();
  }

  @Post()
  create(@Body() createLivreDto: CreateLivreDto) {
    return this.livresService.create(createLivreDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.livresService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateLivreDto: UpdateLivreDto) {
    return this.livresService.update(id, updateLivreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.livresService.remove(id);
  }
}
