import * as consts from "@wordpretty/core/src/consts"
import { render } from "dom-serializer"
import { DomUtils } from "htmlparser2"
import {
  execFuncOnElementNode,
  execFuncOnTextNode,
  wrapTextNode,
  wrapUrlPattern,
} from "../utils/dom"

import type { PluginConfig, WordPrettyItem } from "@wordpretty/core/src/types"

export default function applyWordPretty(
  text: string,
  config: PluginConfig,
): string {
  text = wrapUrlPattern(text)

  for (const item of config.wordPretty.items) {
    text = replaceItemPattern(text, item)
  }

  text = wrapTextNode(text)
  text = addImageMargin(text)
  return text
}

export function replaceItemPattern(text: string, item: WordPrettyItem): string {
  if (!item.enabled) return text
  text = execFuncOnTextNode(text, (child) => {
    const patterns = item.pattern.split("\n").map((pattern) => `(${pattern})`)
    const ip = new RegExp(patterns.join("|"), "g")
    return child.data.replaceAll(ip, (_) => {
      return createImg(item)
    })
  })
  return text
}

export function createImg(item: WordPrettyItem): string {
  const src = `${consts.PLUGIN_WEB_EP}/images/${item.image}`
  return `<img src="${src}" alt="${item.name}" class="illust illust-${item.id}">`
}

export function addImageMargin(text: string): string {
  text = execFuncOnElementNode(text, (child) => {
    const sibling = DomUtils.nextElementSibling(child)
    if (sibling) {
      const cc = child.attribs.class
      const sc = sibling.attribs.class
      const cb = cc ? cc.includes("illust") : false
      const sb = sc ? sc.includes("illust") : false
      if ((cb && !sb) || (!cb && sb)) {
        const cl = child.attribs.class
        child.attribs.class = `${cl ? `${cl} ` : ""}margin`
      }
    }
    return render(child, { encodeEntities: false })
  })
  return text
}
