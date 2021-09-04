/**
 * image 轉換 Base64
 * @param {*} img
 * @param {*} callback
 */
export function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
