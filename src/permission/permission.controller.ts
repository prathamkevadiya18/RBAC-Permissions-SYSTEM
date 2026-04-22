import { Body, Controller,Delete,Param,Post } from '@nestjs/common';
import { PermissionService } from './permission.service';


@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService:PermissionService){}
    
    @Post()
    addper(@Body() per:{permission:string}){
      return this.permissionService.create(per);
    }

    // @Delete('del/:id')
    //   delete(@Param('id') pid:string){
    //       return this.permissionService.del(pid);
    //   }
    
}
