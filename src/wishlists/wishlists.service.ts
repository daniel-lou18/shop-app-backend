import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(@InjectRepository(Wishlist) private repo: Repository<Wishlist>) {}

  getAllWishlists() {
    return this.repo.find();
  }

  getWishlist(userId: string) {
    return this.repo.findOneBy({ userId });
  }

  async addToWishlist(userId: string, productId: string) {
    const wishlist = await this.getWishlist(userId);

    if (!wishlist) {
      return this.createWishlist(userId, productId);
    } else {
      return this.insertIntoWishlist(wishlist, productId);
    }
  }

  async deleteFromWishlist(userId: string, productId: string) {
    const wishlist = await this.getWishlist(userId);
    const arrayMethod = (productIds: string[], productId: string) =>
      productIds.filter((id) => id !== productId);

    if (!wishlist) {
      throw new NotFoundException(
        "Aucune liste appartenant à cet utilisateur n'a été retrouvée",
      );
    }

    return this.editWishlist(wishlist, productId, {
      arrayMethod,
      type: 'includes',
      errorMessage: 'Aucun produit correspond à cet ID',
    });
  }

  private createWishlist(userId: string, productId: string) {
    const wishlist = this.repo.create({
      userId,
      productIds: JSON.stringify([productId]),
    });

    return this.repo.save(wishlist);
  }

  private insertIntoWishlist(wishlist: Wishlist, productId: string) {
    const arrayMethod = (productIds: string[], productId: string) => [
      ...productIds,
      productId,
    ];

    return this.editWishlist(wishlist, productId, {
      arrayMethod,
      type: 'doesNotInclude',
      errorMessage: 'Le produit est déjà dans la liste de souhaits',
    });
  }

  private editWishlist(
    wishlist: Wishlist,
    productId: string,
    options: {
      arrayMethod: (productIds: string[], productId: string) => string[];
      type: 'includes' | 'doesNotInclude';
      errorMessage: string;
    },
  ) {
    const productIds: string[] = JSON.parse(wishlist.productIds);
    const condition =
      (options.type === 'doesNotInclude' && !productIds.includes(productId)) ||
      (options.type === 'includes' && productIds.includes(productId));

    if (condition) {
      const updatedProductIds = options.arrayMethod(productIds, productId);
      wishlist.productIds = JSON.stringify(updatedProductIds);
      return this.repo.save(wishlist);
    } else {
      throw new NotFoundException(options.errorMessage);
    }
  }

  clearAllWishlists() {
    return this.repo.clear();
  }
}
