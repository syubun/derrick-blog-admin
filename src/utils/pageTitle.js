import { title, titleReverse, titleSeparator } from '@/config'

/**
 *
 * @description 設置標題
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle) {
  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (title) newTitles.push(title)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join(titleSeparator)
}
