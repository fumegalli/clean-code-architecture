import OrderItem from "../../../domain/entities/OrderItem";
import OrderItemRepository from "../../../domain/repositories/OrderItemRepository";
import Connection from "../../database/Connection";

export default class OrderItemRepositoryDatabase implements OrderItemRepository {

    constructor (readonly connection: Connection) {}

    async findByOrder (id: number): Promise<OrderItem[]> {
        const orderItemsData = await this.connection.query("select * from ccca_checkout.order_item where id_order = $1", [id]);
        const orderItems: OrderItem[] = [];
        for (const orderItem of orderItemsData) {
            const item = new OrderItem(orderItem.id_item, orderItem.price, orderItem.quantity);
            orderItems.push(item);
        }
        return orderItems;
    }
    
}