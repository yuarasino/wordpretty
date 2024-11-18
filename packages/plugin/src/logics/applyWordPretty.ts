import * as consts from "@wordpretty/core/src/consts"
import {
  createDocument,
  execFuncOnElementNode,
  execFuncOnTextNode,
  updateNodeWithHtmlContent,
  wrapTextNode,
  wrapUrlPattern,
} from "../utils/dom"

import type { PluginConfig, WordPrettyItem } from "@wordpretty/core/src/types"
import type { Document } from "happy-dom"

export function createImageTag(item: WordPrettyItem): string {
  const src = `${consts.PLUGIN_WEB_EP}/images/${item.image}`
  return `<img src="${src}" alt="" class="image" style="width: auto; height: ${item.size}px; margin-block: 2px;">`
}

export function replaceItemPattern(document: Document, item: WordPrettyItem) {
  if (!item.enabled) return
  execFuncOnTextNode(document, (child) => {
    const patterns = item.pattern.split("\n").map((pattern) => `(${pattern})`)
    const p = new RegExp(patterns.join("|"), "g")
    let content = child.textContent ?? ""
    content = content.replaceAll(p, (_) => {
      return createImageTag(item)
    })
    updateNodeWithHtmlContent(document, child, content)
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
