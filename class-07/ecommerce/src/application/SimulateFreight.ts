import FreightCalculator from "../domain/entities/FreightCalculator";
import ItemRepository from "../domain/repositories/ItemRepository";

export default class SimulateFreight {

    constructor (readonly itemRepository: ItemRepository) {}

    async execute (input: Input): Promise<Output> {
        let total = 0;
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.findById(orderItem.idItem);
            total += FreightCalculator.calculate(item) * orderItem.quantity;
        }
        return { total };
    }
}

type Input = {
    orderItems: { idItem: number, quantity: number }[];
}

type Output = {
    total: number;
}
