import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { EmpresaRepository } from './empresa.repository';
import { EmpresaEntity } from './entities/empresa.entity';
import { UsersModule } from '@App/users/users.module';
import { UsersService } from '@App/users/users.service';
import { UserRepository } from '@App/users/user.repository';
import { LocalRepository } from '@App/local/local.repository';
import { ResponsavelRepository } from '@App/responsavel/responsavel.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmpresaRepository, 
      UserRepository,
      ResponsavelRepository,
      LocalRepository
    ]),       
  ],
  controllers: [EmpresaController],
  providers: [EmpresaService, EmpresaEntity]
})
export class EmpresaModule {}
