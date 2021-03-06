import Dimensions from "../../src/domain/entities/Dimensions";
import FreightCalculator from "../../src/domain/entities/FreightCalculator";
import Item from "../../src/domain/entities/Item";

test("should calculate freight", () => {
    const item = new Item(1, "Guitarra", 1000, new Dimensions(100, 30, 10, 3));
    const freight = FreightCalculator.calculate(item);

    expect(freight).toBe(30);
});

test("should calculate freight using min price", () => {
    const item = new Item(3, "Cabo", 30, new Dimensions(10, 10, 10, 0.9));
    const freight = FreightCalculator.calculate(item);

    expect(freight).toBe(10);
});
