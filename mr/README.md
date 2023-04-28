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

--------

# RAMPOD URL Variables
## System / Network
*Incomplete*

- What airframe are you looking for?

| Airframe | ID#   |
| -------- | ----- |
| A10      | 22439 |
| B1B      | 533   |
| B2       | 6395  |
| F15      | 531   |
| F16      | 6228  |

----

## Location
*Incomplete*

- The base you want to query from

| Base ID      | ID# |
| ------------ | --- |
| AL_UDEID     | 194 |
| DYESS        | 524 |
| ELLSWORTH    | 513 |
| ROBINS_MXS   | 528 |
| ROBINS_WRALC | 145 |
| TINKER       | 530 |

----

## Workcenter
*Incomplete*

- Your specific workcenter. Leave blank to default to `ANY`

| Workcenter symbol | ID#   |
| ----------------- | ----- |
| ALL               | 'ALL' |
| ANY               | 0     |
| A2SPC             | 5665  |
| AAAIS             | 584   |
| AACRD             | 38550 |
| AAGE1             | 5458  |
| AASMU             | 4874  |
| AAVAI             | 6333  |
| AAVTS             | 6512  |
| ACATS             | 583   |
| ACCRD             | 29312 |
| ACCRW             | 33087 |
| ACRDD             | 595   |
| ACREW             | 46751 |
| ACRRD             | 27737 |
| ACRRW             | 594   |
| ACRTS             | 596   |
| ACRWW             | 34179 |
| AEEC7             | 32972 |
| AELME             | 5571  |
| AEMCC             | 5024  |
| AEMSR             | 5054  |
| AFAIS             | 6513  |
| AIATS             | 599   |
| AISDA             | 597   |
| AISFS             | 598   |
| ALUD1             | 6403  |
| AMETT             | 6577  |
| AMEWS             | 581   |
| AMVFO             | 582   |
| AMXPC             | 45624 |
| AMXWR             | 42115 |
| AOAS7             | 4886  |
| ARSPC             | 5070  |
| ASTMT             | 5766  |
| ATECH             | 5814  |
| B1DEP             | 6363  |
| B2DEP             | 24989 |
| BATTS             | 6492  |
| CAATS             | 6502  |
| EAISI             | 23291 |
| EAUTS             | 6819  |
| GAISM             | 5352  |
| HAISS             | 6592  |
| KIAIS             | 6486  |
| LAIS1             | 22521 |
| LMTCH             | 44424 |
| LRAGE             | 45071 |
| MIFIB             | 3575  |
| OCALC             | 5060  |
| WRALC             | 534   |
| XAISS             | 7811  |
