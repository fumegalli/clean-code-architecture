import ValidateCoupon from "../../src/application/ValidateCoupon";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import CouponRepositoryDatabase from "../../src/infra/repositories/database/CouponRepositoryDatabase";

const connection = new PgPromiseAdapter();
const couponRepository = new CouponRepositoryDatabase(connection);

afterAll(async () => {
    await connection.close();
});

test("should validate coupon", async () => {
    const validateCoupon = new ValidateCoupon(couponRepository);
    const input = {
        code: "VALE20",
        date: new Date(2022, 1, 1)
    };
    const output = await validateCoupon.execute(input);

    expect(output.isExpired).toBe(false);
});

test("should validate expired coupon", async () => {
    const validateCoupon = new ValidateCoupon(couponRepository);
    const input = {
        code: "VALE20_EXPIRED",
        date: new Date(2022, 2, 2)
    };
    const output = await validateCoupon.execute(input);

    expect(output.isExpired).toBe(true);
});
