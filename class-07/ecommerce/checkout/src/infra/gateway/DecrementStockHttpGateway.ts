import axios from "axios";
import DecrementStockGateway, { Input } from "../../application/gateway/DecrementStockGateway";

export default class DecrementStockHttpGateway implements DecrementStockGateway {

    constructor () {}
    
    async decrement(input: Input): Promise<void> {
        for (const orderItem of input) {
            await axios({
                url: "http://localhost:3002/decrement",
                method: "post",
                data: [
                   { idItem: orderItem.idItem, quantity: orderItem.quantity }
                ]
            });
        }
    }
}
