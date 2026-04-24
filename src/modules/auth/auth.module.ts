import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { createJwtConfig } from './jwt/jwt.config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    UsersModule,
    // Configure JWT using values from .env via ConfigService

    JwtModule.registerAsync({
      inject: [ConfigService],

      // This factory runs on app startup
      // and returns JwtModule configuration
      useFactory: createJwtConfig,
    }),
  ],
  controllers: [AuthController], // Handles incoming HTTP requests (e.g. POST /auth/login)
  providers: [AuthService, JwtStrategy, GoogleStrategy], // Contains business logic (login, token generation, etc.)
})
export class AuthModule {}

// Client (request)
//       ↓
// AuthController  (/auth/login)
//       ↓
// AuthService     (validate user + create token)
//       ↓
// JwtService      (sign JWT using secret + expiresIn)
//       ↓
// Response (JWT token)
