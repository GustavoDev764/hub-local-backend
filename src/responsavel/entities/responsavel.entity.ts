import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { EmpresaEntity } from '@App/empresa/entities/empresa.entity';
import { LocalEntity } from '@App/local/entities/local.entity';

@Entity('responsavel')
export class ResponsavelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;
 
  @Column({ type: 'varchar', nullable: false })
  telefone: string;
  
  @Column({ type: 'varchar', nullable: true })
  endereco: string;

  @ManyToOne(() => EmpresaEntity, empresa => empresa.responsavel)
  empresas: EmpresaEntity;

  @ManyToOne(() => LocalEntity, local => local.responsavel)
  local: LocalEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
