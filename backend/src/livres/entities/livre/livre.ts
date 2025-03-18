import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Auteur } from 'src/auteurs/entities/auteur/auteur';

@Entity()
export class Livre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  anneePublication: number;

  @Column()
  prix: number;

  @ManyToOne(() => Auteur, auteur => auteur.livres)
  @JoinColumn({ name: 'auteur_id' })
  auteur: Auteur;
}
