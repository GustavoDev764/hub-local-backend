/* eslint-disable @typescript-eslint/ban-types */
import { Repository, EntityRepository } from 'typeorm';
import { ResponsavelEntity } from '@App/responsavel/entities/responsavel.entity';

@EntityRepository(ResponsavelEntity)
export class ResponsavelRepository extends Repository<ResponsavelEntity> {
  async findAll() {
    return this.findAll();
  }
}
