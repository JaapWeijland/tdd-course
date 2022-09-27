const _replacements = [
    {power: 0, small: "I", medium: "V", large: "X"},
    {power: 1, small: "X", medium: "L", large: "C"},
    {power: 2, small: "C", medium: "D", large: "M"},
];
const TEN = 10
const INDEXES = [9, 5, 4];

const constructRoman = (numberLeft, sequence, magnitude) => {
    if (numberLeft >= INDEXES[0] * magnitude) { 
        return {roman: sequence.small + sequence.large, number: INDEXES[0] * magnitude}
    } else if (numberLeft >= INDEXES[1] * magnitude) { 
        return {roman: sequence.medium, number: INDEXES[1] * magnitude}
    } else if (numberLeft >= INDEXES[2]  * magnitude) { 
        return {roman: sequence.small + sequence.medium, number: INDEXES[2] * magnitude}
    } else {
        return {roman: sequence.small, number: magnitude}
    }
}

const replaceHighestRomanVariant = (numberLeft) => {
    if (numberLeft === 0) return "";

    const powerOfTen = Math.floor(Math.log10(numberLeft)) ;    
    const replacement = _replacements.find(({ power }) => {
        return power === powerOfTen;
    });

    const romanPartial = constructRoman(numberLeft, replacement, Math.pow(TEN, powerOfTen));
    return romanPartial.roman + replaceHighestRomanVariant(numberLeft - romanPartial.number);
}

function convert(number) {
    return replaceHighestRomanVariant(number);
}



module.exports = convert;