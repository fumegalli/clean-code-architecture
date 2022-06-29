export default class Dimensions {
    CONVERT_CM_TO_CUBIC_METERS = 1000000;

    constructor (
        readonly heightCm: number,
        readonly widthCm: number,
        readonly depthCm: number,
        readonly weightKg: number,
    ) {}

    get volume() { // TODO: Const? get?
        return (this.heightCm * this.depthCm * this.widthCm) / this.CONVERT_CM_TO_CUBIC_METERS;
    }

    get density() {
        return this.volume * this.weightKg;
    }
}
