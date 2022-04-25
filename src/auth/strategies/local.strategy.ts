import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authServices: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email:string,password:string) {
    const user = await this.authServices.validateUser(email,password)
    
    if(!user){
      throw new UnauthorizedException('invalid credentials');      
    }

    return user;
  }
}