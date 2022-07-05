import Coupon from "../src/Coupon";

test("should calculate discount", () => {
    const coupon = new Coupon("VALE20", 20);
    const total = 100;
    const discount = coupon.calculateDiscount(total);

    expect(discount).toBe(20);
});
