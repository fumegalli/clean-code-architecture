import GetItem from "../../src/application/GetItem";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ItemRepositoryDatabase from "../../src/infra/repositories/database/ItemRepositoryDatabase";

test("should get item", async () => {
    const connection = new PgPromiseAdapter();
    const itemRepository = new ItemRepositoryDatabase(connection);
    const getItem = new GetItem(itemRepository);
    const item = await getItem.execute(1);
    expect(item.description).toBe("Guitarra");
    expect(item.price).toBe(1000);
    await connection.close();
});
