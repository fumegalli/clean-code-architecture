import CalculateFreightGateway from "./gateway/CalculateFreightGateway";
import GetItemGateway from "./gateway/GetItemGateway";

export default class SimulateFreight {

    constructor (readonly calculateFreightGateway: CalculateFreightGateway, readonly getItemGatway: GetItemGateway) {}

    async execute (input: Input): Promise<Output> {
        const orderItems = [];
        for (const orderItem of input.orderItems) {
            const item = await this.getItemGatway.execute(orderItem.idItem);
            orderItems.push({
                volume: item.volume,
                density: item.density,
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
