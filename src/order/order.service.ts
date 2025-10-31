import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto, userId: number) {
    const items = createOrderDto.items;

    const productDetails = await this.prisma.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
    });

    const missingIds = items
      .filter((i) => !productDetails.some((p) => p.id === i.productId))
      .map((i) => i.productId);

    if (missingIds.length > 0) {
      throw new BadRequestException(
        `Produk dengan ID berikut tidak ditemukan: ${missingIds.join(', ')}`,
      );
    }

    const orderItems = items.map((item) => {
      const product = productDetails.find((p) => p.id === item.productId);
      if (!product) throw new BadRequestException('Produk tidak ditemukan');

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const total = orderItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

    return this.prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        total,
        items: { create: orderItems },
      },
      include: { items: true, user: true },
    });
  }

  async getOrders() {
    return this.prisma.order.findMany({
      include: {
        items: { include: { product: true } },
        user: true,
      },
    });
  }
}