import { Repository, EntityRepository } from 'typeorm';
import { compare, hash, genSalt  } from 'bcryptjs';
import { UserEntity } from '@App/users/entities/user.entity';

@EntityRepository(UserEntity)
export class AuthRepository extends Repository<UserEntity> {
  async cryptPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  async comparePassword(password: string, passwordCrypt: string) {
    return await compare(password, passwordCrypt);
  }  
}
