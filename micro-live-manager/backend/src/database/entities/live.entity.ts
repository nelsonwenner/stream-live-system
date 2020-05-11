import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

export enum LiveStatus {PENDING = 'pending', DONE = 'done'}

@Entity('lives')
export class LiveEntity {

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

  @BeforeInsert()
  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
  }
  
  async comparePassword(attempt: string) {
      return await bcrypt.compare(attempt, this.password);
  }

}
