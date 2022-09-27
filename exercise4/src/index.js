const replacements = [
    {number: 10, roman: "X"},
    {number: 9, roman: "IX"},
    {number: 5, roman: "V"},
    {number: 4, roman: "IV"},
    {number: 1, roman: "I"}
]

const replaceHighestRomanVariant = (numberLeft) => {
    if (numberLeft === 0) return "";

    const replacement = replacements.find(({ number }) => {
        return number <= numberLeft;
    });

    return replacement.roman + replaceHighestRomanVariant(numberLeft - replacement.number);
}

function convert(number) {
    return replaceHighestRomanVariant(number);
}



module.exports = convert;