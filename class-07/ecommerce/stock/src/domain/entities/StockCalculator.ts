import StockEntry from "./StockEntry";

export default class StockCalculator {

    static calculate (entries: StockEntry[]): number {
        return entries.reduce((total, entry) => {
            if (entry.operation === "in") {
                total += entry.quantity;
            } else {
                total -= entry.quantity;
            }
            return total;
        }, 0);
    }
}
