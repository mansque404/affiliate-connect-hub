import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.ProductCreateInput): Prisma.Prisma__ProductClient<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    generateAffiliateLink(productId: string, affiliateId: string): Promise<{
        link: string;
    }>;
}
