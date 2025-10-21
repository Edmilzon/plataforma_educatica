import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { GoogleAuthDto } from "./dto/google-auth.dto";
import { UserEntity } from "src/user/entity/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}
    
    async login(data: AuthDto){
        const user = await this.userService.search_email(data.email);

        if(!user || !user.password || !(await bcrypt.compare(data.password, user.password))){
            throw new UnauthorizedException('Credenciales incorrectas ')
        }
        
        return this.generateTokenAndUserResponse(user);
    }

    async signInWithGoogle(googleUser: GoogleAuthDto) {
        if (!googleUser || !googleUser.email) {
            throw new BadRequestException('No se recibió información del usuario de Google.');
        }

        let user = await this.userService.search_email(googleUser.email);

        if (!user) {
            const newUser = new UserEntity();
            newUser.email = googleUser.email;
            newUser.name = googleUser.name;
            newUser.lastname = googleUser.lastname;
            user = await this.userService.userRepository.save(newUser);
        }

        return this.generateTokenAndUserResponse(user);
    }

    private generateTokenAndUserResponse(user: UserEntity) {
        const payload = { sub: user.uuid_user, email: user.email };
        const token = this.jwtService.sign(payload);
        const { password, ...userWithoutPassword } = user;

        return { token, user: userWithoutPassword };
    }
}