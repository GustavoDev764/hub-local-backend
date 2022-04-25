import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParamsUserDto } from './dto/params-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param() data: ParamsUserDto) {
    return await this.usersService.findOne(data.id);
  }

  @Patch(':id')
  async update(@Param() data: ParamsUserDto, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(data.id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() data: ParamsUserDto) {
    return await this.usersService.remove(data.id);
  }
}
