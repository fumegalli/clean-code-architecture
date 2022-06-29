import Coupon from "../src/Coupon";
import Dimension from "../src/Dimensions";
import Item from "../src/Item";
import Order from "../src/Order";
import Shipping from "../src/Shipping";

test('should not create an order with invalid cpf', () => {
    expect(() => new Order('111.111.111-11')).toThrow(new Error('CPF Inválido'));
});

test('should create an order with 3 items (description, price and quantity)', () => {
    const order = new Order('935.411.347-80');
    order.addItem(new Item(1, 'Panela', 100), 1);
    order.addItem(new Item(2, 'Garfolher', 15), 2);
    order.addItem(new Item(3, 'Faca', 5), 2);
    const total = order.getTotal();
    expect(total).toBe(140);
});

test('should create an order with coupon (discount from total)', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2050-03-03T10:00:00'));
    const order = new Order('935.411.347-80');
    order.addItem(new Item(1, 'Panela', 100), 1);
    order.addItem(new Item(2, 'Garfolher', 15), 2);
    order.addItem(new Item(3, 'Faca', 5), 2);
    order.addCoupon(coupon);
    const total = order.getTotal();
    expect(total).toBe(112);
});

test('should not create an order with expired coupon', () => {
    const expiredCoupon = new Coupon('VALE20', 20, new Date('2020-03-03T10:00:00'));
    const order = new Order('935.411.347-80');
    order.addItem(new Item(1, 'Panela', 100), 1);
    order.addItem(new Item(2, 'Garfolher', 15), 2);
    order.addItem(new Item(3, 'Faca', 5), 2);
    expect(() => order.addCoupon(expiredCoupon)).toThrow(new Error('Cupom Expirado'));
});

test('should calculate shipping cost based on products weight and dimensions', () => {
    const itemDimensions = new Dimension(200, 100, 50, 40);
    const item = new Item(2, 'Garfolher', 15);
    item.addDimensions(itemDimensions);
    const order = new Order('935.411.347-80');
    order.addItem(item, 1);
    order.addShipping(new Shipping(1000));
    const total = order.getTotal();
    expect(total).toBe(415);
});

test('should return minimum shipping cost if it is higher than calculated value', () => {
    const itemDimensions = new Dimension(20, 15, 10, 1);
    const item = new Item(2, 'Garfolher', 15);
    item.addDimensions(itemDimensions);
    const order = new Order('935.411.347-80');
    order.addItem(item, 1);
    order.addShipping(new Shipping(1000));
    const total = order.getTotal();
    expect(total).toBe(25);
});
