import axios from "axios";

test("should get item by API", async () => {
    const response = await axios({
        url: "http://localhost:3003/items/1",
        method: "get",
    });
    const output = response.data;
    expect(output.description).toBe("Guitarra");
    expect(output.price).toBe(1000);
});
