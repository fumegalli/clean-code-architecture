import Order from "../../../domain/entities/Order";
import OrderRepository from "../../../domain/repositories/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor (readonly connection: Connection) {}
    
    async clean(): Promise<void> {
        await this.connection.query("delete from ccca.order_item", []);
        await this.connection.query("delete from ccca.order", []);
    }

    async save (order: Order): Promise<void> {
        const [orderData] = await this.connection.query(
            "insert into ccca.order (code, cpf, issue_date, total, freight) values ($1, $2, $3, $4, $5) returning *",
            [order.getCode(), order.getCpf(), order.date, order.getTotal(), order.freight]);
        for (const orderItem of order.orderItems) {
            await this.connection.query(
                "insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)",
                [orderData.id_order, orderItem.itemId, orderItem.price, orderItem.quantity]
            );
        }
        
    }

    async count (): Promise<number> {
        const [row] = await this.connection.query("select count(*)::int from ccca.order", []);
        return row.count;
    }
}