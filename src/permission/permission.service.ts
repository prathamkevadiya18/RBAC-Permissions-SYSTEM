import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly permissionEntity :Repository<Permission>){}

    async create(per:{permission:string}){
        const pdata = this.permissionEntity.create(per) 
        return await this.permissionEntity.save(pdata)
    }

    // async del(pid:string){
    //     return this.permissionEntity.delete(pid)
    // }
}
