
export default class Cpf {
    private FIRST_DIGIT_FACTOR = 10;
    private SECOND_DIGIT_FACTOR = 11;
    readonly value: string;

    constructor(value: string) {
        if(!this.isValid(value)) throw new Error('Invalid CPF');
        this.value = value;
    }

    getValue(): string {
        return this.value;
    }

    private isValid (rawCpf: string | null | undefined): boolean {
        if (!rawCpf) return false;

        const cpf = this.cleanCpf(rawCpf);

        if (this.isInvalidLength(cpf)) return false;

        if (this.isIdenticalDigits(cpf)) return false;

        const calculatedCheckDigit1 = this.calculateCheckDigit(cpf, this.FIRST_DIGIT_FACTOR);
        const calculatedCheckDigit2 = this.calculateCheckDigit(cpf, this.SECOND_DIGIT_FACTOR);
        const calculatedCheckDigit = `${calculatedCheckDigit1}${calculatedCheckDigit2}`;
        
        let checkDigit = this.extractCheckDigit(cpf);

        return checkDigit === calculatedCheckDigit;
    }

    private cleanCpf (cpf: string): string {
        return cpf.replace(/\D/g, "");
    }

    private isInvalidLength (cpf: string): boolean {
        return cpf.length !== 11;
    }

    private isIdenticalDigits (cpf: string): boolean {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }

    private calculateCheckDigit (cpf: string, factor: number): number {
        const total = [...cpf].reduce((total, digit) => {
            if (factor > 1) total += parseInt(digit) * factor--;
            return total;
        }, 0);
        const rest = total%11;
        return (rest < 2) ? 0 : 11 - rest;
    }

    private extractCheckDigit (cpf: string): string {
        return cpf.slice(-2);
    }

}
