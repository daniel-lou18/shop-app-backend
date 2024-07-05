import { IsString } from 'class-validator';

export class EditWishlistQuery {
  @IsString()
  productId: string;
}
