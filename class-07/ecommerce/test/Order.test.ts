import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

test('should not create an order with invalid CPF', () => {
    expect(() => new Order('invalidCPF')).toThrow(new Error('Invalid CPF'));
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
    const order = new Order('935.411.347-80');
    order.addItem(new Item(1, 'Panela', 100), 1);
    order.addItem(new Item(2, 'Garfolher', 15), 2);
    order.addItem(new Item(3, 'Faca', 5), 2);
    order.addCoupon(new Coupon('VALE20', 20));
    const total = order.getTotal();
    expect(total).toBe(112);
});
