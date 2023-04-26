# [XLSX.js](https://docs.sheetjs.com/docs/api/) API &mdash; Cheatsheet

## Parsing Functions

> `XLSX.read(data:any[, read_opts:<ReadOptions>])` attempts to parse `data`

> `XLSX.readFile(filename:string[, read_opts:<ReadOptions>])` attempts to read `filename` and parse

* See [Parsing Options](https://docs.sheetjs.com/docs/api/parse-options/) for `ReadOptions`

----

## Writing Functions

> `XLSX.write(workbook:<Workbook>, options:<WriteOptions>)` attempts to write the `workbook` and return the file

> `XLSX.writeFile(workbook:<Workbook>, filename:string[, options:<WriteOptions>])`

* See [Writing Options](https://docs.sheetjs.com/docs/api/write-options/#writing-options) for `WriteOptions`

----

## Utilities

> [`XLSX.utils.aoa_to_sheet(aoa:array[, options:<Options>])`](https://docs.sheetjs.com/docs/api/utilities/#array-of-arrays-input) takes an array of arrays of JS values and returns a worksheet resembling the input data

> [`XLSX.utils.json_to_sheet(aoo:array[, options:<Options>])`](https://docs.sheetjs.com/docs/api/utilities/#array-of-objects-input) takes an array of objects and returns a worksheet with automatically-generated "headers" based on the keys of the objects. The default column order is determined by the first appearance of the field using `Object.keys`

> [`XLSX.utils.table_to_sheet(element:Element[, options:<Options>])`](https://docs.sheetjs.com/docs/api/utilities/#html-table-input) takes a table DOM element and returns a worksheet resembling the input table. Numbers are parsed. All other data will be stored as strings

> [`XLSX.utils.table_to_book(element:Element[, options:<Options>])`](https://docs.sheetjs.com/docs/api/utilities/#html-table-input) produces a minimal workbook based on the worksheet

> [`XLSX.utils.sheet_to_csv(worksheet:<Worksheet>[, options:<Options>])`](https://docs.sheetjs.com/docs/api/utilities/#delimiter-separated-output) produces CSV output

> [`XLSX.utils.sheet_to_html(worksheet:<Worksheet>[, options:<Options>])`](https://docs.sheetjs.com/docs/api/utilities/#html-output) produces HTML output

> [`XLSX.utils.sheet_to_json(worksheet:<Worksheet>[, options:<Options>])`](https://docs.sheetjs.com/docs/api/utilities/#array-output) generates an array of JS objects

> [`XLSX.utils.sheet_to_formulae(worksheet:<Worksheet>[, options:<Options>])`](https://docs.sheetjs.com/docs/api/utilities/#formulae-output) generates an array of commands that represent how a person would enter data into an application
