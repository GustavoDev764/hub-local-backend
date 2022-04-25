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
import { UserEntity } from '@App/users/entities/user.entity';
import { LocalEntity } from '@App/local/entities/local.entity';

@Entity('ticket')
export class TicketEntity extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @ManyToOne(() => LocalEntity, local => local.ticket)
  local: LocalEntity;

  @ManyToOne(() => UserEntity, user => user.ticketCreated)
  userCreated: UserEntity;  
  
  @ManyToOne(() => UserEntity, user => user.ticketAttendant)
  userAttendant: UserEntity;

  @Column({
    type: 'enum',
    enum: ['PEDENTE', 'PROGRESSO', 'CONCLUIDO'],
    default: 'PEDENTE',
    nullable: false,
  })
  status: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
