import ExpressAdapter from "./infra/http/ExpressAdapter";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import StockController from "./infra/controller/StockController";
import DecrementStock from "./application/DecrementStock";
import StockEntryRepositoryDatabase from "./infra/repositories/StockEntryRepositoryDatabase";
import IncrementStock from "./application/IncrementStock";
import GetStock from "./application/GetStock";

const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
const decrementStock = new DecrementStock(stockEntryRepository);
const incrementStock = new IncrementStock(stockEntryRepository);
const getStock = new GetStock(stockEntryRepository);

new StockController(http, incrementStock, decrementStock, getStock);

http.listen(3002);
