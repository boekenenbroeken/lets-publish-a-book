const fs = require('fs/promises')
const path = require('path')

module.exports = async function (document, config) {
  try {
    await fs.mkdir(config.dist)
  } catch {}

  const distFolderPath = path.resolve(config.dist)
  const filePath = path.join(distFolderPath, config.fileName + '.html')
  const defaultTemplatePath = path.resolve('html/template.html')

  try {
    const templatePath = config.template
      ? path.resolve(config.template)
      : defaultTemplatePath
    const htmlTemplate = await fs.readFile(templatePath, 'utf8')
    const newDocument = htmlTemplate
      .replace(/#bodyDocument/g, document)
      .replace(/#documentTitle/g, config.title)

    await fs.writeFile(filePath, newDocument)
  } catch (error) {
    throw new Error(error)
  }
}
