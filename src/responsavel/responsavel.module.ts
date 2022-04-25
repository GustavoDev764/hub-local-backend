import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsavelService } from './responsavel.service';
import { ResponsavelController } from './responsavel.controller';
import { ResponsavelRepository } from './responsavel.repository';
import { ResponsavelEntity } from './entities/responsavel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResponsavelRepository])],
  controllers: [ResponsavelController],
  providers: [ResponsavelService, ResponsavelEntity]
})
export class ResponsavelModule {}
