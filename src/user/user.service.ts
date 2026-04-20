import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './entity/user.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectRepository(user) private readonly userEntity :Repository<user>,
                 private readonly jwtService: JwtService){}

    async create(userdata:{email:string,pass:string}){
         const slat =10;
         const hashed = await bcrypt.hash(userdata.pass,slat)

            const newuser = this.userEntity.create({ ...userdata, pass: hashed })
            return  await this.userEntity.save(newuser)
    }

    async login(email:string, pass:string){
        const admin = await this.userEntity.findOne({where:{email}});

        if(!admin){
            return {mesaage:"invaild email id"}
        }
        const vaildpass = await bcrypt.compare(pass ,admin.pass)
        if(!vaildpass){
            return {mesaage:"invaild pass"}
        }
        const playlod = {email:admin.email}
        const token = this.jwtService.sign(playlod);

        return {mesaage: "superadmin successful login",
                admin : admin.email,
                accesstoken:token}
    }

}
