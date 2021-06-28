const docgen = require("react-docgen-typescript")

const options = {
  savePropValueAsString: true,
}

// Parse a file for docgen info
const r = docgen.parse("./src/index.ts", options)

console.log(r)
