import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from '../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

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

    async checkpermission(userid: string, requiredPermission: string) {
        const fuser = await this.userEntity.findOne({where: { id: userid },
                                                     relations: ['role', 'role.permissions'],});
        if (!fuser) {
           throw new UnauthorizedException('User not found');
        }
        const hasPermission = fuser.role?.permissions?.some(
            (p) => p.permission.trim().toLowerCase() === requiredPermission.trim().toLowerCase(),
        );
        if (!hasPermission) {
            throw new ForbiddenException('Permission denied');
        }
        return true;
    }

    async checkRequestPermission(authorization: string, request: Request) {
        const token = this.verifyBearerToken(authorization);
        const userid = token.sub ?? token.email;
        const requiredPermission = `${request.method}:${request.route?.path ?? request.path}`;
        
        return this.checkpermission(userid, requiredPermission);
    }

    
}
