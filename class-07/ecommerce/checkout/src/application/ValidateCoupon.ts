import CouponRepository from "../domain/repositories/CouponRepository";

export default class ValidateCoupon {
    
    constructor (readonly couponRepository: CouponRepository) {}

    async execute (input: Input): Promise<Output> {
        const coupon = await this.couponRepository.findByCode(input.code);
        if (!coupon) return { isExpired: true };
        return { isExpired: coupon.isExpired(input.date) };
    }
}

type Input = {
    code: string;
    date: Date;
}

type Output = {
    isExpired: boolean;
}
