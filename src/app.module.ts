import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmpresaModule } from './empresa/empresa.module';
import { LocalModule } from './local/local.module';
import { ResponsavelModule } from './responsavel/responsavel.module';
import { TicketModule } from './ticket/ticket.module';
import fileConfig from '@OrmConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(), 
    AuthModule, 
    UsersModule,
    EmpresaModule, 
    LocalModule, 
    ResponsavelModule, TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;
  constructor() {
    AppModule.port = fileConfig.portserve;
  }
}
