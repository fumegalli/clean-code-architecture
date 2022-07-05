export default class Freight {
    private readonly DISTANCE = 1000;
    private readonly MIN_COST = 10; 

    constructor (
        readonly volumeCubicMeters: number,
        readonly densityKgByCubicMeters: number
    ) {}

    getTotalCost (): number {
        const cost = this.DISTANCE * this.volumeCubicMeters * (this.densityKgByCubicMeters / 100);

        return (cost < this.MIN_COST) ? this.MIN_COST : cost;
    }
}
