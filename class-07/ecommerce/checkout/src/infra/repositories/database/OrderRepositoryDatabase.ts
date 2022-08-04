import Order from "../../../domain/entities/Order";
import OrderCoupon from "../../../domain/entities/OrderCoupon";
import OrderItem from "../../../domain/entities/OrderItem";
import OrderRepository from "../../../domain/repositories/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor (readonly connection: Connection) {}
    
    async clean(): Promise<void> {
        await this.connection.query("delete from ccca_checkout.order_item", []);
        await this.connection.query("delete from ccca_checkout.order", []);
    }

    async save (order: Order): Promise<void> {
        const [orderData] = await this.connection.query(
            "insert into ccca_checkout.order (code, cpf, issue_date, total, freight, sequence) values ($1, $2, $3, $4, $5, $6) returning *",
            [order.getCode(), order.getCpf(), order.date, order.getTotal(), order.freight, order.sequence]);
        for (const orderItem of order.orderItems) {
            await this.connection.query(
                "insert into ccca_checkout.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)",
                [orderData.id_order, orderItem.itemId, orderItem.price, orderItem.quantity]
            );
        }
    }

    async count (): Promise<number> {
        const [row] = await this.connection.query("select count(*)::int from ccca_checkout.order", []);
        return row.count;
    }

    async findByCode (code: string): Promise<Order> {
        const [orderData] = await this.connection.query("select * from ccca_checkout.order where code = $1", [code]);
        if (!orderData) throw new Error("Order not found");
        const order = new Order(orderData.cpf, new Date(orderData.issue_date), orderData.sequence, orderData.id_order);
        const orderItemsData = await this.connection.query("select * from ccca_checkout.order_item where id_order = $1", [orderData.id_order]);
        for (const orderItemData of orderItemsData) {
            const orderItem = new OrderItem(orderItemData.id_item, orderItemData.price, orderItemData.quantity);
            order.orderItems.push(orderItem);
        }
        order.freight = parseFloat(orderData.freight);
        order.coupon = new OrderCoupon(orderData.coupon_code, orderData.coupon_percentage);
		return order; 
    }

    async findAll (): Promise<Order[]> {
        const ordersData = await this.connection.query("select * from ccca_checkout.order", []);
        const orders = ordersData.map((orderData: any) => new Order(orderData.cpf, orderData.issue_date, orderData.sequence, orderData.id_order));
        return orders;
    }
}