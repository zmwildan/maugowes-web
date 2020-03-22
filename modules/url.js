/**
 * function to get id form url path
 * @param {string} title
 */
export function extractPath(title) {
  let titleArr = title.split("-")
  const id = titleArr[titleArr.length - 1]

  // remove last data
  titleArr.splice(titleArr.length - 1, 1)

  return {
    id,
    title: titleArr.join(" ")
  }
}
