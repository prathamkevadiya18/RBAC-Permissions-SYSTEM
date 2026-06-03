import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/entity/permission.entity';
import { RoleModule } from './role/role.module';
import { role } from './role/entity/role.entity';
import { UserModule } from './user/user.module';
import { user } from './user/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [user, role, Permission],
        synchronize: configService.get<string>('DB_SYNC') === 'true',
      }),
    }),
    UserModule,
    RoleModule,
    PermissionModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
