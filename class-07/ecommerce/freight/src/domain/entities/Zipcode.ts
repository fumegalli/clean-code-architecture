export default class Zipcode {
    constructor (
        readonly code: number,
        readonly idCity: number,
        readonly street: string,
        readonly neighborhood: string,
    ) {}
}
