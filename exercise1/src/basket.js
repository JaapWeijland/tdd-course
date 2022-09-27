function subtotal({price, quantity}) {
    return price * quantity
}

function total(basket) {
    return basket.reduce((total, line) => {
        return total + subtotal(line);
    }, 0)
}

module.exports = total;