import Http from "../../http/Http";
import Checkout from "../../../application/Checkout";

export default class OrderController {

	constructor (readonly http: Http, readonly checkout: Checkout) {
		http.on("post", "/orders/checkout", function (_: any, body: any) {
			const output = checkout.execute({
				from: body.from,
				to: body.to,
				cpf: body.cpf,
				date: new Date(body.date),
				orderItems: body.orderItems,
			});
			return output;
		});
	}
}
