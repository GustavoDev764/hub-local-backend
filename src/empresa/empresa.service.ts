import { LocalRepository } from '@App/local/local.repository';
import { ResponsavelRepository } from '@App/responsavel/responsavel.repository';
import { UserRepository } from '@App/users/user.repository';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresaRepository } from './empresa.repository';
import { EmpresaEntity } from './entities/empresa.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(EmpresaRepository)
    private readonly _empresaRepository: EmpresaRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(ResponsavelRepository)
    private readonly _responsavelRepository: ResponsavelRepository,
    @InjectRepository(LocalRepository)
    private readonly _localRepository: LocalRepository,
  ) {}

  async create({name,cnpj,descricao, ...rest}: CreateEmpresaDto, data: any) {

    const user = await this._userRepository.findOneOrFail(data.id);

    const res = await this._empresaRepository.findOne({where: {cnpj: cnpj} });
    if(res && res.id){
      throw new BadRequestException('The company already exists');
    }    
   
    let savedData: EmpresaEntity = await this._empresaRepository.save({
      name,
      cnpj,
      descricao,
      user,      
    });

    const resp:any[] = [];
    await Promise.all(rest.responsavel.map(async (ele) => {
      const item = await this._responsavelRepository.save({...ele, empresas: savedData });
      resp.push(item);      
    }));
   
    const loc:any[] = [];
    await Promise.all(rest.locais.map(async (ele) => {
      const item = await this._localRepository.save({...ele, empresas: savedData });
      loc.push(item);
    }));

    savedData = await this._empresaRepository.save({
      ...savedData,
      responsavel: resp,
      locais: loc,
    });
   

    return savedData;
  }

  async findAll(data: any) {
    return await this._empresaRepository.find({where:{user: {id: data.id}}});
  }

  async findOne(id: number,data: any) {
    try {     
      const res = await this._empresaRepository.findOneOrFail(id);
      if(`${res?.user?.id}` === `${data?.id}`){
        return res;
      }
      throw new NotFoundException('company not found!');
    } catch (error) {     
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto,data: any) {
    let res = null;
    try {
      res = await this._empresaRepository.findOneOrFail({where: {cnpj: updateEmpresaDto.cnpj} });      
    } catch (error) {     
      //throw new NotFoundException(error.message);
    }    

    //verifica se o cnpj não esta sendo utilizando por outra empresa
    if(res === null || `${res.id}` === `${id}`){
      const dataEm = await this._empresaRepository.findOneOrFail(id);

      if(`${res?.user?.id}` === `${data?.id}`){
        this._empresaRepository.merge(dataEm, updateEmpresaDto);
        return await this._empresaRepository.save(dataEm);
      }

      throw new NotFoundException('company not found!');
      
    }else{
      throw new BadRequestException('The company already exists');
    }        
  }

  async remove(id: number,data: any) {
    try {
      const res =await this._empresaRepository.findOneOrFail(id);

      if(`${res?.user?.id}` === `${data?.id}`){
        this._empresaRepository.softDelete({ id });        
      }else{
        throw new NotFoundException('company not found!');
      }
      
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
