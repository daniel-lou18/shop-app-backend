import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('text')
  productIds: string;
}
