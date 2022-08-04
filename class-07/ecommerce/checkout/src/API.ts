import ExpressAdapter from "./infra/http/ExpressAdapter";
import OrderController from "./infra/controller/http/OrderController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";

const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
new OrderController(http, connection);
http.listen(3000);
