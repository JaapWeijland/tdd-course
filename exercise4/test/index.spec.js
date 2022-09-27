const assert = require("assert");
const convert = require("../src/index");

describe("Roman literals", () => {
    [
        { input: 1, output: "I" }, 
        { input: 2, output: "II" },
        { input: 4, output: "IV" },
        { input: 5, output: "V" },
        { input: 6, output: "VI" },
        { input: 8, output: "VIII"},
        { input: 9, output: "IX"},
        { input: 19, output: "XIX" },
        {input: 21, output: "XXI"}
    ].forEach(({ input, output }) => {
        it(`should translate number ${input} to roman literal ${output}`, () => {
            const result = convert(input);
            assert.strictEqual(result, output);
        })
    })
})