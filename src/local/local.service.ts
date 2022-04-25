import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { LocalEntity } from './entities/local.entity';
import { LocalRepository } from './local.repository';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(LocalRepository)
    private readonly _localRepository: LocalRepository,
  ) {}

  async create(createLocalDto: CreateLocalDto) {
    const savedData: LocalEntity = await this._localRepository.save(createLocalDto);
    return savedData;
  }

  async findAll() {
    return await this._localRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this._localRepository.findOneOrFail(id);
    } catch (error) {     
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateLocalDto: UpdateLocalDto) {
    try {
      const data = await this._localRepository.findOneOrFail(id);
      this._localRepository.merge(data, updateLocalDto);
      return await this._localRepository.save(data);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this._localRepository.findOneOrFail(id);
      this._localRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
