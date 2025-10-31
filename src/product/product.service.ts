import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  update(id: number, data: Partial<{ name: string; description: string; price: number; stock: number }>) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
