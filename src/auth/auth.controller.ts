import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User signed up successfully' })
  signUp(@Body() signup: CreateUserDto): Promise<string> {
    return this.authService.signUp(signup);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'user logged in successfully' })
  login(@Body() login: loginDto): Promise<string> {
    return this.authService.login(login);
  }
}
