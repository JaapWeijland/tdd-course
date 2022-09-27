const assert = require("assert");
const convert = require("../src/index");

describe("Roman literals", () => {
    [{ input: 1, output: "I" }, { input: 2, output: "II"}].forEach(({ input, output }) => {
        it(`should translate number ${input} to roman literal ${output}`, () => {
            const result = convert(input);
            assert(result).strictEqual(output);
        })
    })
})