import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './user/entity/user.entity';
import { RoleModule } from './role/role.module';
import { role } from './role/entity/role.entity';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/entity/permission.entity';

@Module({
  imports: [UserModule,
            TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'Pratham@21',
            database: 'fullapp',
            entities: [user,role,Permission],
            synchronize: true,
          }),
            RoleModule,
            PermissionModule,
        ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
