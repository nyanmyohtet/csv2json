const { readFileSync, writeFileSync } = require('fs')
const { parse } = require('papaparse')

let readFilePath
let outFilePath

process.argv.forEach(function (val, index, array) {
  switch (index) {
    case 2:
      readFilePath = val
      break
    case 3:
      outFilePath = val
      break
    default:
      break
  }
})

/**
 * Convert CSV to JSON
 * @param {String} inputFilePath
 * @param {String} outputFilePath
 */
function csv2json(inputFilePath, outputFilePath) {
  const encoding = 'utf8'

  try {
    const csvResults = parse(readFile(readFilePath, encoding), {
      header: true,
      complete: csvData => csvData.data
    }).data

    writeFile(outFilePath, csvResults, encoding)
  } catch (e) {
    throw Error(e)
  }
}

/**
 * Read CSV file to get JSON data
 * @param {String} path Output file path
 * @param {String} encoding
 * @returns {JSON}
 */
function readFile(path, encoding) {
  return readFileSync(path, encoding)
}

/**
 * Write JSON file within given data
 * @param {String} path Output file path
 * @param {JSON} data JSON data
 * @param {String} encoding
 */
function writeFile(path, data, encoding) {
  writeFileSync(path, JSON.stringify(data, null, 4), encoding)
}

module.exports = csv2json
