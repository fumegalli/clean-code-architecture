import Coupon from "../../src/domain/entities/Coupon";

test("should calculate discount", () => {
    const coupon = new Coupon("VALE20", 20);
    const total = 100;
    const discount = coupon.calculateDiscount(total);

    expect(discount).toBe(20);
});

test("should return true if coupon is expired", () => {
    const coupon = new Coupon("VALE20", 20, new Date(2000, 1, 1));
    const isExpired = coupon.isExpired(new Date());

    expect(isExpired).toBe(true);
});

test("should return false if coupon is valid", () => {
    const coupon = new Coupon("VALE20", 20);
    const isExpired = coupon.isExpired(new Date(2000, 1, 1));

    expect(isExpired).toBe(false);
});
