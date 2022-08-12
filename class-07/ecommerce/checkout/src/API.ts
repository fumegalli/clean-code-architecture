import ExpressAdapter from "./infra/http/ExpressAdapter";
import OrderController from "./infra/controller/http/OrderController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import Checkout from "./application/Checkout";
import OrderRepositoryDatabase from "./infra/repositories/database/OrderRepositoryDatabase";
import CalculateFreightHttpGateway from "./infra/gateway/CalculateFreightHttpGateway";
import GetItemHttpGateway from "./infra/gateway/GetItemHttpGateway";
import DecrementStockHttpGateway from "./infra/gateway/DecrementStockHttpGateway";

const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
const orderRepository = new OrderRepositoryDatabase(connection);
const calculateFreightGateway = new CalculateFreightHttpGateway();
const decrementStockGateway = new DecrementStockHttpGateway();
const getItemGateway = new GetItemHttpGateway();
const checkout = new Checkout(orderRepository, calculateFreightGateway, decrementStockGateway, getItemGateway);

new OrderController(http, checkout);

http.listen(3000);
