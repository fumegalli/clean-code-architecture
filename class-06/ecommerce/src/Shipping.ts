import OrderItem from "./OrderItem";

export default class Shipping {
    MIN_COST = 10;

    constructor (readonly distance: number) {}

    calculateCost(orderItems: OrderItem[]) {
        const itemsCost = orderItems.reduce((cost, item) => {
            cost += item.getTotalVolume() * (item.getTotalDensity() / 100);
            return cost;
        }, 0);
        const totalCost = itemsCost * this.distance;
        return (totalCost < this.MIN_COST) ? this.MIN_COST : totalCost;
    }
}
