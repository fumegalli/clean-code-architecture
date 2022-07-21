import Cpf from "../../src/domain/entities/Cpf";

test("should throw error when cpf is empty", () => {
    expect(() => new Cpf("")).toThrow(new Error("Invalid CPF"));
});

const invalidCpfs = [
    '11111111111',
    '111.111.111-11',
    '22222222222',
];

test.each(invalidCpfs)("should throw error when cpf is all same digit", (cpf) => {
    expect(() => new Cpf(cpf)).toThrow(new Error("Invalid CPF"));
});

const validCpfs = [
    '231.609.190-30',
    '935.411.347-80',
    '83705915070',
];

test.each(validCpfs)("should create valid cpf", (value) => {
    const cpf = new Cpf(value);

    expect(cpf.value).toBe(value);
});
