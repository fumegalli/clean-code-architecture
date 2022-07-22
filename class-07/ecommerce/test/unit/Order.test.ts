import Coupon from "../../src/domain/entities/Coupon";
import Dimensions from "../../src/domain/entities/Dimensions";
import Item from "../../src/domain/entities/Item";
import Order from "../../src/domain/entities/Order";

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

test("should create an order with 3 items and expired coupon", () => {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Panela", 100), 1);
    order.addItem(new Item(2, "Garfolher", 15), 2);
    order.addItem(new Item(3, "Faca", 5), 2);
    order.addCoupon(new Coupon("VALE20", 20, new Date(2000, 1, 1)));
    const total = order.getTotal();

    expect(total).toBe(140);
});

test("should create an order with 3 items and calculate freight", () => {
    const order = new Order("935.411.347-80");
    order.addItem(new Item(1, "Panela", 100, new Dimensions(100, 30, 10, 3)), 1);
    order.addItem(new Item(2, "Garfolher", 15, new Dimensions(100, 30, 10, 3)), 2);
    order.addItem(new Item(3, "Faca", 5, new Dimensions(100, 30, 10, 3)), 2);
    const total = order.getTotal();

    expect(total).toBe(290);
});

test("should create an order and generate code", () => {
    const order = new Order("935.411.347-80", new Date("2022-03-01T10:00:00"), 1);
    order.addItem(new Item(1, "Panela", 100), 1);
    order.addItem(new Item(2, "Garfolher", 15), 2);
    order.addItem(new Item(3, "Faca", 5), 2);
    const code = order.getCode();

    expect(code).toBe("202200000001");
});
