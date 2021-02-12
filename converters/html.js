const mammoth = require('mammoth')
const path = require('path')

const config = require('../book.config')
const createHtml = require('../utils/createHtmlFile')

function convertToHTML() {
  const entryPath = path.resolve(config.entry)

  mammoth
    .convertToHtml({ path: entryPath })
    .then(function (result) {
      const htmlDocument = result.value
      createHtml(htmlDocument, config)
    })
    .done()
}

convertToHTML()
