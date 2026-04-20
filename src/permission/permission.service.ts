import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entity/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly permissionEntity :Repository<Permission>){}

    async create(permission:string){
        const pdata = this.permissionEntity.create({permission}) 
        return await this.permissionEntity.save(pdata)
    }
}
