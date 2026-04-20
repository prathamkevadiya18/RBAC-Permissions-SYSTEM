import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
//import { role } from '../role/entity/role.entity';

@Injectable()
export class AuthMiddleware {
    constructor(
        private readonly jwtService: JwtService) {}

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

    
}
