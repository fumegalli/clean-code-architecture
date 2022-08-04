import Checkout from "../../src/application/Checkout";
import * as CalculateFreightGateway from "../../src/application/gateway/CalculateFreightGateway";
import * as DecrementStockGateway from "../../src/application/gateway/DecrementStockGateway";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ItemRepositoryDatabase from "../../src/infra/repositories/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repositories/database/OrderRepositoryDatabase";

test("should checkout", async () => {
    const connection = new PgPromiseAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const orderRepository = new OrderRepositoryDatabase(connection);
    await orderRepository.clean();
    const calculateFreightGateway: CalculateFreightGateway.default = {
        async calculate(input: CalculateFreightGateway.Input) {
            return { total: 202.09 };
        }
    };
    const decrementStockGateway: DecrementStockGateway.default = {
        async decrement(input: DecrementStockGateway.Input) { }
    };
    const checkout = new Checkout(itemRepository, orderRepository, calculateFreightGateway, decrementStockGateway);
    const output = await checkout.execute({
        from: "22060030",
        to: "880015600",
        cpf: "88663485468",
        date: new Date("2022-03-01T10:00:00"),
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ]
    });

    expect(output.total).toBe(6292.09);
    expect(output.code).toBe("202200000001");

    await connection.close();
});
