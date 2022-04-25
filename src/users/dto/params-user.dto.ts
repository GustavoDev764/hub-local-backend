import { IsNotEmpty } from 'class-validator';

export class ParamsUserDto {
  @IsNotEmpty()
  id: number;
}
