import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateEmpresaDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  descricao: string;

  @IsArray()
  responsavel: IResponsavelData[];
  
  @IsArray()
  locais: ILocaisData[];
}

interface IResponsavelData{
  name: string;
  telefone: string;
  endereco: string;
}

interface ILocaisData{
  name: string;
  endereco: string;
}
