module.exports = function createTocStructure(arr) {
  const result = []

  for (let i = 0; i < arr.length; i++) {
    const newElement = { index: i }

    if (arr[i].excludeFromToc) continue

    const { length, [length - 1]: lastElement } = result

    if (!lastElement) {
      result.push(newElement)
      continue
    }

    if (arr[lastElement.index].level < arr[i].level) {
      lastElement.children = [...(lastElement.children || []), newElement]
    } else {
      result.push(newElement)
    }
  }

  return result
}
