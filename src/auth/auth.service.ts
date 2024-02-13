import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userSvc: UsersService,
    private jwtSvc: JwtService,
  ) {}

  async signUp(signupDto: CreateUserDto): Promise<string> {
    try {
      const { email } = signupDto;

      const existingUser = await this.userSvc.findOne(email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const user = await this.userSvc.create(signupDto);

      const token = this.jwtSvc.signAsync({ id: user.role, email: user.email });
      return token;
    } catch (error) {
      console.error('Error during sign-up:', error);
      throw error;
    }
  }
  async login(loginDto: loginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.userSvc.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtSvc.signAsync({ id: user.role, email: user.email });

    return token;
  }
}
