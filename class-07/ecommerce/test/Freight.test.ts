import Freight from "../src/Freight";
import Item from "../src/Item";
import OrderItem from "../src/OrderItem";

test("should calculate cost", () => {
    const freight = new Freight();
    const itemId = 1;
    const itemDescription = "Geladeira";
    const itemPrice = 50;
    const itemWeightKg = 40;
    const item = new Item(itemId, itemDescription, itemPrice, itemWeightKg);
    const itemHeightCm = 200;
    const itemWidthCm = 100;
    const itemDepthCm = 50;
    item.addDimensions(itemHeightCm, itemWidthCm, itemDepthCm);
    const itemQuantity = 1;
    const orderItems = [new OrderItem(item, itemQuantity)];
    const cost = freight.getTotalCost(orderItems);

    expect(cost).toBe(400);
});

test("should return min cost if it is higher than calculated cost", () => {
    const freight = new Freight();
    const itemId = 1;
    const itemDescription = "Garfolher";
    const itemPrice = 50;
    const itemWeightKg = 1;
    const item = new Item(itemId, itemDescription, itemPrice, itemWeightKg);
    const itemHeightCm = 20;
    const itemWidthCm = 10;
    const itemDepthCm = 15;
    item.addDimensions(itemHeightCm, itemWidthCm, itemDepthCm);
    const itemQuantity = 1;
    const orderItems = [new OrderItem(item, itemQuantity)];
    const cost = freight.getTotalCost(orderItems);

    expect(cost).toBe(10);
});
