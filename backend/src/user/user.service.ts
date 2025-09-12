import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { JwtService } from "@nestjs/jwt" 
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./dto/user.dto";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import bcrypt from 'bcrypt';

export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ){}

    //Register user
    async createUser(date: UserDto): Promise<UserEntity>{
        const validate = await this.validateExists(date.email, date.phone);
        if(validate) throw new BadRequestException("El correo o telefono ya existe");
        
        const newUser = new UserEntity();
            newUser.email = date.email;
            newUser.password = await bcrypt.hash(date.password, 10);
            newUser.name = date.name;
            newUser.lastname = date.lastname;
            newUser.phone = date.phone;
            newUser.rol = date.rol;
        return this.userRepository.save(newUser);;
    }

    async validateExists(mail: string, phon: string): Promise<Boolean>{
        const validate = await this.userRepository.exists({
            where: [
                {email: mail},
                {phone: phon}
            ]
        })
        return validate;
    }

    //Login user
    async loginUser(date: UserDto){
        const user = await this.userRepository.findOne({where: {email: date.email}});
        const validatePassword = await bcrypt.compare(date.password, user?.password);
        if(!user || !validatePassword) throw new UnauthorizedException("Credenciales incorrectas");

        const payload = {sub: user.uuid_user, email: user.email};
        const token = this.jwtService.sign(payload);

        return {
            token,
            user
        }
    }
}