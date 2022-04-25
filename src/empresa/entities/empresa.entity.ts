import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {UserEntity} from '@App/users/entities/user.entity';
import { ResponsavelEntity } from '@App/responsavel/entities/responsavel.entity';
import { LocalEntity } from '@App/local/entities/local.entity';

@Entity('empresa')
export class EmpresaEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;
  
  @Column({ type: 'varchar', nullable: false })
  cnpj: string;
  
  @Column({ type: 'varchar', nullable: true })
  descricao: string;

  @ManyToOne(() => UserEntity, user => user.empresas,{eager: true})
  user: UserEntity;
  
  @OneToMany(() => ResponsavelEntity, responsavel => responsavel.empresas, {eager: true})
  responsavel: ResponsavelEntity[];
  
  @OneToMany(() => LocalEntity, local => local.empresas, {eager: true})
  locais: LocalEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
