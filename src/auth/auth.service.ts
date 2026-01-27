import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  async login(email: string, password: string) {
    // супер-просто: “фейковий” юзер
    if (email !== 'test@test.com' || password !== '123') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: 1, email };
    return { accessToken: await this.jwt.signAsync(payload) };
  }
}
