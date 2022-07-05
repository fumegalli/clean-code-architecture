import Item from "../src/Item";

test("should throw error when any dimension is negative", () => {
    const item = new Item(1, "Panela", 200);
    const height = -20;
    const width = 40;
    const depth = 20;

    expect(() => item.addDimensions(height, width, depth)).toThrow(new Error("Dimensions cant be negative"));
});

test("should throw error when weight is negative", () => {
    expect(() => new Item(1, "Panela", 200, -1)).toThrow(new Error("Weight cant be negative"));
});
