import City from "../entities/City";

export default interface CityRepository {
    findByZipcode (code: string): Promise<City>;
}
