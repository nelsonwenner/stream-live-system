import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum LiveStatus {PENDING = 'pending', DONE = 'done'}

@Entity('lives')
export class Live {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  password: string;

  @Column()
  status: LiveStatus = LiveStatus.PENDING;

  @CreateDateColumn({type: "timestamp"})
  created_at: Date;

  @CreateDateColumn({type: "timestamp"})
  update_at: Date;
}
