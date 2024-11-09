import * as consts from "@wordpretty/shared/lib/consts"
import {
  createDocument,
  execFuncOnElementNode,
  execFuncOnTextNode,
  wrapTextNode,
  wrapUrlPattern,
} from "../utils/dom"

import type { PluginConfig, WordPrettyItem } from "@wordpretty/shared/lib/types"
import type { Document } from "happy-dom"

export const createImageTag = (item: WordPrettyItem): string => {
  const src = `${consts.PLUGIN_WEB_EP}/images/${item.image}`
  return `<img src="${src}" alt="" class="image" style="width: ${item.size}px; height: auto; margin-block: 2px;">`
}

export function replaceItemPattern(document: Document, item: WordPrettyItem) {
  execFuncOnTextNode(document, (child) => {
    const pattern = new RegExp(item.pattern.replaceAll("\n", "|"), "g")
    let content = child.textContent
    content = content.replaceAll(pattern, (p) => {
      return createImageTag(item)
    })
  })
}

export function addMarginStyle(document: Document) {
  execFuncOnElementNode(document, (child) => {
    const sibling = child.nextElementSibling
    if (sibling) {
      const c = child.classList.contains("image")
      const s = sibling.classList.contains("image")
      if ((c && !s) || (!c && s)) {
        child.style.marginRight = "4px"
      }
    }
  })
}

export default function applyWordPretty(
  text: string,
  config: PluginConfig,
): string {
  const document = createDocument(text)
  wrapUrlPattern(document)

  for (const item of config.wordPretty.items) {
    replaceItemPattern(document, item)
  }

  wrapTextNode(document)
  addMarginStyle(document)
  return document.body.innerHTML
}
