import StockEntry from "../entities/StockEntry";

export default interface StockEntryRepository {
    clean (): Promise<void>;
    save (entry: StockEntry): Promise<void>;
    findByIdItem (idItem: number): Promise<StockEntry[]>;
}
