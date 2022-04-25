import { EmpresaEntity } from '@App/empresa/entities/empresa.entity';
import { ResponsavelEntity } from '@App/responsavel/entities/responsavel.entity';
import { TicketEntity } from '@App/ticket/entities/ticket.entity';
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

@Entity('local')
export class LocalEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;
  
  @Column({ type: 'varchar', nullable: true })
  endereco: string;

  @ManyToOne(() => EmpresaEntity, empresa => empresa.responsavel)
  empresas: EmpresaEntity;

  @OneToMany(() => ResponsavelEntity, responsavel => responsavel.local, {eager: true})
  responsavel: ResponsavelEntity[];
  
  @OneToMany(() => TicketEntity, ticket => ticket.local, {eager: true})
  ticket: TicketEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
