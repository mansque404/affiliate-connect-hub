import { Controller, Get, Post, Body, UseGuards, Param, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id/generate-link') 
  generateAffiliateLink(@Param('id') productId: string, @Request() req: AuthenticatedRequest) {
    const affiliateId = req.user.userId; 
    return this.productsService.generateAffiliateLink(productId, affiliateId);
  }
}