import { 
    Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus, ParseIntPipe 
  } from '@nestjs/common';
  import { LivresService } from './livres.service';
  import { CreateLivreDto } from './dto/create-livre.dto';
  import { UpdateLivreDto } from './dto/update-livre.dto';
  import { AuteursService } from 'src/auteurs/auteurs.service';
  
  @Controller('livres')
  export class LivresController {
    constructor(
        private readonly livresService: LivresService,
        private readonly auteursService: AuteursService
    ) {}
  
    @Get()
    async findAll() {
      try {
        const livres = await this.livresService.findAll();
        console.log('Livres renvoyés dans le contrôleur :', livres);
        return { success: true, data: livres };
      } catch (error) {
        throw new HttpException('Erreur lors de la récupération des livres', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Post()
    async create(@Body() createLivreDto: CreateLivreDto) {
      try {
        const livre = await this.livresService.create(createLivreDto);
        return { success: true, message: 'Livre créé avec succès', data: livre };
      } catch (error) {
        throw new HttpException('Erreur lors de la création du livre', HttpStatus.BAD_REQUEST);
      }
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
      try {
        const livre = await this.livresService.findOne(id);
        if (!livre) {
          throw new HttpException('Livre non trouvé', HttpStatus.NOT_FOUND);
        }
        return { success: true, data: livre };
      } catch (error) {
        throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateLivreDto: UpdateLivreDto) {
      try {
        // Vérifier si le livre existe
        const livreExistant = await this.livresService.findOne(id);
        if (!livreExistant) {
          throw new HttpException('Livre non trouvé', HttpStatus.NOT_FOUND);
        }
    
        // Vérifier si un auteurId est présent et existe dans la base de données
        if (updateLivreDto.auteurId) {
          const auteur = await this.auteursService.findOne(updateLivreDto.auteurId); // Appel à un service pour obtenir l'auteur
          if (auteur) {
            livreExistant.auteur = auteur; // Associer l'auteur au livre
          } else {
            throw new HttpException('Auteur non trouvé', HttpStatus.NOT_FOUND);
          }
        }
    
        // Mise à jour des autres propriétés du livre
        if (updateLivreDto.titre) livreExistant.titre = updateLivreDto.titre;
        if (updateLivreDto.anneePublication) livreExistant.anneePublication = updateLivreDto.anneePublication;
        if (updateLivreDto.prix) livreExistant.prix = updateLivreDto.prix;
    
        // Sauvegarder les modifications
        const livre = await this.livresService.update(id, livreExistant); // Appel à la méthode update du service
        return { success: true, message: 'Livre mis à jour avec succès', data: livre };
      } catch (error) {
        throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      try {
        const livreExistant = await this.livresService.findOne(id);
        if (!livreExistant) {
          throw new HttpException('Livre non trouvé', HttpStatus.NOT_FOUND);
        }
        await this.livresService.remove(id);
        return { success: true, message: 'Livre supprimé avec succès' };
      } catch (error) {
        throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  