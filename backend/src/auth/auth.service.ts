import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}
    
    async login(data: AuthDto){
        const user = await this.userService.search_email(data.email);
        if(!user || !(await bcrypt.compare(data.password, user.password))){
            throw new UnauthorizedException('Credenciales incorrectas ')
        }
        
        const payload = { sub: user.uuid_user, email: user.email };
        const token = this.jwtService.sign(payload);
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;

        return{
            token,
            user: userWithoutPassword
        }
    }
}