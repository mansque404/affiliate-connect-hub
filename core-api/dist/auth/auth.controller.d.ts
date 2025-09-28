import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(createUserDto: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Omit<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
    }, "password">>;
    login(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
}
