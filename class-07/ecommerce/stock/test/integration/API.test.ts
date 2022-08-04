import axios from "axios";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import StockEntryRepositoryDatabase from "../../src/infra/repositories/StockEntryRepositoryDatabase";

test("should calculate freight", async () => {
    const connection = new PgPromiseAdapter();
    const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
    await stockEntryRepository.clean();
    await axios({
        url: "http://localhost:3002/increment",
        method: "post",
        data: [
           { idItem: 1, quantity: 10 }
        ]
    });
    await axios({
        url: "http://localhost:3002/decrement",
        method: "post",
        data: [
           { idItem: 1, quantity: 5 }
        ]
    });
    const response = await axios({
        url: "http://localhost:3002/calculate/1",
        method: "get",
    });
    const output = response.data;
    expect(output.quantity).toBe(5);
    await connection.close();
});
