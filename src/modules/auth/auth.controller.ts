import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { RequestUser } from './type/request-user.type';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export interface AuthenticatedRequest extends Request {
  user: RequestUser;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Returns current user' })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Req() req: AuthenticatedRequest) {
    return this.usersService.findById(req.user.id);
  }

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.auth.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.auth.register(body);
  }

  @ApiOperation({
    summary: 'Redirects user to Google OAuth login page',
    description:
      'This endpoint cannot be tested via Swagger because it performs a browser redirect.',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // NestJS автоматично редіректить на Google
  }

  @ApiOperation({
    summary: 'Google OAuth callback endpoint',
    description:
      'This endpoint is called by Google after successful authentication. Not testable via Swagger.',
  })
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: AuthenticatedRequest) {
    return await this.auth.loginWithGoogle(req.user);
  }
}
