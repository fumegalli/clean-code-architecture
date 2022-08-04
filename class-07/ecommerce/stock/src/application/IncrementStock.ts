import StockEntry from "../domain/entities/StockEntry";
import StockEntryRepository from "../domain/repositories/StockEntryRepository";

export default class IncrementStock {

    constructor (readonly stockEntryRepository: StockEntryRepository) {}

    async execute (input: Input): Promise<void> {
        for (const entry of input) {
            const stockEntry = new StockEntry(entry.idItem, "in", entry.quantity);
            await this.stockEntryRepository.save(stockEntry);
        }
    }
}

type Input = {
    idItem: number,
    quantity: number,
}[]
