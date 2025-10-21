
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { GoogleAuthDto } from "./dto/google-auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() data: AuthDto){
        return this.authService.login(data)
    }

    @Post('google/signin')
    async googleSignIn(@Body() data: GoogleAuthDto) {
        return this.authService.signInWithGoogle(data);
    }
}