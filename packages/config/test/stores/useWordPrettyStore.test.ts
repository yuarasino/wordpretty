import { describe, expect, spyOn, test } from "bun:test"
import { act, renderHook } from "@testing-library/react"
import * as consts from "@wordpretty/shared/lib/consts"
import { deepCopy } from "@wordpretty/shared/lib/utils"
import usePluginConfigStore from "../../src/stores/usePluginConfigStore"
import useWordPrettyStore from "../../src/stores/useWordPrettyStore"

describe("useWordPrettyStore/addItem", () => {
  test("正常に実行できるか", () => {
    const { result: result0 } = renderHook(() => usePluginConfigStore())
    const { result } = renderHook(() => useWordPrettyStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)

    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    act(() => {
      result0.current.loadPluginConfig()
      result.current.addItem()
    })

    expect(result.current.items).toBeArrayOfSize(2)
    expect(result.current.items[0].id.length).toBe(8)
    expect(result.current.activeItem?.id).toBe(result.current.items[0].id)
  })
})

describe("useWordPrettyStore/moveItem", () => {
  test("正常に実行できるか", () => {
    const { result: result0 } = renderHook(() => usePluginConfigStore())
    const { result } = renderHook(() => useWordPrettyStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)
    config.wordPretty.items = [
      {
        ...consts.DEFAULT_ITEM,
        id: "sample1",
      },
      {
        ...consts.DEFAULT_ITEM,
        id: "sample2",
      },
    ]

    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    act(() => {
      result0.current.loadPluginConfig()
      result.current.moveItem([
        {
          ...consts.DEFAULT_ITEM,
          id: "sample2",
        },
        {
          ...consts.DEFAULT_ITEM,
          id: "sample1",
        },
      ])
    })

    expect(result.current.items).toBeArrayOfSize(2)
    expect(result.current.items[0].id).toBe("sample2")
    expect(result.current.items[1].id).toBe("sample1")
  })
})

describe("useWordPrettyStore/selectItem", () => {
  test("正常に実行できるか", () => {
    const { result: result0 } = renderHook(() => usePluginConfigStore())
    const { result } = renderHook(() => useWordPrettyStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)

    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    act(() => {
      result0.current.loadPluginConfig()
      result.current.selectItem(config.wordPretty.items[0])
    })

    expect(result.current.activeItem?.id).toBe(result.current.items[0].id)
  })
})

describe("useWordPrettyStore/toggleItem", () => {
  test("正常に実行できるか", () => {
    const { result: result0 } = renderHook(() => usePluginConfigStore())
    const { result } = renderHook(() => useWordPrettyStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)

    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    act(() => {
      result0.current.loadPluginConfig()
      result.current.toggleItem(config.wordPretty.items[0])
    })

    expect(result.current.items[0].enabled).toBeFalse()
  })
})

describe("useWordPrettyStore/copyItem", () => {
  test("正常に実行できるか", () => {
    const { result: result0 } = renderHook(() => usePluginConfigStore())
    const { result } = renderHook(() => useWordPrettyStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)

    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    act(() => {
      result0.current.loadPluginConfig()
      result.current.copyItem(config.wordPretty.items[0])
    })

    expect(result.current.items).toBeArrayOfSize(2)
    expect(result.current.items[0].id.length).toBe(8)
    expect(result.current.activeItem?.id).toBe(result.current.items[0].id)
  })
})

describe("useWordPrettyStore/deleteItem", () => {
  test("正常に実行できるか", () => {
    const { result: result0 } = renderHook(() => usePluginConfigStore())
    const { result } = renderHook(() => useWordPrettyStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)

    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    act(() => {
      result0.current.loadPluginConfig()
      result.current.selectItem(config.wordPretty.items[0])
      result.current.deleteItem(config.wordPretty.items[0])
    })

    expect(result.current.items).toBeArrayOfSize(0)
    expect(result.current.activeItem?.id).toBeUndefined()
  })
})
