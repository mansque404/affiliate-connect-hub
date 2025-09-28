import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async generateAffiliateLink(productId: string, affiliateId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${productId}" não encontrado.`);
    }
    
    const baseUrl = 'http://loja-parceira.com/produto';
    const affiliateLink = `${baseUrl}?productId=${productId}&affiliateId=${affiliateId}`;

    return { link: affiliateLink };
  }
}