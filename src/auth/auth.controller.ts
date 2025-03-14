import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    const { email, password } = body;
    const user = await this.usersService.createUser(email, password);
    return user;
  }

  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  // Example of a protected route
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
