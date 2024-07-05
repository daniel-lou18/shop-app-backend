import { IsString } from 'class-validator';

export class EditWishlist {
  @IsString()
  userId: string;

  @IsString()
  productId: string;
}
