import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf
    orderItems: OrderItem[] = [];
    date: Date = new Date();
    coupon?: Coupon;
    freight?: Freight;

    constructor (cpf: string) {
        this.cpf = new Cpf(cpf);
    }

    addItem (item: Item, quantity: number): void {
        if (quantity < 0) throw new Error("Item quantity cant be negative");
        if (this.orderItems.some((orderItem) => orderItem.itemId === item.id)) throw new Error("Same item cant be add twice");
        this.orderItems.push(new OrderItem(item.id, item.price, quantity));
    }
    
    addCoupon (coupon: Coupon): void {
        if (coupon.isExpired(this.date)) throw new Error("Coupon is expired");
        this.coupon = coupon;
    }

    addFreight (freight: Freight): void {
        this.freight = freight;
    }

    getTotal (): number {
        let total = this.orderItems.reduce((total, orderItem) => {
            total += orderItem.getTotal();
            return total;
        }, 0);
        if (this.coupon) total -= this.coupon.calculateDiscount(total);
        if (this.freight) total += this.freight.getTotalCost();
        return total;
    }

}
