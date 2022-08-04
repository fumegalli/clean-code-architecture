import CalculateFreightGateway, { Input } from "../../src/application/gateway/CalculateFreightGateway";
import SimulateFreight from "../../src/application/SimulateFreight";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ItemRepositoryDatabase from "../../src/infra/repositories/database/ItemRepositoryDatabase";

test("should simulate freight", async () => {
    const connection = new PgPromiseAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const calculateFreightGateway: CalculateFreightGateway = {
        async calculate(input: Input) {
            return { total: 202.09 };
        }
    };
    const simulateFreight = new SimulateFreight(itemRepository, calculateFreightGateway);
    const output = await simulateFreight.execute({
        from: "22060030",
        to: "88015600",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 },
        ]
    });
    expect(output.total).toBe(202.09);
    await connection.close();
});
