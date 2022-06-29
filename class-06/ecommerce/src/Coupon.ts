export default class Coupon {
    constructor (
        readonly code: string,
        readonly percentage: number,
        readonly expiresAt: Date
    ) {}

    calculateDiscount (total: number): number {
        return (total * this.percentage) / 100;
    }

    isExpired (): boolean {
        const now = new Date();
        return this.expiresAt < now;
    }
}
