import OrderItem from "../src/OrderItem";

test('should return total order item price', () => {
    const orderItem = new OrderItem(1, 10, 2);
    const total = orderItem.getTotal();

    expect(total).toBe(20);
});
