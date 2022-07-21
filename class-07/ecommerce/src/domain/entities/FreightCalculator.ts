import Item from "./Item";

export default class FreightCalculator {
    private static DISTANCE = 1000;
    private static MIN_FREIGHT = 10;

    static calculate (item: Item): number {
        const freight = item.getVolume() * FreightCalculator.DISTANCE * (item.getDensity()/100);
        if (freight === 0) return 0;
        return Math.max(freight, FreightCalculator.MIN_FREIGHT);
    }
}
