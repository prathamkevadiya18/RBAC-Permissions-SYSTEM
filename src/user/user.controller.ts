import { Controller, Post ,Body, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthMiddleware } from '../auth/auth.middleware';

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
}
