import Dimensions from "./Dimensions";
import OrderItem from "./OrderItem";

export default class Item {

    constructor (
        readonly id: number,
        readonly description: string,
        readonly price: number,
        readonly dimensions: Dimensions = new Dimensions(),
    ){}

    getVolume (): number {
        return this.dimensions.getVolume();
    }

    getDensity (): number {
        return this.dimensions.getDensity();
    }

    createOrderItem (quantity: number): OrderItem {
        return new OrderItem(this.id, this.price, quantity);
    }
}
