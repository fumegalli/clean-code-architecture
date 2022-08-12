import OrderItem from "./OrderItem";

export default class Item {

    constructor (
        readonly id: number,
        readonly description: string,
        readonly price: number,
        readonly widthCm?: number,
        readonly heightCm?: number,
        readonly depthCm?: number,
        readonly weightKg?: number,
        readonly volume?: number,
        readonly density?: number,
    ){}

    createOrderItem (quantity: number): OrderItem {
        return new OrderItem(this.id, this.price, quantity);
    }
}
