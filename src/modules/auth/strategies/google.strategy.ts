import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import {
  Profile,
  Strategy,
  StrategyOptionsWithRequest,
  VerifyCallback,
} from 'passport-google-oauth20';
import type { Request } from 'express';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    const options: StrategyOptionsWithRequest = {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    };

    super(options);
  }

  authorizationParams(req: Request) {
    const redirectTo =
      typeof req.query?.redirectTo === 'string' ? req.query.redirectTo : null;

    console.log('AUTH PARAMS QUERY:', req.query);

    return {
      state: JSON.stringify({
        redirectTo,
      }),
    };
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const rawState = req.query?.state as string | undefined;

    const state = rawState
      ? (JSON.parse(rawState) as { redirectTo?: string })
      : { redirectTo: null };

    req.redirectTo = state.redirectTo ?? null;

    const user = await this.authService.validateGoogleUser(profile);
    done(null, user);
  }
}
