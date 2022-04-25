import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { IJwtPayload } from '../jwt-payload.interface';
import fileConfig from '@OrmConfig';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fileConfig.jwtsecret,
    });
  }

  async validate(payload: IJwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}