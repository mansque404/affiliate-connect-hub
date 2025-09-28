import { UsersService } from './users.service';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.interface';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: AuthenticatedRequest): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    } | null>;
}
