import Freight from "../src/Freight";

test("should calculate cost", () => {
    const volumeCubicMeters = 1;
    const densityKgByCubicMeters = 40;
    const freight = new Freight(volumeCubicMeters, densityKgByCubicMeters);
    const cost = freight.getTotalCost();

    expect(cost).toBe(400);
});

test("should return min cost if it is higher than calculated cost", () => {
    const volumeCubicMeters = 0.003;
    const densityKgByCubicMeters = 100;
    const freight = new Freight(volumeCubicMeters, densityKgByCubicMeters);
    const cost = freight.getTotalCost();

    expect(cost).toBe(10);
});
