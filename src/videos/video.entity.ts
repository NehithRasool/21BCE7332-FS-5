import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  url!: string;

  @Column()
  userId!: number;

  @CreateDateColumn()
  uploadedAt!: Date;

  // Add missing properties
  @Column({ nullable: true }) // Nullable to handle old data
  duration?: number;

  @Column({ nullable: true })
  format?: string;
}
