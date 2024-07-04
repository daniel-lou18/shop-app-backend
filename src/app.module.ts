import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WishlistsModule } from './wishlists/wishlists.module';
import { Wishlist } from './wishlists/wishlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Wishlist],
      synchronize: true,
    }),
    WishlistsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
