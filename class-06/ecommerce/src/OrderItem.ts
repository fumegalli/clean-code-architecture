import Item from "./Item";

export default class OrderItem {
    constructor (
        readonly item: Item,
        readonly quantity: number,
    ) {}

    getTotalPrice () {
        return this.item.price * this.quantity;
    }

    getTotalVolume () {
        return this.item.volume * this.quantity;
    }

    getTotalDensity () {
        return this.item.density * this.quantity;
    }
}
