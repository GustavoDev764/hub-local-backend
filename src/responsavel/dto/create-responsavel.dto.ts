import { IsNotEmpty } from 'class-validator';

export class CreateResponsavelDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  telefone: string;
  
  @IsNotEmpty()
  endereco: string;
}
