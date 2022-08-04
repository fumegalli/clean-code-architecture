import Checkout from "../../../application/Checkout";
import Connection from "../../database/Connection";
import Http from "../../http/Http";
import ItemRepositoryDatabase from "../../repositories/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../repositories/database/OrderRepositoryDatabase";

export default class OrderController {

	constructor (readonly http: Http, readonly connection: Connection) {
		http.on("post", "/orders/checkout", function (_: any, body: any) {
			const itemRepository = new ItemRepositoryDatabase(connection);
            const orderRepository = new OrderRepositoryDatabase(connection);
			const previewOrder = new Checkout(itemRepository, orderRepository);
			const output = previewOrder.execute({
				cpf: body.cpf,
				date: new Date(body.date),
				orderItems: body.orderItems,
			});
			return output;
		});
	}
}
