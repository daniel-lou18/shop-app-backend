import { IsString, Length } from 'class-validator';

export class EditWishlistParams {
  @Length(3)
  @IsString()
  userId: string;
}
