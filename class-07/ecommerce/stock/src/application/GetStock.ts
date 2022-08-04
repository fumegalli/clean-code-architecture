import StockCalculator from "../domain/entities/StockCalculator";
import StockEntryRepository from "../domain/repositories/StockEntryRepository";

export default class GetStock {

    constructor (readonly stockEntryRepository: StockEntryRepository) {}

    async execute (idItem: number): Promise<Output> {
        const entries = await this.stockEntryRepository.findByIdItem(idItem);
        const quantity = StockCalculator.calculate(entries);
        return {
            quantity,
        } 
    }
}

type Output = {
    quantity: number,
}
