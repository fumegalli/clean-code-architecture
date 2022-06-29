import Dimensions from "./Dimensions";

export default class Item {
    dimensions?: Dimensions;

    constructor (
        readonly id: number,
        readonly description: string,
        readonly price: number,
    ) {}

    get volume() { // TODO: Get? Dimensions opcional?
        return this.dimensions?.volume ?? 0;
    }

    get density() {
        return this.dimensions?.density ?? 0;
    }

    addDimensions (dimensions: Dimensions) {
        this.dimensions = dimensions;
    }
}
