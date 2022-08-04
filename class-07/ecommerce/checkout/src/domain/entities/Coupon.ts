import OrderCoupon from "./OrderCoupon";

export default class Coupon {
    constructor (
        readonly code: string,
        readonly percentage: number,
        readonly expiresAt: Date = new Date()
    ) {}

    calculateDiscount (total: number): number {
        return (total * this.percentage) / 100;
    }

    isExpired (date: Date): boolean {
        return this.expiresAt.getTime() < date.getTime();
    }

    createOrderCoupon (): OrderCoupon {
        return new OrderCoupon(this.code, this.percentage);
    }
}
