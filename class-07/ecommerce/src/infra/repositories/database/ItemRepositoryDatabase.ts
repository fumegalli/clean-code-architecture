import Dimensions from "../../../domain/entities/Dimensions";
import Item from "../../../domain/entities/Item";
import ItemRepository from "../../../domain/repositories/ItemRepository";
import Connection from "../../database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository {

    constructor (readonly connection: Connection) {}

	async findById(id: number): Promise<Item> {
		const [itemData] = await this.connection.query("select * from ccca.item where id_item = $1", [id]);
		const item = new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), new Dimensions(itemData.width, itemData.height, itemData.length, itemData.weight));
		return item;
	}
}