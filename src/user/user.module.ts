import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { user } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([user],),
           JwtModule.register({secret: 'abcd',})
          ],
  providers: [UserService, AuthMiddleware],
  controllers: [UserController]
})
export class UserModule {}
