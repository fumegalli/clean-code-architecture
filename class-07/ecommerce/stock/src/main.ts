import ExpressAdapter from "./infra/http/ExpressAdapter";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import StockController from "./infra/controller/StockController";
import DecrementStock from "./application/DecrementStock";
import StockEntryRepositoryDatabase from "./infra/repositories/StockEntryRepositoryDatabase";
import IncrementStock from "./application/IncrementStock";
import GetStock from "./application/GetStock";
import StockQueue from "./infra/queue/StockQueue";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";

async function init () {
    const http = new ExpressAdapter();
    const connection = new PgPromiseAdapter();
    const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
    const decrementStock = new DecrementStock(stockEntryRepository);
    const incrementStock = new IncrementStock(stockEntryRepository);
    const getStock = new GetStock(stockEntryRepository);
    
    new StockController(http, incrementStock, decrementStock, getStock);

    const queue = new RabbitMQAdapter();
    await queue.connect();
    new StockQueue(queue, decrementStock);

    http.listen(3002);
}

init();
