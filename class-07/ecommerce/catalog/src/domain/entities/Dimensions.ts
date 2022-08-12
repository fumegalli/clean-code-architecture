export default class Dimensions {

    constructor (
        readonly widthCm: number = 0,
        readonly heightCm: number = 0,
        readonly depthCm: number = 0,
        readonly weightKg: number = 0,
    ) {
        if (heightCm < 0 || widthCm < 0 || depthCm < 0 || weightKg < 0) throw new Error("Dimensions cant be negative");
    }

    getVolume (): number {
        return this.heightCm/100 * this.widthCm/100 * this.depthCm/100;
    }

    getDensity (): number {
        if (this.getVolume() === 0) return 0;
        return this.weightKg / this.getVolume();
    }
}
