import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as slugify from 'slug';

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
  generateSlug() {
    this.slug = slugify(this.title, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

}
