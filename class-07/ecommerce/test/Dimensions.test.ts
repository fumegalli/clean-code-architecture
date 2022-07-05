import Dimensions from "../src/Dimensions";

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
