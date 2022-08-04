import DecrementStock from "../../application/DecrementStock";
import GetStock from "../../application/GetStock";
import IncrementStock from "../../application/IncrementStock";
import Http from "../http/Http";

export default class StockController {
	
    constructor (
		readonly http: Http,
		readonly incrementStock: IncrementStock,
		readonly decrementStock: DecrementStock,
		readonly getStock: GetStock,
	) {
		http.on("post", "/increment", async (params: any, body: any) => {
			await incrementStock.execute(body); 
		});

		http.on("post", "/decrement", async (params: any, body: any) => {
			await decrementStock.execute(body); 
		});

		http.on("get", "/calculate/:idItem", async (params: any, body: any) => {
			const idItem = parseInt(params.idItem);
			const output = await getStock.execute(idItem);
			return output;
		});
	}
}
