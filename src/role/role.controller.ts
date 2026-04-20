import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private readonly RoleService : RoleService){}

    @Post('/addrole')
    addrole(@Body() roledata:{name:string,status:boolean}){
       return this.RoleService.create(roledata)
    }
}
