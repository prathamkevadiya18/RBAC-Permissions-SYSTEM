import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { user } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from '../auth/auth.middleware';
import { role } from '../role/entity/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([user, role],),
           JwtModule.register({secret: 'abcd',})
          ],
  providers: [UserService, AuthMiddleware],
  controllers: [UserController]
})
export class UserModule {}
