import OrderItem from "./OrderItem";

export default class Freight {
    private readonly DISTANCE = 1000;
    private readonly MIN_COST = 10; 

    constructor () {}

    getTotalCost (orderItems: OrderItem[]): number {
        const { volumeCubicMeters,  densityKgByCubicMeters} = orderItems.reduce((measurement, orderItem) => {
            measurement.volumeCubicMeters += orderItem.getVolume();
            measurement.densityKgByCubicMeters += orderItem.getDensity();
            return measurement;
        }, { volumeCubicMeters: 0,  densityKgByCubicMeters: 0 });

        const cost = this.DISTANCE * volumeCubicMeters * (densityKgByCubicMeters / 100);

        return (cost < this.MIN_COST) ? this.MIN_COST : cost;
    }
}
