import Coupon from "./Coupon";
import Cpf from "./Cpf";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export default class Order {
    code: OrderCode;
    cpf: Cpf
    orderItems: OrderItem[] = [];
    freight = 0;
    coupon?: Coupon;

    constructor (cpf: string, readonly date = new Date(), readonly sequence = 1) {
        this.cpf = new Cpf(cpf);
        this.code = new OrderCode(date, sequence);
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

    getCode (): string {
        return this.code.value;
    }

    getCpf (): string {
        return this.cpf.getValue();
    }

}
