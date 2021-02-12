const fs = require('fs')
const path = require('path')
const Epub = require('epub-gen')
const { JSDOM } = require('jsdom')

const config = require('../book.config')
const nextUntil = require('../utils/nextUntil')
const createTocStructure = require('../utils/createTocStructure')
const { epubCSS } = require('../epub/styles')

function generateEpub(config) {
  const htmlPath = path.resolve(`${config.dist}/${config.fileName}.html`)
  const epubPath = path.resolve(`${config.dist}/${config.fileName}.epub`)
  const customHtmlTocTemplatePath = config.tocTemplatePath
    ? path.resolve(config.tocTemplate)
    : path.resolve('epub/toc.xhtml.ejs')
  const coverPath = path.resolve(config.cover)

  const htmlString = fs.readFileSync(htmlPath, 'utf8')
  const { document } = new JSDOM(htmlString).window

  const chapters = [...document.querySelectorAll(config.chaptersSelector)].map(
    heading => {
      const [_, level] = /h(\d)/i.exec(heading.tagName)

      return {
        data: nextUntil(heading, config.chaptersSelector)
          .map(item => item.outerHTML)
          .join(''),
        title: heading.textContent,
        excludeFromToc: heading.matches('h1'),
        level: parseInt(level)
      }
    }
  )

  const tocContent = createTocStructure(chapters)

  const options = {
    title: config.title,
    verbose: true,
    author: config.author,
    publisher: config.publisher,
    cover: coverPath,
    content: chapters,
    lang: config.lang,
    tocTitle: config.tocTitle,
    customHtmlTocTemplatePath,
    tocContent,
    css: epubCSS
  }

  new Epub(options, epubPath)
}

generateEpub(config)
