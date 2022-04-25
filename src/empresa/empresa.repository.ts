/* eslint-disable @typescript-eslint/ban-types */
import { Repository, EntityRepository } from 'typeorm';
import { EmpresaEntity } from '@App/empresa/entities/empresa.entity';

@EntityRepository(EmpresaEntity)
export class EmpresaRepository extends Repository<EmpresaEntity> {
  async findAll() {
    return this.findAll();
  } 
}
