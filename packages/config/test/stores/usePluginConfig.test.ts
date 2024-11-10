import { describe, expect, spyOn, test } from "bun:test"
import { act, renderHook } from "@testing-library/react"
import * as consts from "@wordpretty/shared/lib/consts"
import { deepCopy } from "@wordpretty/shared/lib/utils"
import usePluginConfigStore from "../../src/stores/usePluginConfigStore"

describe("usePluginConfigStore/loadPluginConfig", () => {
  test("正常に実行できるか", () => {
    const { result } = renderHook(() => usePluginConfigStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)

    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    act(() => {
      result.current.loadPluginConfig()
    })

    expect(result.current.pluginConfig).toStrictEqual(config)
  })
})

// ローカルでは動くがCIで動かないのでスキップ
describe.skip("usePluginConfigStore/savePluginConfig", () => {
  test("正常に実行できるか", async () => {
    const { result } = renderHook(() => usePluginConfigStore())
    const config = deepCopy(consts.DEFAULT_CONFIG)

    spyOn(Storage.prototype, "getItem").mockReturnValue(JSON.stringify(config))
    const setItemSpy = spyOn(Storage.prototype, "setItem")
    act(() => {
      result.current.loadPluginConfig()
      result.current.savePluginConfig()
    })

    expect(setItemSpy).toHaveBeenCalledWith(
      consts.CONFIG_LS_KEY,
      JSON.stringify(config),
    )
  })
})
