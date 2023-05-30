import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request';
import { OrdersRepository } from './orders.repository';
import { Order } from './schemas/order.schema';
import { BILLING_SERVICE } from './constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private readonly billingClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, {session});
      await lastValueFrom(this.billingClient.emit('order_created', {
        request,
      }));
      await session.commitTransaction();
      return order;
    }
    catch(err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders(): Promise<Order[]> {
    return this.ordersRepository.find({});
  }
}
