import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AllowGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('🛡️ AllowGuard triggered');
    return true; // ЗАВЖДИ пускає
  }
}
