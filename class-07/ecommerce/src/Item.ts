import Dimensions from "./Dimensions";

export default class Item {
    dimensions?: Dimensions;

    constructor (
        readonly id: number,
        readonly description: string,
        readonly price: number,
        readonly weightKg: number = 0,
    ){
        if (weightKg < 0) throw new Error("Weight cant be negative");
    }

    addDimensions (heightCm: number, widthCm: number, depthCm: number): void {
        this.dimensions = new Dimensions(heightCm, widthCm, depthCm);
    }

    getVolume (): number {
        return this.dimensions?.getVolume() || 0;
    }

    getDensity (): number {
        return Math.trunc(this.weightKg / this.getVolume());
    }
}
