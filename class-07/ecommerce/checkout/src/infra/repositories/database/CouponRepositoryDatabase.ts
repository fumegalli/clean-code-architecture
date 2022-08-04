import Coupon from "../../../domain/entities/Coupon";
import CouponRepository from "../../../domain/repositories/CouponRepository";
import Connection from "../../database/Connection";

export default class CouponRepositoryDatabase implements CouponRepository {

    constructor (readonly connection: Connection) {}

    async findByCode (code: string): Promise<Coupon> {
        const [couponData] = await this.connection.query("select * from ccca_checkout.coupon where code = $1", [code]);
        const coupon = new Coupon(code, couponData.percentage, couponData.expire_date)
        return coupon;
    }
}
