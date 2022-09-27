function convert(number) {
    let result = "";

    if ( number === 4 ) {
        return "IV";
    }

    if (number === 5 ){
        return "V";
    }

    for(let i = 0; i < number; i++)  {
        result += "I";
    }
    return result;
}

module.exports = convert;