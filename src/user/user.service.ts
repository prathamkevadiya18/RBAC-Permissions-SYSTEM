import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './entity/user.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { role } from '../role/entity/role.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(user) private readonly userEntity :Repository<user>,
                @InjectRepository(role) private readonly roleEntity :Repository<role>,
                 private readonly jwtService: JwtService){}

    async create(userdata:{email:string,pass:string}){
         const slat =10;
         const hashed = await bcrypt.hash(userdata.pass,slat)

            const newuser = this.userEntity.create({ ...userdata, pass: hashed })
            return  await this.userEntity.save(newuser)
    }

    async login(email:string, pass:string){
            const logUser = await this.userEntity.findOne({
                where:{email},
                relations: ['role'],
            });

        if(!logUser){
            return {mesaage:"invaild email id"}
        }
        const vaildpass = await bcrypt.compare(pass ,logUser.pass)
        if(!vaildpass){
            return {mesaage:"invaild pass"}
        }
            const payload = {sub: logUser.id,email: logUser.email,};
            const token = this.jwtService.sign(payload);

        return {mesaage: "successful login",
                admin : logUser.email,
                accesstoken:token}
    }

    async addrole(userid:string, roleid:string){
      const up = await this.userEntity.update(userid,{ role:{ id: roleid }})
        const updatedUser = await this.userEntity.findOne({where: { id: userid },relations: ['role', 'role.permissions']});

        if (!updatedUser) {
         return { message: "User not found" };
        }

        return {message: "User update successfully",
                updateduser:{userId:updatedUser.id,role: updatedUser.role,
                             createat:updatedUser.createat,
                             updateat:updatedUser.updateat},};
    }

    async find(userid:string){
        const user =  this.userEntity.findOne({where:{id:userid},relations: ['role', 'role.permissions']})
        if (!user) {
         return { message: "User not found" };
        }
        return user;
    }
    async detail(userid:string){
     const user = await this.userEntity.findOne({where:{id:userid},relations: ['role', 'role.permissions']});
     if (!user) {
      return { message: "User not found" };
     }
     return user;
    }

}
