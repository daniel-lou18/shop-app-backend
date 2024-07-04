import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddToWishlistDto } from './dtos/add-to-wishlist.dto';
import { WishlistsService } from './wishlists.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(private wishlistsService: WishlistsService) {}

  @Get()
  getAllWishlists() {
    return this.wishlistsService.getAllWishlists();
  }

  @Post()
  addToWishlist(@Body() body: AddToWishlistDto) {
    this.wishlistsService.addToWishlist(body.userId, body.productId);
  }
}
