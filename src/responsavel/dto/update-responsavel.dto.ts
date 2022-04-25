import { IsNotEmpty } from 'class-validator';

export class UpdateResponsavelDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  telefone: string;
  
  @IsNotEmpty()
  endereco: string;
}
