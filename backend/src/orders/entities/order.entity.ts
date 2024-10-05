import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  fullName: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'integer' })
  prepayment: number;

  @Column({ type: 'text' })
  passportSeries: string;

  @Column({ type: 'text' })
  phone1: string;

  @Column({ type: 'text' })
  phone2: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column('text', { nullable: true, array: true })
  images: string[];

  @CreateDateColumn()
  createdAt: number;
}
