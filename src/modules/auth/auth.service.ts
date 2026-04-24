import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcrypt';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UsersService,
  ) {}

  async validateGoogleUser(profile: Profile) {
    const email = profile.emails?.[0]?.value;
    const name = profile.name?.givenName ?? '';
    const surname = profile.name?.familyName ?? '';

    if (!email) {
      throw new Error('Google profile does not contain an email');
    }

    return this.userService.findOrCreateGoogleUser(email, name, surname);
  }

  async loginWithGoogle(user: { id: string; email: string }) {
    return {
      access_token: await this.jwt.signAsync({
        id: user.id,
        email: user.email,
      }),
    };
  }

  async login({ email, password }: LoginUserDto) {
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
        id: user.id,
        email: user.email,
      }),
    };
  }

  async register({ email, password, firstName, lastName }: RegisterUserDto) {
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
