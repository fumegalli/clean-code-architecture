import axios from "axios";
import GetItemGateway from "../../application/gateway/GetItemGateway";
import Item from "../../domain/entities/Item";

export default class GetItemHttpGateway implements GetItemGateway {

    constructor () {}

    async execute (idItem: number): Promise<Item> {
        const response = await axios({
            url: `http://localhost:3003/items/${idItem}`,
            method: "get",
        });
        return new Item(
            response.data.id,
            response.data.description,
            response.data.price,
            response.data.widthCm,
            response.data.heightCm,
            response.data.depthCm,
            response.data.weightKg,
            response.data.volume,
            response.data.density,
        );
    }
}
