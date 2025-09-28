import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.interface';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: Prisma.ProductCreateInput): Prisma.Prisma__ProductClient<{
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
    generateAffiliateLink(productId: string, req: AuthenticatedRequest): Promise<{
        link: string;
    }>;
}
