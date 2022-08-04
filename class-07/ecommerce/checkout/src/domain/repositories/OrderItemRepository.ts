import OrderItem from "../entities/OrderItem";

export default interface OrderItemRepository {
    findByOrder (id: number): Promise<OrderItem[]>;
}
