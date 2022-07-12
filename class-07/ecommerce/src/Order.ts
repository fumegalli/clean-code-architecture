import Coupon from "./Coupon";
import Cpf from "./Cpf";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf
    orderItems: OrderItem[] = [];
    date: Date = new Date();
    coupon?: Coupon;
    freight = 0;

    constructor (cpf: string) {
        this.cpf = new Cpf(cpf);
    }

    addItem (item: Item, quantity: number): void {
        if (this.orderItems.some((orderItem) => orderItem.itemId === item.id)) throw new Error("Same item cant be add twice");
        this.orderItems.push(new OrderItem(item.id, item.price, quantity));
        this.freight += FreightCalculator.calculate(item) * quantity;
    }
    
    addCoupon (coupon: Coupon): void {
        if (coupon.isExpired(this.date)) return;
        this.coupon = coupon;
    }

    getTotal (): number {
        let total = this.orderItems.reduce((total, orderItem) => {
            total += orderItem.getTotal();
            return total;
        }, 0);
        if (this.coupon) total -= this.coupon.calculateDiscount(total);
        if (this.freight) total += this.freight;
        return total;
    }

}
