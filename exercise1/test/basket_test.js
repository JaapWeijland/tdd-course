const assert = require('assert');
const total = require('../src/basket');

describe("Total of shopping basket", () => {
    it("is zero when empty", () => {
        const basket = [];
        assert.strictEqual(0.0, total(basket))
    })

    it("is price of a single item", () => {
        const basket = [{ price: 100, quantity: 1 }];
        assert.strictEqual(100.0, total(basket))
    })

    it('is sum of prices of two items', () => {
        const basket = [{ price: 100, quantity: 1 }, { price: 50, quantity: 1}];
        assert.strictEqual(150.0, total(basket))
    })

    it('is sum of prices of items with various quantities', () => {
        const basket = [{ price: 100, quantity: 1 }, { price: 50, quantity: 2}];
        assert.strictEqual(200.0, total(basket))
    })
})