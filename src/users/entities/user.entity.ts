import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import {EmpresaEntity} from '@App/empresa/entities/empresa.entity';
import { TicketEntity } from '@App/ticket/entities/ticket.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => EmpresaEntity, empresa => empresa.user)
  empresas: EmpresaEntity[];

  @OneToMany(() => TicketEntity, ticket => ticket.userCreated, {eager: false})
  ticketCreated: TicketEntity[];
  
  @OneToMany(() => TicketEntity, ticket => ticket.userAttendant, {eager: false})
  ticketAttendant: TicketEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
