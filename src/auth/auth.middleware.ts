import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { Permission } from '../permission/entity/permission.entity';
import { user } from '../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware {
    
    constructor(private readonly jwtService: JwtService,
                @InjectRepository(user) private readonly userEntity : Repository<user>) {}

    verifyBearerToken(authorization: string) {
        if (!authorization || !authorization.startsWith('Bearer ')) {
            throw new UnauthorizedException('Bearer token missing');
        }
        const token = authorization.split(' ')[1];
        try {
            return this.jwtService.verify(token, { secret: 'abcd' });
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

//   async checkpermission(userid:string){
//     const fuser = await this.userEntity.findOne({where:{id:userid},relations: ['role', 'role.permissions']})
//     if(!fuser){
//         return {message:"user not found"}
//     }
    

//    }

    
}
