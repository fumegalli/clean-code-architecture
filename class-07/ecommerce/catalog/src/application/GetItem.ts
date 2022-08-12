import ItemRepository from "../domain/repositories/ItemRepository";
import GetItemResponse from "./response/GetItemResponse";

export default class GetItem {

    constructor (readonly itemRepository: ItemRepository) {}

    async execute(id: number): Promise<GetItemResponse> {
        const item = await this.itemRepository.findById(id);
        if (!item) throw new Error("Item not found");
        return GetItemResponse.fromItem(item);
    }
}
