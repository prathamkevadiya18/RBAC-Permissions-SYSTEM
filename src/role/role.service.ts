import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { role } from './entity/role.entity';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(role) private readonly roleEntity :Repository<role>){}

   async create(roleData:{name:string,status:boolean}){
       const role = this.roleEntity.create(roleData);
       return await this.roleEntity.save(role);
    }
}
