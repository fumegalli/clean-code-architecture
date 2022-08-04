import StockEntry from "../../domain/entities/StockEntry";
import StockEntryRepository from "../../domain/repositories/StockEntryRepository";
import Connection from "../database/Connection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {

    constructor (readonly connection: Connection) {}
    
    
    async clean (): Promise<void> {
        await this.connection.query("delete from ccca_stock.stock_entry", []);
    }
    
    async save (entry: StockEntry): Promise<void> {
        await this.connection.query(
            "insert into ccca_stock.stock_entry (id_item, operation, quantity) values ($1, $2, $3)",
            [entry.idItem, entry.operation, entry.quantity],
        );
    }

    async findByIdItem(idItem: number): Promise<StockEntry[]> {
        const entriesData = await this.connection.query(
            "SELECT operation, quantity FROM ccca_stock.stock_entry WHERE id_item = $1",
            [idItem],
        );
        return entriesData.map((entry: any) => new StockEntry(idItem, entry.operation, entry.quantity))
    }
}
