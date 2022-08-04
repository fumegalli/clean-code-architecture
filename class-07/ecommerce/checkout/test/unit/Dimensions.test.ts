import Dimensions from "../../src/domain/entities/Dimensions";

test("should throw error when height is negative", () => {
    const height = -20;
    const width = 40;
    const depth = 20;

    expect(() => new Dimensions(height, width, depth)).toThrow(new Error("Dimensions cant be negative"));
});

test("should throw error when width is negative", () => {
    const height = 20;
    const width = -40;
    const depth = 20;

    expect(() => new Dimensions(height, width, depth)).toThrow(new Error("Dimensions cant be negative"));
});

test("should throw error when depth is negative", () => {
    const height = 20;
    const width = 40;
    const depth = -20;

    expect(() => new Dimensions(height, width, depth)).toThrow(new Error("Dimensions cant be negative"));
});

test("should calculate volume", () => {
    const height = 100;
    const width = 30;
    const depth = 10;
    const dimensions = new Dimensions(height, width, depth);
    const volume = dimensions.getVolume();

    expect(volume).toBe(0.03);
});
