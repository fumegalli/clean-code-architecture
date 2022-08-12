import Item from "../../domain/entities/Item";

export default class GetItemResponse {
    constructor (
        readonly description: string,
        readonly price: number,
        readonly id: number,
        readonly width: number,
        readonly height: number,
        readonly depth: number,
        readonly weight: number,
        readonly volume: number,
        readonly density: number,
    ) {}

    static fromItem (item: Item): GetItemResponse {
        return new GetItemResponse(
            item.description,
            item.price,
            item.id,
            item.dimensions.widthCm,
            item.dimensions.heightCm,
            item.dimensions.depthCm,
            item.dimensions.weightKg,
            item.getVolume(),
            item.getDensity(),
        );
    }
}
