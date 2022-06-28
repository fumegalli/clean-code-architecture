import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf
    orderItems: OrderItem[] = [];
    coupon?: Coupon;

    constructor (cpf: string) {
        this.cpf = new Cpf(cpf);
    }

    addItem (item: Item, quantity: number): void {
        this.orderItems.push(new OrderItem(item.id, item.price, quantity));
    }
    
    addCoupon (coupon: Coupon): void {
        this.coupon = coupon;
    }

    getTotal (): number {
        let total = this.orderItems.reduce((total, orderItem) => {
            total += orderItem.getTotal();
            return total;
        }, 0);
        if (this.coupon) total -= this.coupon.calculateDiscount(total);
        return total;
    }

}
