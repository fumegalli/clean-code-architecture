import ItemRepository from "../domain/repositories/ItemRepository";
import CalculateFreightGateway from "./gateway/CalculateFreightGateway";

export default class SimulateFreight {

    constructor (readonly itemRepository: ItemRepository, readonly calculateFreightGateway: CalculateFreightGateway) {}

    async execute (input: Input): Promise<Output> {
        const orderItems = [];
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem);
            orderItems.push({
                volume: item.getVolume(),
                density: item.getDensity(),
                quantity: orderItem.quantity,
            });
        }
        const { total } = await this.calculateFreightGateway.calculate({
            from: input.from,
            to: input.to,
            orderItems,
        });
        return { total };
    }
}

type Input = {
    from: string,
    to: string,
    orderItems: { idItem: number, quantity: number }[];
}

type Output = {
    total: number;
}
