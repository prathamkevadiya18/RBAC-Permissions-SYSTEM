import { Body, Controller, Post, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { role } from './entity/role.entity';

@Controller('role')
export class RoleController {
    constructor(private readonly RoleService : RoleService){}

    @Post('/addrole')
    addrole(@Body() roledata:{name:string,status:boolean}){
       return this.RoleService.create(roledata)
    }

    @Post(':rolename')
    addpermission(@Param('rolename') rolename: string,@Body() body: {permissionIds: string[]} ){
      return this.RoleService.addpermision(rolename, body.permissionIds);
    }
}
