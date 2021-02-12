const epubCSS = `
  #toc {
      page-break-inside: avoid;
  }

  h4 {
      text-align: right;
      font-weight: normal
  }

  body {
      word-break: break-word;
  }

  ol {
      list-style: none
  }
`

module.exports = {
  epubCSS
}
