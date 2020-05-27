import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({name: 'chat_messages'})
export class ChatMessageEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  content: string;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column()
  live_slug: string;

  @Column()
  is_broadcaster: boolean;
  
  @CreateDateColumn({type: "timestamp"})
  created_at: Date;
}
