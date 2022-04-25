import { IsNotEmpty } from 'class-validator';

export class UpdateLocalDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  endereco: string;
}
