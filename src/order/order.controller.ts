import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto, req.user.id);
  }
  @Get()
  getAll() {
    return this.orderService.getOrders();
  }
  async
}
