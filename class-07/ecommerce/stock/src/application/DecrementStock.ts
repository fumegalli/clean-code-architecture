import StockCalculator from "../domain/entities/StockCalculator";
import StockEntry from "../domain/entities/StockEntry";
import StockEntryRepository from "../domain/repositories/StockEntryRepository";

export default class DecrementStock {

    constructor (readonly stockEntryRepository: StockEntryRepository) {}

    async execute (input: Input): Promise<void> {
        for (const entry of input) {
            const entries = await this.stockEntryRepository.findByIdItem(entry.idItem);
            const currentStockQuantity = StockCalculator.calculate(entries);
            if (currentStockQuantity < entry.quantity) throw new Error("Insufficient stock"); 
            const stockEntry = new StockEntry(entry.idItem, "out", entry.quantity);
            await this.stockEntryRepository.save(stockEntry);
        }
    }
}

type Input = {
    idItem: number,
    quantity: number,
}[]
