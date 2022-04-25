import { IsNotEmpty } from 'class-validator';

export class CreateLocalDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  endereco: string;
}
