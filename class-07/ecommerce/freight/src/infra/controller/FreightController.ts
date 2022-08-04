import CalculateFreight from "../../application/CalculateFreight";
import Connection from "../database/Connection";
import Http from "../http/Http";
import CityRepositoryDatabase from "../repositories/CityRepositoryDatabase";

export default class FreightController {
	
    constructor (readonly http: Http, readonly connection: Connection) {
		http.on("post", "/freights/calculate", function (_: any, body: any) {
			const cityRepository = new CityRepositoryDatabase(connection);
			const calculateFreight = new CalculateFreight(cityRepository);
			const output = calculateFreight.execute(body);
			return output;
		});
	}
}
