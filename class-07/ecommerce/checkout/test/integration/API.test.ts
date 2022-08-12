import axios from "axios";

test("should call checkout endpoint", async () => {
    const response = await axios({
        url: "http://localhost:3000/orders/checkout",
        method: "post",
        data: {
            cpf: "88663485468",
            date: "2022-03-01T10:00:00",
            orderItems: [
                { idItem: 1, quantity: 1 },
                { idItem: 2, quantity: 1 },
                { idItem: 3, quantity: 3 },
            ]
        }
    });
    const output = response.data;

    expect(output.total).toBe(6350);
    expect(output.code).toBe("202200000001");
});
