import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { ResponsavelEntity } from './entities/responsavel.entity';
import { ResponsavelRepository } from './responsavel.repository';

@Injectable()
export class ResponsavelService {
  constructor(
    @InjectRepository(ResponsavelRepository)
    private readonly _responsavelRepository: ResponsavelRepository,
  ) {}
  
  async create(createResponsavelDto: CreateResponsavelDto) {
    const savedData: ResponsavelEntity = await this._responsavelRepository.save(createResponsavelDto);
    return savedData;
  }

  async findAll() {
    return await this._responsavelRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this._responsavelRepository.findOneOrFail(id);
    } catch (error) {     
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateResponsavelDto: UpdateResponsavelDto) {
    try {
      const data = await this._responsavelRepository.findOneOrFail(id);
      this._responsavelRepository.merge(data, updateResponsavelDto);
      return await this._responsavelRepository.save(data);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this._responsavelRepository.findOneOrFail(id);
      this._responsavelRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
