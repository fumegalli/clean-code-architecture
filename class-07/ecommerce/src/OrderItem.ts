export default class OrderItem {
    constructor (
        readonly itemId: number,
        readonly price: number,
        readonly quantity: number,
    ) {
        if (quantity <= 0) throw new Error("Item quantity cant be negative");
    }

    getTotal (): number {
        return this.price * this.quantity;
    }
}
