import Coupon from "../src/Coupon";

test("should calculate discount", () => {
    const coupon = new Coupon("VALE20", 20);
    const total = 100;
    const discount = coupon.calculateDiscount(total);

    expect(discount).toBe(20);
});

test("should return true if coupon is expired", () => {
    const today = new Date();
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const coupon = new Coupon("VALE20", 20, yesterday);
    const isExpired = coupon.isExpired(today);

    expect(isExpired).toBe(true);
});

test("should return false if coupon is valid", () => {
    const today = new Date();
    const coupon = new Coupon("VALE20", 20);
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const isExpired = coupon.isExpired(yesterday);

    expect(isExpired).toBe(false);
});
