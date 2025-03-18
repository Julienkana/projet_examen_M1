import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuteurDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsNotEmpty()
  @IsString()
  biographie: string;
}
