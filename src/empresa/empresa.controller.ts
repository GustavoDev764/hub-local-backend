import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('api/company')
@UseGuards(AuthGuard('jwt'))
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()  
  async create(
    @Request() req,
    @Body() createEmpresaDto: CreateEmpresaDto) {
    return await this.empresaService.create(createEmpresaDto,req.user);
  }

  @Get()
  async findAll(
    @Request() req,
  ) {
    return await this.empresaService.findAll(req.user);
  }

  @Get(':id')
  async findOne(
    @Request() req,
    @Param('id') id: string
    ) {
    return await this.empresaService.findOne(+id,req.user);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return await this.empresaService.update(+id, updateEmpresaDto,req.user);
  }

  @Delete(':id')
  async remove(
    @Request() req,
    @Param('id') id: string) {
    return await this.empresaService.remove(+id,req.user);
  }
}
