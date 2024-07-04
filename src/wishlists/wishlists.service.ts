import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(@InjectRepository(Wishlist) private repo: Repository<Wishlist>) {}

  async getAllWishlists() {
    const wishlists = await this.repo.find();
    return wishlists;
  }

  async addToWishlist(userId: string, productId: string) {
    const wishlist = await this.repo.findOne({ where: { userId } });

    if (!wishlist) {
      await this.createWishlist(userId, productId);
    } else {
      const productIds: string[] = JSON.parse(wishlist.productIds);
      if (!productIds.includes(productId)) {
        productIds.push(productId);
        wishlist.productIds = JSON.stringify(productIds);
        await this.repo.save(wishlist);
      } else {
        throw new Error('Le produit est déjà dans votre liste de souhaits');
      }
    }
  }

  async createWishlist(userId: string, productId: string) {
    const wishlist = this.repo.create({
      id: Math.floor(Math.random() * 999),
      userId,
      productIds: JSON.stringify([productId]),
    });
    await this.repo.save(wishlist);
  }
}
