import ExpressAdapter from "./infra/http/ExpressAdapter";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import FreightController from "./infra/controller/FreightController";

const http = new ExpressAdapter();
const connection = new PgPromiseAdapter();
new FreightController(http, connection);
http.listen(3001);
