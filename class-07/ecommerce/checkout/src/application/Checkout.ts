import Order from "../domain/entities/Order";
import ItemRepository from "../domain/repositories/ItemRepository";
import OrderRepository from "../domain/repositories/OrderRepository";
import CalculateFreightGateway from "./gateway/CalculateFreightGateway";
import DecrementStockGateway from "./gateway/DecrementStockGateway";

export default class Checkout {
    
    constructor (
        readonly itemRepository: ItemRepository,
        readonly orderRepository: OrderRepository,
        readonly calculateFreightGateway: CalculateFreightGateway,
        readonly decrementStockGateway: DecrementStockGateway,
    ) {}

    async execute (input: Input): Promise<Output> {
        const sequence = await this.orderRepository.count();
        const order = new Order(input.cpf, input.date, sequence + 1);
        const orderItemsFreight = [];
        const orderItemsStock = [];
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
            orderItemsStock.push({
                idItem: orderItem.idItem,
                quantity: orderItem.quantity,
            });
            orderItemsFreight.push({
                volume: item.getVolume(),
                density: item.getDensity(),
                quantity: orderItem.quantity,
            });
        }
        const freight = await this.calculateFreightGateway.calculate({
            from: input.from,
            to: input.to,
            orderItems: orderItemsFreight,
        });
        order.freight = freight.total;
        await this.orderRepository.save(order);
        await this.decrementStockGateway.decrement(orderItemsStock);
        const total = order.getTotal();
        return {
            code: order.getCode(),
            total,
        }
    }
}

type Input = {
    from: string,
    to: string,
    cpf: string,
    date: Date,
    orderItems: {idItem: number; quantity: number}[]
}

type Output = {
    code: string,
    total: number,
}
