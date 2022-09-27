function convert(number) {
    let result = "";

    if (number >= 5 ){
        result += "V";
        number -= 5;
    }

    if ( number >= 4 ) {
        result += "IV";
        number -= 4;
    }

    for(let i = 0; i < number; i++)  {
        result += "I";
    }
    return result;
}

module.exports = convert;