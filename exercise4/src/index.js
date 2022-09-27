function convert(number) {
    let result = "";

    if ( number === 4 ) {
        return "IV";
    }

    if (number === 5 ){
        return "V";
    }

    if (number === 6 ) {
        return "VI";
    }

    for(let i = 0; i < number; i++)  {
        result += "I";
    }
    return result;
}

module.exports = convert;