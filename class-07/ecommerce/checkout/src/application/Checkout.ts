import Order from "../domain/entities/Order";
import OrderRepository from "../domain/repositories/OrderRepository";
import CalculateFreightGateway from "./gateway/CalculateFreightGateway";
import DecrementStockGateway from "./gateway/DecrementStockGateway";
import GetItemGateway from "./gateway/GetItemGateway";

export default class Checkout {
    
    constructor (
        readonly orderRepository: OrderRepository,
        readonly calculateFreightGateway: CalculateFreightGateway,
        readonly decrementStockGateway: DecrementStockGateway,
        readonly getItemGateway: GetItemGateway,
    ) {}

    async execute (input: Input): Promise<Output> {
        const sequence = await this.orderRepository.count();
        const order = new Order(input.cpf, input.date, sequence + 1);
        const orderItemsFreight = [];
        const orderItemsStock = [];
        for (const orderItem of input.orderItems) {
            const item = await this.getItemGateway.execute(orderItem.idItem);
            order.addItem(item, orderItem.quantity);
            orderItemsStock.push({
                idItem: orderItem.idItem,
                quantity: orderItem.quantity,
            });
            orderItemsFreight.push({
                volume: item.volume,
                density: item.density,
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
