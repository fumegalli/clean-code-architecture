import Order from "../domain/entities/Order";
import ItemRepository from "../domain/repositories/ItemRepository";
import OrderRepository from "../domain/repositories/OrderRepository";

export default class Checkout {
    
    constructor (readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) {}

    async execute (input: Input): Promise<Output> {
        const sequence = await this.orderRepository.count();
        const order = new Order(input.cpf, input.date, sequence + 1);
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
        }
        await this.orderRepository.save(order);
        const total = order.getTotal();
        return {
            code: order.getCode(),
            total,
        }
    }
}

type Input = {
    cpf: string,
    date: Date,
    orderItems: {idItem: number; quantity: number}[]
}

type Output = {
    code: string,
    total: number,
}
