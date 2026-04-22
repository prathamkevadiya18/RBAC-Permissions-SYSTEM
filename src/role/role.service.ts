import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { role } from './entity/role.entity';
import { Permission } from '../permission/entity/permission.entity';

@Injectable()
export class RoleService {
    constructor(
      @InjectRepository(role) private readonly roleEntity :Repository<role>,
      @InjectRepository(Permission) private readonly permissionEntity: Repository<Permission>,
    ){}

   async create(roleData:{name:string,status:boolean}){
       const role = this.roleEntity.create(roleData);
       return await this.roleEntity.save(role);
    }

    async addpermision(rolename: string, permissionIds: string[]) {
        const Role = await this.roleEntity.findOne({where: { name: rolename },
                                                    relations: ['permissions']});
        if (!Role) {
          return { message: 'Role not found' };
        }
        const permissions = await this.permissionEntity.findBy({id: In(permissionIds)});
        if (permissions.length === 0) {
          return { message: 'No permissions found' };
        }
        Role.permissions = permissions;
        const updatedRole = await this.roleEntity.save(Role);
        return {
          message: 'Permissions added to role successfully',
          role: updatedRole
        };
    }

    // async updatepermision(rolename: string, permissionIds: string[]) {
    //     const Role = await this.roleEntity.findOne({where: { name: rolename },
    //                                                 relations: ['permissions']});
    //     if (!Role) {
    //       return { message: 'Role not found' };
    //     }
    //     const permissions = await this.permissionEntity.findBy({id: In(permissionIds)});
    //     if (permissions.length === 0) {
    //       return { message: 'No permissions found' };
    //     }
    //     Role.permissions = permissions;
    //     const updatedRole = await this.roleEntity.update(Role);
    //     return {
    //       message: 'Permissions added to role successfully',
    //       role: updatedRole
    //     };
    // }



}
