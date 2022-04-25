import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalService } from './local.service';
import { LocalController } from './local.controller';
import { LocalRepository } from './local.repository';
import { LocalEntity } from './entities/local.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocalRepository])],
  controllers: [LocalController],
  providers: [LocalService, LocalEntity]
})
export class LocalModule {}
