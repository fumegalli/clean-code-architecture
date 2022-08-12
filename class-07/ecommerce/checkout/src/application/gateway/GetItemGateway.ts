import Item from "../../domain/entities/Item";

export default interface GetItemGateway {
    execute (id: number): Promise<Item>
}
