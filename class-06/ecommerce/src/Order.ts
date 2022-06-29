import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";
import Shipping from "./Shipping";

export default class Order {
    cpf: Cpf;
    orderItems: OrderItem[];
    coupon?: Coupon;
    shipping?: Shipping;

    constructor (cpf: string) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
    }

    addItem (item: Item, quantity: number) {
        this.orderItems.push(new OrderItem(item, quantity));
    }

    addCoupon (coupon: Coupon) {
        if (coupon.isExpired()) throw new Error('Cupom Expirado');
        this.coupon = coupon;
    }

    addShipping (shipping: Shipping) {
        this.shipping = shipping;
    }

    getTotal () {
        let total = this.orderItems.reduce((total, orderItem) => {
            total += orderItem.getTotalPrice();
            return total;
        }, 0);
        if (this.coupon) total -= this.coupon.calculateDiscount(total);
        if (this.shipping) total += this.shipping.calculateCost(this.orderItems);
        return total;
    }
}
