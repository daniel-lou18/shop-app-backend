import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { EditWishlistParams } from './dtos/EditWishlistParams';
import { EditWishlistQuery } from './dtos/EditWishlistQuery';

@Controller('wishlists')
export class WishlistsController {
  constructor(private wishlistsService: WishlistsService) {}

  @Get()
  getAllWishlists() {
    return this.wishlistsService.getAllWishlists();
  }

  @Get('/:userId')
  async getWishlist(@Param() params: EditWishlistParams) {
    const wishlist = await this.wishlistsService.getWishlist(params.userId);

    if (!wishlist) {
      throw new NotFoundException(
        "Nous n'avons pas trouvé de liste appartenant à cet utilisateur",
      );
    }

    return wishlist;
  }

  @Post('/:userId')
  addToWishlist(
    @Param() params: EditWishlistParams,
    @Query() query: EditWishlistQuery,
  ) {
    return this.wishlistsService.addToWishlist(params.userId, query.productId);
  }

  @Delete('/:userId')
  deleteFromWishlist(
    @Param() params: EditWishlistParams,
    @Query() query: EditWishlistQuery,
  ) {
    return this.wishlistsService.deleteFromWishlist(
      params.userId,
      query.productId,
    );
  }

  @Delete('clear')
  clearAllWishlists() {
    return this.wishlistsService.clearAllWishlists();
  }
}
