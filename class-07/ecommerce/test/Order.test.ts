import Coupon from "../src/Coupon";
import Freight from "../src/Freight";
import Item from "../src/Item";
import Order from "../src/Order";

test("should not create an order with invalid CPF", () => {
    expect(() => new Order("invalidCPF")).toThrow(new Error("Invalid CPF"));
});

test("should create an order with 3 items", () => {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Panela", 100), 1);
    order.addItem(new Item(2, "Garfolher", 15), 2);
    order.addItem(new Item(3, "Faca", 5), 2);
    const total = order.getTotal();

    expect(total).toBe(140);
});

test("should throw error when add a negative quantity of an item", () => {
    const order = new Order("935.411.347-80");

    expect(() => order.addItem(new Item(1, "Panela", 100), -1)).toThrow(new Error("Item quantity cant be negative"));
});

test("should throw error when add same item twice", () => {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Panela", 100), 1);

    expect(() => order.addItem(new Item(1, "Panela", 100), 1)).toThrow(new Error("Same item cant be add twice"));
});

test("should create an order with coupon", () => {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Panela", 100), 1);
    order.addItem(new Item(2, "Garfolher", 15), 2);
    order.addItem(new Item(3, "Faca", 5), 2);
    order.addCoupon(new Coupon("VALE20", 20));
    const total = order.getTotal();

    expect(total).toBe(112);
});

test("should not apply expired coupon", () => {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Panela", 100), 1);
    order.addItem(new Item(2, "Garfolher", 15), 2);
    order.addItem(new Item(3, "Faca", 5), 2);

    expect(() => order.addCoupon(new Coupon("VALE20", 20, new Date("2020-03-10T10:00:00")))).toThrow(new Error("Coupon is expired"));
});

test("should calculate order freight", () => {
    const order = new Order("935.411.347-80");
    const itemId = 1;
    const itemDescription = "Panela";
    const itemPrice = 100;
    const itemWeightKg = 3;
    const itemQuantity = 1;
    const item = new Item(itemId, itemDescription, itemPrice, itemWeightKg);
    const itemHeightCm = 100;
    const itemWidthCm = 30;
    const itemDepthCm = 10;
    item.addDimensions(itemHeightCm, itemWidthCm, itemDepthCm);
    order.addItem(item, itemQuantity);
    order.addFreight(new Freight(item.getVolume(), item.getDensity()));
    const total = order.getTotal();

    expect(total).toBe(130);
});
