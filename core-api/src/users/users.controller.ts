import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.interface';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: AuthenticatedRequest) { 
    const userId = req.user.userId; 
    return this.usersService.findOneById(userId);
  }
}