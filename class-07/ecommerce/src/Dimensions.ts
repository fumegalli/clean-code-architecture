export default class Dimensions {
    private readonly CM_TO_CUBIC_METERS = 1000000;

    constructor (
        readonly heightCm: number,
        readonly widthCm: number,
        readonly depthCm: number,
    ) {
        if (heightCm < 0 || widthCm < 0 || depthCm < 0) throw new Error("Dimensions cant be negative");
    }

    getVolume (): number {
        return (this.heightCm * this.widthCm * this.depthCm) / this.CM_TO_CUBIC_METERS;
    }
}
