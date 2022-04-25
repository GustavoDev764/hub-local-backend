import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@App/users/dto/create-user.dto';
import { UpdateUserDto } from '@App/users/dto/update-user.dto';
import { UserEntity } from '@App/users/entities/user.entity';
import { UserRepository } from '@App/users/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async create({ name, email, password }: CreateUserDto) {
    const res = await this._userRepository.findOne({where: {email: email} });
    if(res && res.id){
      throw new BadRequestException('The email already exists');
    }

    const passwordCrypt = await this._userRepository.cryptPassword(password);

    const savedUser: UserEntity = await this._userRepository.save({
      name,
      email,
      password: passwordCrypt,
    });

    return savedUser;
  }

  async findAll() {
    return await this._userRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this._userRepository.findOneOrFail(id);
    } catch (error) {     
      throw new NotFoundException(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let res = null;
    try {
      res = await this._userRepository.findOne({where: {email: updateUserDto.email} });
    } catch (error) {
      throw new NotFoundException(error.message);
    }

    //verifica se o email não esta sendo utilizando por outro usuario
    if(res && `${res.id}` === `${id}`){
      const user = await this._userRepository.findOneOrFail(id);

      //verifica se existe password
      if (updateUserDto.password) {
        const passwordCrypt = await this._userRepository.cryptPassword(
          updateUserDto.password,
        );

        updateUserDto = { ...updateUserDto, password: passwordCrypt };
      }
      this._userRepository.merge(user, updateUserDto);
      return await this._userRepository.save(user);
    }else{
      throw new BadRequestException('The email already exists');
    }
  }

  async remove(id: number) {
    try {
      await this._userRepository.findOneOrFail(id);
      this._userRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
