import { describe, expect, test } from "bun:test"
import * as consts from "@wordpretty/core/src/consts"
import applyWordPretty, {
  createImg,
  replaceItemPattern,
} from "../../src/logics/applyWordPretty"
import { createSpan } from "../../src/utils/dom"

import type { WordPrettyItem } from "@wordpretty/core/src/types"

function createImgWithMargin(item: WordPrettyItem): string {
  const src = `${consts.PLUGIN_WEB_EP}/images/${item.image}`
  return `<img src="${src}" alt="${item.name}" class="illust illust-${item.id} margin">`
}

function createSpanWithMargin(content: string): string {
  return `<span class="margin">${content}</span>`
}

describe("applyWordPretty/applyMahjongPretty", () => {
  const item1 = {
    enabled: true,
    id: "sample1",
    name: "サンプル1",
    pattern: "ふぐ\nフグ\n🐡",
    image: "fugu.png",
    size: 36,
  }
  const item2 = {
    enabled: true,
    id: "sample2",
    name: "サンプル2",
    pattern: "(ぱち|パチ|8){2,}",
    image: "fugu.png",
    size: 36,
  }
  const item3 = {
    enabled: false,
    id: "sample3",
    name: "サンプル3",
    pattern: "w+$\n草\nワロタ",
    image: "fugu.png",
    size: 36,
  }
  const config = {
    wordPretty: {
      items: [item1, item2, item3],
    },
  }

  test.each([
    [
      "テストふぐフグテスト",
      `${createSpanWithMargin("テスト")}${createImg(item1)}${createImgWithMargin(item1)}${createSpan("テスト")}`,
    ],
    [
      "テスト🐡草テスト",
      `${createSpanWithMargin("テスト")}${createImgWithMargin(item1)}${createSpan("草テスト")}`,
    ],
    [
      "テスト8888ワロタテスト",
      `${createSpanWithMargin("テスト")}${createImgWithMargin(item2)}${createSpan("ワロタテスト")}`,
    ],
  ])("テキストが画像に変換されること", (text, expected) => {
    const actual = applyWordPretty(text, config)

    expect(actual).toBe(expected)
  })

  test("URLが変換されないこと", () => {
    const text = "テストhttps://example.com/8888テスト"

    const actual = applyWordPretty(text, config)
    const expected = `${createSpan("テスト")}${createSpan("https://example.com/8888")}${createSpan("テスト")}`

    expect(actual).toBe(expected)
  })

  test("imgタグの中が変換されないこと", () => {
    const text = 'テスト<img src="https://example.com/8888">テスト'

    const actual = applyWordPretty(text, config)
    const expected = `${createSpan("テスト")}<img src="https://example.com/8888">${createSpan("テスト")}`

    expect(actual).toBe(expected)
  })

  test.each([
    [
      "テスト&lt;style&gt;* { color: red; }&lt;/style&gt;テスト",
      `${createSpan("テスト&lt;style&gt;* { color: red; }&lt;/style&gt;テスト")}`,
    ],
    [
      "テスト<span>&lt;style&gt;* { color: red; }&lt;/style&gt;</span>テスト",
      `${createSpan("テスト")}<span>&lt;style&gt;* { color: red; }&lt;/style&gt;</span>${createSpan("テスト")}`,
    ],
  ])("サニタイズされたタグが復元されないこと", (text, expected) => {
    const actual = applyWordPretty(text, config)

    expect(actual).toBe(expected)
  })
})

describe("applyWordPretty/replaceItemPattern", () => {
  test("テキストが画像に変換されること", () => {
    const item = {
      enabled: true,
      id: "sample",
      name: "サンプル",
      pattern: "🐡\n8+",
      image: "fugu.png",
      size: 36,
    }
    const text = "テスト🐡8888テスト"

    const actual = replaceItemPattern(text, item)
    const expected = `テスト${createImg(item)}${createImg(item)}テスト`

    expect(actual).toBe(expected)
  })

  test("imgタグの中が変換されないこと", () => {
    const item = {
      enabled: true,
      id: "sample",
      name: "サンプル",
      pattern: "🐡\n8+",
      image: "fugu.png",
      size: 36,
    }
    const text = 'テスト<img src="https://example.com/8888" alt="8888">テスト'

    const actual = replaceItemPattern(text, item)
    const expected = `テスト<img src="https://example.com/8888" alt="8888">テスト`

    expect(actual).toBe(expected)
  })

  test("enabled: falseの時に変換されないこと", () => {
    const item = {
      enabled: false,
      id: "sample",
      name: "サンプル",
      pattern: "ふぐ\nフグ\n🐡",
      image: "fugu.png",
      size: 36,
    }
    const text = "テスト🐡8888テスト"

    const actual = replaceItemPattern(text, item)
    const expected = "テスト🐡8888テスト"

    expect(actual).toBe(expected)
  })
})
