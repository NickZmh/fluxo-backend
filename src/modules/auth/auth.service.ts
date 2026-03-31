import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email.toLowerCase());

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: await this.jwt.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }

  async register({ email, password, firstName, lastName }: CreateUserDto) {
    const normalizedEmail = email.toLowerCase();

    const existingUser = await this.userService.findByEmail(normalizedEmail);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userService.create({
      email: normalizedEmail,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return {
      message: 'User created successfully',
    };
  }
}
