import { Body, Controller,Post } from '@nestjs/common';
import { PermissionService } from './permission.service';


@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService:PermissionService){}
    
    @Post()
    addper(@Body() permission:string){
      return this.permissionService.create(permission);
    }
}
