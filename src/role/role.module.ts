import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { role } from './entity/role.entity';
import { Permission } from '../permission/entity/permission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([role, Permission])],
  providers: [RoleService],
  controllers: [RoleController]
})
export class RoleModule {}
