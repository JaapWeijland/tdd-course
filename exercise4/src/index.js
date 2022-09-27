function convert(number) {
    let result = "";
    if (number === 4) return "IV";
    for(let i = 0; i < number; i++) {
        result += "I";
    }
    return result;
}

module.exports = convert;