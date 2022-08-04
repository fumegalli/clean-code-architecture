import City from "../../domain/entities/City";
import CityRepository from "../../domain/repositories/CityRepository";
import Connection from "../database/Connection";

export default class CityRepositoryDatabase implements CityRepository {

    constructor (readonly connection: Connection) {}

    async findByZipcode (code: string): Promise<City> {
        const [cityData] = await this.connection.query("select id_city, name, lat, long from ccca_freight.zipcode join ccca_freight.city using (id_city) where code = $1", [code]);
        if (!cityData) throw new Error("City not found");
        return new City(parseInt(cityData.id_city), cityData.name, parseFloat(cityData.lat), parseFloat(cityData.long));
    }
}
