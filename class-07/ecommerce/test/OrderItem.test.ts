import Item from "../src/Item";
import OrderItem from "../src/OrderItem";

test('should return total order item price', () => {
    const item = new Item(1, "Panela", 10);
    const orderItem = new OrderItem(item, 2);
    const total = orderItem.getTotal();

    expect(total).toBe(20);
});
