function convert(number) {
    const list = [
        {number: 9, roman: "IX"},
        {number: 5, roman: "V"}, 
        {number: 4, roman: "IV"}
    ]

    let result = list.reduce((result, current) => {
        if (number >= current.number)
        {   
            number -= current.number;
            return result + current.roman;
        }
        return result;
    }, "")

    console.log(result);

    for(let i = 0; i < number; i++)  {
        result += "I";
    }
    return result;
}

module.exports = convert;