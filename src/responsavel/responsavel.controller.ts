import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponsavelService } from './responsavel.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';

@Controller('api/responsavel')
export class ResponsavelController {
  constructor(private readonly responsavelService: ResponsavelService) {}

  @Post()
  async create(@Body() createResponsavelDto: CreateResponsavelDto) {
    return await this.responsavelService.create(createResponsavelDto);
  }

  @Get()
  async findAll() {
    return await this.responsavelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.responsavelService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateResponsavelDto: UpdateResponsavelDto) {
    return await this.responsavelService.update(+id, updateResponsavelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.responsavelService.remove(+id);
  }
}
