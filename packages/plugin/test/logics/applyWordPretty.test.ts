import { describe, expect, test } from "bun:test"
import * as consts from "@wordpretty/shared/lib/consts"
import applyWordPretty, {
  createImageTag,
} from "../../src/logics/applyWordPretty"

import type { PluginConfig, WordPrettyItem } from "@wordpretty/shared/lib/types"

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
    const items: WordPrettyItem[] = [
      {
        enabled: true,
        id: "sample",
        name: "サンプル",
        pattern: "ふぐ\nフグ\n🐡",
        image: "fugu.png",
        size: 36,
      },
    ]
    const config: PluginConfig = { wordPretty: { items: items } }

    const actual = applyWordPretty(text, config)
    const expected = `${createSpanTagWithMargin("こん")}${createImageTag(items[0])}`

    expect(actual).toBe(expected)
  })

  test("設定が複数あるときに実行できるか", () => {
    const text = "こんふぐ1フグ2"
    const items: WordPrettyItem[] = [
      {
        enabled: true,
        id: "sample1",
        name: "サンプル1",
        pattern: "ふぐ1\nフグ1\n🐡1",
        image: "fugu.png",
        size: 36,
      },
      {
        enabled: true,
        id: "sample1",
        name: "サンプル2",
        pattern: "ふぐ2|フグ2|🐡2",
        image: "fugu.png",
        size: 36,
      },
    ]
    const config: PluginConfig = { wordPretty: { items: items } }

    const actual = applyWordPretty(text, config)
    const expected = `${createSpanTagWithMargin("こん")}${createImageTag(items[0])}${createImageTag(items[1])}`

    expect(actual).toBe(expected)
  })

  test("URLがあるときに実行できるか", () => {
    const text = "こんfuguhttps://example.com/fugu/"
    const items: WordPrettyItem[] = [
      {
        enabled: true,
        id: "sample",
        name: "サンプル1",
        pattern: "fugu",
        image: "fugu.png",
        size: 36,
      },
    ]
    const config: PluginConfig = { wordPretty: { items: items } }

    const actual = applyWordPretty(text, config)
    const expected = `${createSpanTagWithMargin("こん")}${createImageTagWithMargin(items[0])}${createSpanTag("https://example.com/fugu/")}`

    expect(actual).toBe(expected)
  })
})
