import Checkout from "../../src/application/Checkout";
import * as CalculateFreightGateway from "../../src/application/gateway/CalculateFreightGateway";
import * as DecrementStockGateway from "../../src/application/gateway/DecrementStockGateway";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import GetItemHttpGateway from "../../src/infra/gateway/GetItemHttpGateway";
import OrderRepositoryDatabase from "../../src/infra/repositories/database/OrderRepositoryDatabase";

test("should checkout", async () => {
    const connection = new PgPromiseAdapter();
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
    const getItemGateway = new GetItemHttpGateway();
    const checkout = new Checkout(orderRepository, calculateFreightGateway, decrementStockGateway, getItemGateway);
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
