import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<Omit<User, 'password'>>;
    findOneByEmail(email: string): Promise<User | null>;
    findOneById(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    } | null>;
}
