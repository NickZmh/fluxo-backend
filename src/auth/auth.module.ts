import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import type { StringValue } from 'ms';

// type Env = {
//   JWT_SECRET: string;
//   JWT_EXPIRES_IN?: StringValue;
// };

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: {
        expiresIn:
          (process.env.JWT_EXPIRES_IN as unknown as number | undefined) ?? '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
