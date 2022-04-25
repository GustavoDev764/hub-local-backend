import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalService } from './local.service';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';

@Controller('api/local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post()
  async create(@Body() createLocalDto: CreateLocalDto) {
    return await this.localService.create(createLocalDto);
  }

  @Get()
  async findAll() {
    return await this.localService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.localService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
    return await this.localService.update(+id, updateLocalDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.localService.remove(+id);
  }
}
