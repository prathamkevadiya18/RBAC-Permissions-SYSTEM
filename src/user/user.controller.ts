import { Controller, Post ,Body, Headers, Put, Param, Get, Req, } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthMiddleware } from '../auth/auth.middleware';
import type { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(
      private readonly UserService :UserService,
      private readonly authMiddleware: AuthMiddleware,
    ){}

   @Post('add')
   adduser(@Body()userdata:{email:string,pass:string},@Headers('authorization') authorization: string,){
    this.authMiddleware.verifyBearerToken(authorization);
    return this.UserService.create(userdata)
   } 

   @Post('log')
   log(@Body() admin:{email:string,pass:string}){
    return this.UserService.login(admin.email,admin.pass);
  }
   
  @Put('addrole/:id')
    addrol(@Param('id') userid:string,@Body('roleid') roleid:string){
     return this.UserService.addrole(userid,roleid)
   }

   @Get('/get/detail')
   async check(@Headers('authorization') authorization: string, @Req() request: Request){
    //await this.authMiddleware.checkRequestPermission(authorization, request);
    //return this.UserService.detail()
    const userid = await this.authMiddleware.checkRequestPermission(authorization, request);
    return this.UserService.detail(userid)
    
   }

   @Get('/:id')
   get(@Param('id') userid:string){
     return this.UserService.find(userid)
   }
}
