import GetItem from "./application/GetItem";
import ItemController from "./infra/controller/http/ItemController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ItemRepositoryDatabase from "./infra/repositories/database/ItemRepositoryDatabase";

const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const getItem = new GetItem(itemRepository);

new ItemController(http, getItem);

http.listen(3003);
