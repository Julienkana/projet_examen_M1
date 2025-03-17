import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Livre } from 'src/livres/entities/livre/livre';

@Entity()
export class Auteur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  photo: string;

  @Column('text')
  biographie: string;

  @OneToMany(() => Livre, livre => livre.auteur)
  livres: Livre[];
}
