import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AuteursService } from './auteurs.service';
import { CreateAuteurDto } from 'src/auteurs/dto/create-auteur.dto';
import { UpdateAuteurDto } from 'src/auteurs/dto/update-auteur.dto';

@Controller('auteurs')
export class AuteursController {
  constructor(private readonly auteursService: AuteursService) {}

  @Get()
  findAll() {
    return this.auteursService.findAll();
  }

  @Post()
  create(@Body() createAuteurDto: CreateAuteurDto) {
    return this.auteursService.create(createAuteurDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.auteursService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAuteurDto: UpdateAuteurDto) {
    return this.auteursService.update(id, updateAuteurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.auteursService.remove(id);
  }
}
