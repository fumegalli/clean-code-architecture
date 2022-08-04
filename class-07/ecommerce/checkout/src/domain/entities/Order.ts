import OrderCoupon from "./OrderCoupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";
import Coupon from "./Coupon";

export default class Order {
    code: OrderCode;
    cpf: Cpf
    orderItems: OrderItem[] = [];
    freight = 0;
    coupon?: OrderCoupon;

    constructor (cpf: string, readonly date = new Date(), readonly sequence = 1, readonly id = 1) {
        this.cpf = new Cpf(cpf);
        this.code = new OrderCode(date, sequence);
    }

    addItem (item: Item, quantity: number): void {
        if (this.orderItems.some((orderItem) => orderItem.itemId === item.id)) throw new Error("Same item cant be add twice");
        this.orderItems.push(item.createOrderItem(quantity));
    }
    
    addCoupon (coupon: Coupon): void {
        if (coupon.isExpired(this.date)) return;
        this.coupon = coupon.createOrderCoupon();
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

    getCode (): string {
        return this.code.value;
    }

    getCpf (): string {
        return this.cpf.getValue();
    }

}
