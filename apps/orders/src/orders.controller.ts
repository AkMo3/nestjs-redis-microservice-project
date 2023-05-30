import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order-request';
import { Order } from './schemas/order.schema';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  getHello() : string {
    return 'Hello World!';
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) : Promise<Order> {
    console.log(req.user);
    return this.ordersService.createOrder(request);
  }

  @Get()
  async getOrders() : Promise<Order[]> {
    return this.ordersService.getOrders();
  }

}
