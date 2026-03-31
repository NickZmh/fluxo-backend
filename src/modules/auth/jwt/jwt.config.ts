import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import { JwtModuleOptions } from '@nestjs/jwt';

export function createJwtConfig(cfg: ConfigService): JwtModuleOptions {
  const secret = cfg.getOrThrow<string>('JWT_SECRET');
  const expiresRaw = cfg.getOrThrow<string>('JWT_EXPIRES_IN');

  const expiresIn = (
    expiresRaw && expiresRaw.length > 0 ? expiresRaw : '1h'
  ) as StringValue;

  return {
    secret,
    signOptions: {
      expiresIn,
    },
  };
}
