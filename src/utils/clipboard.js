import Clipboard from 'clipboard'
import { message } from 'ant-design-vue'

function clipboardSuccess(text) {
  message.success(`複製${text}成功`)
}

function clipboardError(text) {
  message.error(`複製${text}失敗`)
}

/**
 * @description 複製數據
 * @param text
 * @param event
 */
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  })
  clipboard.on('success', () => {
    clipboardSuccess(text)
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(text)
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
