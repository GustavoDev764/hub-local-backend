import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {JwtService} from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { IJwtPayload } from './jwt-payload.interface';
import { UserEntity } from '@App/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ){}

  async login(user:UserEntity){
    const payload:IJwtPayload = {sub: user.id, email: user.email};

    return {
      token: this._jwtService.sign(payload),
      user,
    }
  }

  async validateUser(email:string, password:string){
    try {
      
      const user = await this._authRepository.findOneOrFail({email});
      
      const isMatch = await this._authRepository.comparePassword(password,user.password);
      
      if (!isMatch) {
        return null;
      }

      return user;
      
    } catch (error) {
      console.log('validateUser: ',error.message);
      return null;
    } 
      
  }
}
