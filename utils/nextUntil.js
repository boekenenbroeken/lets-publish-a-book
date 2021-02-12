module.exports = function nextUntil(elem, selector, filter) {
  const siblings = []

  elem = elem.nextElementSibling

  while (elem) {
    if (elem.matches(selector)) break

    if (filter && !elem.matches(filter)) {
      elem = elem.nextElementSibling
      continue
    }

    siblings.push(elem)

    elem = elem.nextElementSibling
  }

  return siblings
}
