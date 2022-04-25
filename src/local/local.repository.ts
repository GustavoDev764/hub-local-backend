/* eslint-disable @typescript-eslint/ban-types */
import { Repository, EntityRepository } from 'typeorm';
import { LocalEntity } from '@App/local/entities/local.entity';

@EntityRepository(LocalEntity)
export class LocalRepository extends Repository<LocalEntity> {
  async findAll() {
    return this.findAll();
  } 
}
