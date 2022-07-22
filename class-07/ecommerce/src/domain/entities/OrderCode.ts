export default class OrderCode {
    value: string;

    constructor (readonly date: Date, readonly sequence: number) {
        this.value = this.generateCode(date, sequence);
    }

    generateCode (date: Date, sequence: number) {
        const year = date.getFullYear();
        const sequenceCode = new String(sequence).padStart(8, "0");
        return `${year}${sequenceCode}`;
    }
}
