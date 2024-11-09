import { describe, expect, test } from "bun:test"
import * as consts from "@wordpretty/shared/lib/consts"
import { deepCopy } from "@wordpretty/shared/lib/utils"
import applyWordPretty, {
  createImageTag,
} from "../../src/logics/applyWordPretty"

import type { WordPrettyItem } from "@wordpretty/shared/lib/types"

function createImageTagWithMargin(item: WordPrettyItem): string {
  const src = `${consts.PLUGIN_WEB_EP}/images/${item.image}`
  return `<img src="${src}" alt="" class="image" style="width: ${item.size}px; height: auto; margin-block: 2px; margin-right: 4px;">`
}

function createSpanTag(content: string): string {
  return `<span>${content}</span>`
}

function createSpanTagWithMargin(content: string): string {
  return `<span style="margin-right: 4px;">${content}</span>`
}

describe("applyWordPretty", () => {
  test("正常に実行できるか", () => {
    const text = "こん🐡"
    const config = deepCopy(consts.DEFAULT_CONFIG)

    const actual = applyWordPretty(text, config)
    const expected = `${createSpanTagWithMargin("こん")}${createImageTag(config.wordPretty.items[0])}`

    expect(actual).toBe(expected)
  })

  test("設定が複数あるときに実行できるか", () => {
    const text = "こんふぐ1フグ2"
    const config = deepCopy(consts.DEFAULT_CONFIG)
    config.wordPretty.items = [
      {
        ...consts.DEFAULT_ITEM,
        pattern: "ふぐ1\nフグ1\n🐡1",
      },
      {
        ...consts.DEFAULT_ITEM,
        pattern: "ふぐ2|フグ2|🐡2",
      },
    ]

    const actual = applyWordPretty(text, config)
    const expected = `${createSpanTagWithMargin("こん")}${createImageTag(config.wordPretty.items[0])}${createImageTag(config.wordPretty.items[1])}`

    expect(actual).toBe(expected)
  })

  test("URLがあるときに実行できるか", () => {
    const text = "こんfuguhttps://example.com/fugu/"
    const config = deepCopy(consts.DEFAULT_CONFIG)
    config.wordPretty.items = [
      {
        ...consts.DEFAULT_ITEM,
        pattern: "fugu",
      },
    ]

    const actual = applyWordPretty(text, config)
    const expected = `${createSpanTagWithMargin("こん")}${createImageTagWithMargin(config.wordPretty.items[0])}${createSpanTag("https://example.com/fugu/")}`

    expect(actual).toBe(expected)
  })
})
